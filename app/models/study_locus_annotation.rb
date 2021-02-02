class StudyLocusAnnotation < ApplicationRecord
  belongs_to :locus
  belongs_to :study, counter_cache: :locus_count

  def self.order_by_chromosome
    all.sort_by { |la| la.locus.chromosome.to_i || la.locus.chromosome.ord + 256 }
  end
end
