class CreatePopulations < ActiveRecord::Migration[6.1]
  def change
    create_table :populations, id: false do |t|
      t.primary_key :id, :string, limit: 64
      t.string :name
      t.float :lat
      t.float :lng
      t.belongs_to :parent, type: :string, foreign_key: { to_table: :populations }

      
      t.timestamps
    end
  end
end
