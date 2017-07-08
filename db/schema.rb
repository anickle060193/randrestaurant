# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170708174307) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "meal_attendees", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "meal_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meal_id"], name: "index_meal_attendees_on_meal_id", using: :btree
    t.index ["user_id", "meal_id"], name: "index_meal_attendees_on_user_id_and_meal_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_meal_attendees_on_user_id", using: :btree
  end

  create_table "meals", force: :cascade do |t|
    t.string   "name",          null: false
    t.datetime "time",          null: false
    t.integer  "user_id",       null: false
    t.integer  "restaurant_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["restaurant_id"], name: "index_meals_on_restaurant_id", using: :btree
    t.index ["user_id"], name: "index_meals_on_user_id", using: :btree
  end

  create_table "never_agains", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "restaurant_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["restaurant_id"], name: "index_never_agains_on_restaurant_id", using: :btree
    t.index ["user_id", "restaurant_id"], name: "index_never_agains_on_user_id_and_restaurant_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_never_agains_on_user_id", using: :btree
  end

  create_table "possible_meal_restaurants", force: :cascade do |t|
    t.integer  "meal_id",       null: false
    t.integer  "restaurant_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["meal_id", "restaurant_id"], name: "index_possible_meal_restaurants_on_meal_id_and_restaurant_id", unique: true, using: :btree
    t.index ["meal_id"], name: "index_possible_meal_restaurants_on_meal_id", using: :btree
    t.index ["restaurant_id"], name: "index_possible_meal_restaurants_on_restaurant_id", using: :btree
  end

  create_table "restaurant_likes", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.integer  "restaurant_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["restaurant_id"], name: "index_restaurant_likes_on_restaurant_id", using: :btree
    t.index ["user_id", "restaurant_id"], name: "index_restaurant_likes_on_user_id_and_restaurant_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_restaurant_likes_on_user_id", using: :btree
  end

  create_table "restaurants", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "place_id",   null: false
    t.index ["place_id"], name: "index_restaurants_on_place_id", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "meal_attendees", "meals"
  add_foreign_key "meal_attendees", "users"
  add_foreign_key "meals", "restaurants"
  add_foreign_key "meals", "users"
  add_foreign_key "never_agains", "restaurants"
  add_foreign_key "never_agains", "users"
  add_foreign_key "possible_meal_restaurants", "meals"
  add_foreign_key "possible_meal_restaurants", "restaurants"
  add_foreign_key "restaurant_likes", "restaurants"
  add_foreign_key "restaurant_likes", "users"
end
