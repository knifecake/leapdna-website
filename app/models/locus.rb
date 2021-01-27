class Locus < ApplicationRecord
    has_many :alleles
    has_many :frequencies, through: :alleles
end
