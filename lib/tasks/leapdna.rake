require 'csv'

namespace :leapdna do
  desc "Loads a populations CSV file into the database"
  task :load_populations, [:file] => [:environment] do |t, args|
    args.with_defaults(file: 'populations.csv')
    path = Rails.root.join(args.file)

    csv_options = {headers: 'id,parent_id,name,lat,lng', return_headers: false,  converters: :float }
    
    begin
      ActiveRecord::Base.transaction do
        Population.delete_all
        CSV.foreach(path, **csv_options) do |row|
          Population.find_or_create_by(**row)
        end
        puts "Loaded #{Population.count} populations"
      end
    rescue Errno::ENOENT
      puts "File #{path} not found"
    end
  end
end
