# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_22_142336) do

  create_table "alleles", force: :cascade do |t|
    t.string "name"
    t.string "allele_type"
    t.string "repeating_seq"
    t.string "repeating_bracketed"
    t.string "repeating_counts"
    t.string "flank5_seq"
    t.string "flank3_seq"
    t.string "locus_id", null: false
    t.index ["locus_id"], name: "index_alleles_on_locus_id"
    t.index ["name", "locus_id"], name: "unique_alleles_within_locus", unique: true
  end

  create_table "frequencies", force: :cascade do |t|
    t.string "allele_id", null: false
    t.string "study_id", null: false
    t.float "frequency"
    t.integer "count"
    t.index ["allele_id"], name: "index_frequencies_on_allele_id"
    t.index ["study_id"], name: "index_frequencies_on_study_id"
  end

  create_table "geographic_regions", id: { type: :string, limit: 64 }, force: :cascade do |t|
    t.string "name"
    t.float "lat"
    t.float "lng"
    t.string "parent_id"
    t.index ["parent_id"], name: "index_geographic_regions_on_parent_id"
  end

  create_table "loci", id: { type: :string, limit: 64 }, force: :cascade do |t|
    t.integer "grch38_start"
    t.integer "grch38_end"
    t.string "chromosome"
    t.integer "alleles_count", default: 0
  end

  create_table "populations", id: { type: :string, limit: 64 }, force: :cascade do |t|
    t.string "name"
    t.string "parent_id"
    t.index ["parent_id"], name: "index_populations_on_parent_id"
  end

  create_table "sources", id: { type: :string, limit: 64 }, force: :cascade do |t|
    t.text "abstract"
    t.string "authors"
    t.string "title"
    t.string "journal"
    t.integer "year"
    t.string "doi"
    t.index ["doi"], name: "index_sources_on_doi", unique: true
  end

  create_table "studies", id: { type: :string, limit: 64 }, force: :cascade do |t|
    t.string "name"
    t.string "allele_types"
    t.integer "locus_count", default: 0
    t.integer "sample_size"
    t.string "population_id"
    t.string "geographic_region_id"
    t.string "source_id", null: false
    t.index ["geographic_region_id"], name: "index_studies_on_geographic_region_id"
    t.index ["population_id"], name: "index_studies_on_population_id"
    t.index ["source_id"], name: "index_studies_on_source_id"
  end

  create_table "study_locus_annotations", force: :cascade do |t|
    t.string "locus_id", null: false
    t.string "study_id", null: false
    t.float "h_obs"
    t.float "h_exp"
    t.integer "sample_size"
    t.integer "allele_count"
    t.index ["locus_id", "study_id"], name: "index_study_locus_annotations_on_locus_id_and_study_id", unique: true
    t.index ["locus_id"], name: "index_study_locus_annotations_on_locus_id"
    t.index ["study_id"], name: "index_study_locus_annotations_on_study_id"
  end

  add_foreign_key "alleles", "loci"
  add_foreign_key "frequencies", "alleles"
  add_foreign_key "frequencies", "studies"
  add_foreign_key "geographic_regions", "geographic_regions", column: "parent_id"
  add_foreign_key "populations", "populations", column: "parent_id"
  add_foreign_key "studies", "geographic_regions"
  add_foreign_key "studies", "populations"
  add_foreign_key "studies", "sources"
  add_foreign_key "study_locus_annotations", "loci"
  add_foreign_key "study_locus_annotations", "studies"
end
