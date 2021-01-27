class GeographicRegion < ApplicationRecord
    has_many :children, class_name: 'GeographicRegion', foreign_key: :parent_id, dependent: :nullify
    belongs_to :parent, class_name: 'GeographicRegion', optional: true

    scope :roots, -> { where(parent_id: nil) }

    def self.tree_data
        roots.order(:name).includes(children: {children: {children: :children}})
    end
end
