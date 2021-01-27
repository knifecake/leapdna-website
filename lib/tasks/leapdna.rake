require 'json'
require 'bibtex'

def load_region(region, parent=nil)
  new_region = GeographicRegion.create!(
    id: region['id'],
    name: region['name'],
    lat: region['lat'],
    lng: region['lng'],
    parent: parent
  )

  if region.include? 'children' then
    region['children'].map { |child| load_region(child, new_region) }
  end
end

def load_population(population, parent=nil)
  new_population = Population.create!(id: population['id'], name: population['name'], parent: parent)
  if population.include? 'children' then
    population['children'].map { |child| load_population(child, new_population) }
  end
end

def load_leapdna_study(fname)
  json = JSON.load(File.read(fname))
  unless json['type'] == 'study' and json.include? 'loci'
    puts "Error: #{fname} is not a leapdna JSON file"
    return
  end

  study = Study.create!(
    id: json['metadata']['leapdna']['id'],
    name: json['metadata']['name'],
    source_id: json['metadata']['leapdna']['source_id'],
    population_id: json['metadata']['leapdna']['population_id'],
    geographic_region_id: json['metadata']['leapdna']['geographic_region_id'],
    allele_types: json['metadata']['leapdna']['type']
  )
  json['loci'].each do |raw_locus|
    locus = Locus.find(raw_locus['name'])
    raw_locus['alleles'].each do |raw_allele|
      allele = Allele.find_or_create_by!(
        locus_id: locus.id,
        name: raw_allele['name'],
        allele_type: json['metadata']['leapdna']['type'],
        repeating_seq: raw_allele.fetch('repeating_seq', nil),
        repeating_bracketed: raw_allele.fetch('repeating_bracketed', nil),
        flank5_seq: raw_allele.fetch('flank5_seq', nil),
        flank3_seq: raw_allele.fetch('flank3_seq', nil)
      )

      Frequency.create!(
        allele_id: allele.id,
        study_id: study.id,
        frequency: raw_allele['frequency'],
        count: raw_allele['count']
      )
    end
    StudyLocusAnnotation.create!(
      locus: locus,
      study: study,
      sample_size: raw_locus.fetch('sample_size', nil),
      h_exp: raw_locus.fetch('h_exp', nil),
      h_obs: raw_locus.fetch('h_obs', nil),
      allele_count: raw_locus['alleles'].size
    )
  end
  study.sample_size = study.locus_annotations.minimum('sample_size') || json['metadata'].fetch('sample_size', nil)
  study.save!
end

namespace :leapdna do
  desc "Loads a geographic region JSON file into the database"
  task :load_geographic_regions, [:file] => [:environment] do |t, args|
    args.with_defaults(file: '../leapdna_data/dist/geographic_regions.json')
    path = Rails.root.join(args.file)

    begin
      ActiveRecord::Base.transaction do
        regions = JSON.load(File.read(path))
        regions.each { |region| load_region(region) }
        puts "Loaded #{GeographicRegion.count} geographic regions"
      end
    rescue Errno::ENOENT
      puts "File #{path} not found"
    end
  end

  desc "Loads a population JSON file into the database"
  task :load_populations, [:file] => [:environment] do |t, args|
    args.with_defaults(file: '../leapdna_data/dist/populations.json')
    path = Rails.root.join(args.file)

    begin
      ActiveRecord::Base.transaction do
        populations = JSON.load(File.read(path))
        populations.each { |population| load_population(population) }
        puts "Loaded #{Population.count} populations"
      end
    rescue Errno::ENOENT
      puts "File #{path} not found"
    end
  end

  desc "loads a .bib file containing sources into the database"
  task :load_sources, [:file] => [:environment] do |t, args|
    args.with_defaults(file: '../leapdna_data/dist/sources.bib')
    path = Rails.root.join(args.file)

    begin
      unless BibTeX.valid? path
        puts "Invalid bibliography file #{path}"
        return
      end

      ActiveRecord::Base.transaction do
        sources = BibTeX.open(path)
        sources.each do |source|
          Source.create!(
            id: source.key,
            abstract: source.abstract,
            title: source.title,
            authors: source.authors,
            journal: source.journal,
            year: source.year,
            doi: source.doi
          )
        end
        puts "Loaded #{Source.count} sources"
      end
    rescue Errno::ENOENT
      puts "File #{path} not found"
    end
  end

  desc "Loads locus information from a JSON file into the database"
  task :load_loci, [:file] => [:environment, :load_sources] do |t, args|
    args.with_defaults(file: '../leapdna_data/dist/loci.json')
    path = Rails.root.join(args.file)

    begin
      loci = JSON.load(File.read(path))
      loci.each do |locus|
        Locus.create!(
          id: locus['id'],
          grch38_start: locus['GRCh38_start'],
          grch38_end: locus['GRCh38_end'],
          chromosome: locus['chr']
        )
      end

      puts "Loaded #{Locus.count} loci"
    rescue Errno::ENOENT
      puts "File #{path} not found"
    end
  end

  desc "Loads a folder containing studies into the database"
  task :load_studies, [:folder] => [:environment, :load_sources, :load_loci, :load_geographic_regions, :load_populations] do |t, args|
    args.with_defaults(folder: '../leapdna_data/dist/studies')
    path = Rails.root.join(args.folder)

    begin
      Dir.chdir(path)
      puts "Loading studies..."
      Dir.glob('*.json').select do |fname|
        load_leapdna_study fname
        puts " -> loaded #{fname}"
      end

      puts "Loaded #{Study.count} studies"
    rescue Errno::ENOENT
      puts "File #{path} not found"
    end
  end
end
