# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Population.delete_all
eu = Population.create(id: 'europe', name: 'Europe')
es = Population.create(id: 'spain', name: 'Spain', parent: eu)
fr = Population.create(id: 'france', name: 'France', parent: eu)

Study.delete_all
Study.create(id: 'france2020', name: 'French study', population: fr)
Study.create(id: 'spain2007', name: 'Basic spanish study', population: es)
Study.create(id: 'spain2019', name: 'Advanced spanish study', population: es)


