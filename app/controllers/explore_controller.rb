class ExploreController < ApplicationController
  def index
    @title = 'Explore'
    @study_count = Study.count
    @geographic_region_count = Study.group(:geographic_region).count.count
    @geographic_regions = GeographicRegion.tree_data
    @chromosomes = Locus.all.group_by &:chromosome
    query = params[:query].blank? ? false : params[:query].strip
    if query
      partial_query = '%' + query + '%'
      @studies = Study.joins(:geographic_region, :population)
        .where('studies.id LIKE ? OR geographic_regions.id = ? OR populations.id = ? OR studies.name LIKE ? OR geographic_regions.name LIKE ? OR populations.name LIKE ?',
          query, query, query, partial_query, partial_query, partial_query).limit(10)
    end
  end

  def study
    @study = Study.includes(locus_annotations: [:locus]).find(params[:id])

    respond_to do |format|
      format.html # study.html.erb
      format.json { render json: @study.to_leapdna }
    end
  end

  def locus
    @locus = Locus.find(params[:id])

    respond_to do |format|
      format.html # locus.html.erb
      format.json { render json: @locus.as_json }
    end
  end
end
