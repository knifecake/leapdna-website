class Locus < ApplicationRecord
    has_many :alleles
    has_many :frequencies, through: :alleles
    belongs_to :source

    def frequency_histogram
        frequencies.group('alleles.name')
            .average(:frequency)
            .sort_by { |name, f| name.to_f }
            .map { |point| {name: point[0], value: point[1] }}
    end

    def as_json
        {
            'id': id,
            'histogram': frequency_histogram
        }
    end
end
