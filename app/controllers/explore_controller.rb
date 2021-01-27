class ExploreController < ApplicationController
  def index
    @title = 'Explore'
    @study_count = Study.count
    @geographic_region_count = Study.group(:geographic_region).count.count
    @geographic_regions = GeographicRegion.tree_data
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
  end

  def download
    @study = Study.includes(locus_annotations: [:locus]).find(params[:id])

    format = params[:export_format]
    if format == 'leapdna'
      send_data @study.to_leapdna, filename: @study.id + '.leapdna.json'
    elsif format == 'familias'
      send_data @study.to_familias, filename: @study.id + '.txt'
    else
      redirect_to study_detail_url(@study.id)
    end
  end
end
