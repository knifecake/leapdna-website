require 'bibtex'
require 'citeproc/ruby'
require 'csl/styles'
require 'rails_rinku'

module ExploreHelper
    include ActionView::Helpers::TextHelper
    
    def genome_browser_url(locus)
        return "https://www.ncbi.nlm.nih.gov/projects/sviewer/?id=NC_000001.11&assm_context=GCF_000001405.39&app_context=genome&mk=#{locus.grch38_start}:#{locus.grch38_end}|#{locus.id}|blue&v=#{locus.grch38_start - 10}:#{locus.grch38_end + 10}"
    end

    def color_sequence(seq)
        seq.split('').map { |base|
            "<span class=\"base-#{base}\">#{base}</span>"
        }.join('').html_safe
    end

    def render_reference(source)
        bibliography = BibTeX.parse(source.bibtex)
        bibliography.replace

        cp = CiteProc::Processor.new style: 'apa', format: 'html', locale: 'en'
        cp.import bibliography.to_citeproc
        auto_link(cp.render(:bibliography, id: source.id).join('').html_safe)
    end
end
