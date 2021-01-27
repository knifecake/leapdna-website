class Population < ApplicationRecord
    has_many :children, class_name: 'Population', foreign_key: :parent_id, dependent: :nullify
    belongs_to :parent, class_name: 'Population', optional: true

    scope :roots, -> { where(parent_id: nil) }

    def self.tree_data
        roots.order(:name).includes(children: {children: {children: :children}})
    end
end
