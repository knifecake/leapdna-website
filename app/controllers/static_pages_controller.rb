class StaticPagesController < ApplicationController
  def index
  end

  def show
    begin
      filename = Rails.root.join('static', params[:slug] + '.md')
      parsed = FrontMatterParser::Parser.parse_file(filename)
      if parsed.front_matter.include? 'title' then
        @title = parsed.front_matter['title']
      end
      html = Kramdown::Document.new(parsed.content).to_html
      render inline: html, layout: 'static_page', locals: parsed.front_matter
    rescue Errno::ENOENT
      puts "hello world"
      not_found
    end
  end
end
