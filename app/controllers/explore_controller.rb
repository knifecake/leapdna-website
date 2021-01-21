class ExploreController < ApplicationController
  def index
    @title = 'Explore'
    @study_count = Study.count
    @population_count = Study.group(:population).count.count
    @populations = Population.tree_data
    query = params[:query].nil? ? false : '%' + params[:query].strip + '%'
    if query
      @studies = Study.joins(:population).where('studies.name ILIKE ? OR populations.name ILIKE ?', query, query)
    end
  end

  def study
  end

  def population
  end
end
