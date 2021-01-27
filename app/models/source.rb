class Source < ApplicationRecord
    def doi_url
        'https://doi.org/' + doi
    end
end
