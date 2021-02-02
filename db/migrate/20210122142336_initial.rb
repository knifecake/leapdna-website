class Initial < ActiveRecord::Migration[6.1]
  def change
    create_table :geographic_regions, id: false do |t|
      t.primary_key :id, :string, limit: 64
      t.string :name
      t.float :lat
      t.float :lng
      t.string :ancestry
      t.integer :study_count, default: 0, null: false
      t.string :cca3
    end
    add_index :geographic_regions, :ancestry

    create_table :populations, id: false do |t|
      t.primary_key :id, :string, limit: 64
      t.string :name
      t.string :ancestry
      t.integer :study_count, default: 0, null: false
    end
    add_index :populations, :ancestry

    create_table :sources, id: false do |t|
      t.primary_key :id, :string, limit: 64
      t.text :abstract
      t.string :authors
      t.string :title
      t.string :journal
      t.integer :year
      t.string :doi
      t.text :bibtex
    end

    add_index :sources, :doi, unique: true

    create_table :studies, id: false do |t|
      t.primary_key :id, :string, limit: 64
      t.string :name
      t.string :allele_types
      t.integer :locus_count, default: 0
      t.integer :sample_size
      t.belongs_to :population, type: :string, null: true, foreign_key: true
      t.belongs_to :geographic_region, type: :string, null: :false, foreign_key: true
      t.belongs_to :source, type: :string, null: false, foreign_key: true
    end

    create_table :loci, id: false do |t|
      t.primary_key :id, :string, limit: 64
      t.integer :grch38_start
      t.integer :grch38_end
      t.string :chromosome
      t.string :fasta
      t.integer :alleles_count, default: 0
      t.references :source, type: :string, null: true, foreign_key: false
    end

    create_table :alleles do |t|
      t.string :name
      t.string :allele_type
      t.string :repeating_seq, null: true, default: nil
      t.string :repeating_bracketed, null: true, default: nil
      t.string :repeating_counts
      t.string :flank5_seq, null: true, default: nil
      t.string :flank3_seq, null: true, default: nil

      t.belongs_to :locus, type: :string, null: false, foreign_key: true
    end

    add_index :alleles, [:name, :locus_id], unique: true, name: 'unique_alleles_within_locus'
    

    create_table :frequencies do |t|
      t.belongs_to :allele, null: false, foreign_key: true
      t.belongs_to :study, type: :string, null: false, foreign_key: true
      t.float :frequency
      t.integer :count
    end

    create_table :study_locus_annotations do |t|
      t.references :locus, type: :string, null: false, foreign_key: true
      t.references :study, type: :string, null: false, foreign_key: true
      t.float :h_obs
      t.float :h_exp
      t.integer :sample_size
      t.integer :allele_count
    end

    add_index :study_locus_annotations, [:locus_id, :study_id], unique: true
  end
end
