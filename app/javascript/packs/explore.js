const m = require('mithril');
const leapdna = require('leapdna');

const { FormSection, CheckboxLine, DropdownGroup } = require('../utils');
const { transform_study, write_file } = require('../convert_model');


class ExploreDownloadPanel {
    constructor() {
        this.transformation_options = {
            rare_allele: false,
            normalize: false
        };
        this.output_file_format = 'leapdna';
        this.error = null;
        this.study = null;
    }

    view() {
        return [
            m('h4', 'Other download options'),
            m(FormSection, { title: 'Transformations' }, [
                m(CheckboxLine, {
                label: 'Normalize allele frequencies',
                name: 'normalize',
                checked: this.transformation_options.normalize,
                callback: v => this.transformation_options.normalize = v
                }),
                m(CheckboxLine, {
                label: 'Add rare allele',
                name: 'rare_allele',
                checked: this.transformation_options.rare_allele,
                callback: v => this.transformation_options.rare_allele = v
                })
            ]),
            m(FormSection, { title: 'Output' }, [
                m(DropdownGroup, {
                label: 'Export format',
                name: 'export_format',
                selected: this.output_file_format,
                callback: v => this.output_file_format = v,
                options: {
                    'Leapdna': 'leapdna',
                    'Familias': 'familias',
                    'relMix': 'relmix',
                    'LRMix Studio': 'lrmixstudio',
                    'EuroForMix': 'euroformix',
                    'CSV': 'csv'
                }
                }),
                m('.form-group', m('button.btn-wide', {
                    onclick: _ => this.save_file_handler()
                }, 'Save'))
            ])
        ];
    }

    async save_file_handler() {
        await this.fetch_study();

        if (this.error) {
            alert("There was a problem downloading this study. The error was: " + this.error);
        }

        let study = transform_study(this.study, this.transformation_options);

        let { contents, filename, type } = write_file(study, this.output_file_format);
            
        // cause the browser to download the file
        let a = document.createElement('a');
        a.setAttribute('download', filename);
        a.style.display = 'none';
        let file = new Blob([contents], { type });
        a.href = URL.createObjectURL(file);
        document.body.appendChild(a);
        setTimeout(() => {
          a.click();
          document.body.removeChild(a);
        }, 66);
    }

    fetch_study() {
        return this.study || fetch(window.location + '.json')
            .then(response => response.json())
            .then(json => this.study = leapdna.load_leapdna(json))
            .catch(this.handle_network_error);
    }

    handle_network_error(err) {
        console.error(err);
        this.error = err.message;
    }
}

m.mount(document.getElementById('explore-download'), ExploreDownloadPanel);