class StudyLocusAnnotation < ApplicationRecord
  belongs_to :locus
  belongs_to :study, counter_cache: :locus_count
end
