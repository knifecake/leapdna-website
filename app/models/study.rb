require 'json'

class Study < ApplicationRecord
  belongs_to :geographic_region, counter_cache: :study_count
  belongs_to :population, counter_cache: :study_count
  belongs_to :source
  has_many :frequencies
  has_many :alleles, through: :frequencies

  has_many :locus_annotations, class_name: 'StudyLocusAnnotation'
  has_many :loci, through: :locus_annotations

  def sample_size_range
    locus_annotations.minimum(:sample_size)..locus_annotations.maximum(:sample_size)
  end

  def to_leapdna
    {
      'type': 'study',
      'metadata': {
        'name': name,
        'source': {
          'title': source.title,
          'authors': source.authors,
          'journal': source.journal,
          'doi': source.doi,
          'year': source.year
        },
        'leapdna': {
          'id': id,
          'alelle_types': allele_types,
          'population_id': population.id,
          'population_name': population.name,
          'geographic_region_id': geographic_region.id,
          'geographic_region_name': geographic_region.name,
          'source_id': source.id
        },
      },
      'loci': locus_annotations.map { |annotation| locus_to_leapdna(annotation) }
    }.to_json
  end

  def locus_to_leapdna(annotation)
    locus = annotation.locus
    freqs = freqs_for_locus(locus)
    
    {
      'type': 'locus',
      'name': locus.id,
      'chromosome': locus.chromosome,
      'GRCh38_start': locus.grch38_start,
      'GRCh38_end': locus.grch38_end,
      'sample_size': freqs.reduce(0) { |t, freq| t + (freq.count || 0) },
      'h_obs': annotation.h_obs,
      'h_exp': annotation.h_exp,
      'alleles': freqs.map { |freq|
        {
          'type': 'allele',
          'frequency': freq.frequency,
          'count': freq.count || 0,
          'name': freq.allele.name
        }
      }
    }
  end

  def to_familias
    loci.map { |locus|
      locus.id + "\n" + freqs_for_locus(locus).map { |freq|
        "#{freq.allele.name}\t#{freq.frequency}"
      }.join("\n") + "\n"
    }.join("\n")
  end

  def freqs_for_locus(locus)
    Frequency.includes(:allele).where(allele: locus.alleles, study: self)
  end

  def increment_related_counters
    geographic_region.study_count += 1
    population.study_count += 1
  end
end
