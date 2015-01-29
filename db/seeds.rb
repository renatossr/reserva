# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
profile = Profile.create(name: "Renato", email: "renato@renato.com")


Establishment.create(name: "Establishment 1", profile: profile)
Establishment.create(name: "Establishment 2", profile: profile)
establishments = Establishment.all

Position.create( name: "Position 1", establishment: establishments.first )
Position.create( name: "Position 2", establishment: establishments.first )
Position.create( name: "Position 3", establishment: establishments.last )
Position.create( name: "Position 4", establishment: establishments.last )
