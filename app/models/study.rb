require 'json'

class Study < ApplicationRecord
  belongs_to :geographic_region
  belongs_to :population
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
      'loci': loci.map { |locus| locus_to_leapdna(locus) }
    }.to_json
  end

  def locus_to_leapdna(locus)
    freqs = freqs_for_locus(locus)
    
    {
      'type': 'locus',
      'name': locus.id,
      'sample_size': freqs.reduce(0) { |t, freq| t + (freq.count || 0) },
      'alleles': freqs.map { |freq|
        {
          'type': 'allele',
          'frequency': freq.frequency,
          'count': freq.count,
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
end
