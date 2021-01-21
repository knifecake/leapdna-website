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

ActiveRecord::Schema.define(version: 2021_01_21_135042) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "populations", id: { type: :string, limit: 64 }, force: :cascade do |t|
    t.string "name"
    t.float "lat"
    t.float "lng"
    t.string "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["parent_id"], name: "index_populations_on_parent_id"
  end

  create_table "studies", id: { type: :string, limit: 64 }, force: :cascade do |t|
    t.string "name"
    t.string "study_type"
    t.date "date"
    t.string "doi"
    t.integer "locus_count"
    t.string "population_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["doi"], name: "index_studies_on_doi", unique: true
    t.index ["population_id"], name: "index_studies_on_population_id"
  end

  add_foreign_key "populations", "populations", column: "parent_id"
end
