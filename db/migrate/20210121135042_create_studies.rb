class CreateStudies < ActiveRecord::Migration[6.1]
  def change
    create_table :studies, id: false do |t|
      t.primary_key :id, :string, limit: 64
      t.string :name
      t.string :study_type
      t.date :date
      t.string :doi
      t.integer :locus_count
      t.belongs_to :population, type: :string, null: :false

      t.timestamps
      t.index :doi, unique: true
    end
  end
end
