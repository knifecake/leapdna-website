class Allele < ApplicationRecord
  belongs_to :locus, inverse_of: :alleles, counter_cache: true
  has_many :frequencies
end
