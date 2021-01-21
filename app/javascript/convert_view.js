const m = require('mithril');
const model = require('./convert_model');
const { Table, DropdownGroup, CheckboxLine, TextGroup, FormSection } = require('./utils');

class ConverterControls {
    constructor() {
        this.input_file = null;
        this.input_file_format = 'auto';
        this.input_options = {
            delimiter: '',
            newline: '',
            na_string: '',
            row_indexing: ''
        }

        this.transformation_options = {
          normalize: false,
          rare_allele: false
        }
        this.output_file_format = 'leapdna';
    }

  save_file_handler() {
        if (model.study === null) return;

        let { contents, filename, type } = model.write_file(model.study, this.output_file_format);
            
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

  load_file_handler() {
    if (this.input_file == null) return;
    model.read_file(this.input_file, this.input_file_format, this.input_options).then(study => {
        // input transformations
        model.study = model.transform_study(study, this.transformation_options);

        m.redraw();
    }).catch(err => {
        console.error(err);
        model.error = this.input_file_format == 'auto'
            ? 'Error: file format could not be guessed.'
            : `Error: expected data to be in ${this.input_file_format} format but it was not understood.`;
        model.study = null;
        m.redraw();
        }
    );
  }

  view() {
    return m('div', {
      onchange: _ => {
        this.load_file_handler();
      }
    }, [
        m('div.text-center.form-group', '🔀 Convert a frequency table'),
        m('.form-group', [
            m('label.sr-only[for=upload-input]', 'Input file'),
            m('input#upload-input[type=file][required]', {
                oninput: e => this.input_file = e.target.files[0]
            })
        ]),
        m(FormSection, { title: 'Input settings', collapsible: true }, [

            // file format
            m(DropdownGroup, {
            label: 'File type',
            name: 'type',
            selected: this.mode,
            callback: v => this.input_file_format = v,
            required: true,
            options: {
                'Auto': 'auto',
                'Leapdna': 'leapdna',
                'Familias': 'familias',
                'Tabular': 'tabular'
            }
            }),

            // newline mode
            m(DropdownGroup, {
                label: 'Newline mode',
                name: 'newline',
                disabled: this.input_file_format == 'leapdna' || this.input_file_format == 'auto',
                callback: v => this.input_options.newline = v,
                options: {
                    'Auto': '',
                    'Windows (CRLF)': '\r\n',
                    'Linux / MacOS (LF)': '\n',
                    'MacOS Classic (CR)': '\r',
                }
            }),

            // column delimiter
            m(DropdownGroup, {
                label: 'Column delimiter',
                name: 'delimiter',
                disabled: this.input_file_format != 'tabular',
                callback: v => this.input_options.delimiter = v,
                options: {
                    'Auto': '',
                    'Tab': '\t',
                    'Comma': ',',
                    'Space': ' ',
                    'Semicolon': ';'
                }
            }),

            // NA character
            m(TextGroup, {
                label: 'NA value',
                name: 'na_string',
                disabled: this.input_file_format != 'tabular',
                placeholder: 'Auto',
                callback: v => this.input_options.na_string = v
            }),

            // row indexing
            m(DropdownGroup, {
                label: 'Row indexing',
                name: 'row-indexing',
                disabled: this.input_file_format != 'tabular',
                callback: v => this.input_options.row_indexing = v,
                options: {
                    'Auto': '',
                    'Alleles': 'alleles',
                    'Loci': 'loci'
                }
            }),
        ]),
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
    ]);
  }
}

class ConverterTable {
    view() {
        let out = [];
        if (model.study == null) {
            // show a help message or an error
            if (model.error == null) {
                out.push(m('p.text-center.text-muted', '🛎 Waiting for data...'));
            } else {
                out.push(m('p.text-center.text-error', model.error));
            }

            // show instructions
            out.push(m('article#converter-instructions.readable-copy', model.instructions));
        } else {
            // show the study
            const data = model.study.to_matrix();
            const table = {
                table: data,
                header: true,
                attrs: 'center,'.repeat(data[0].length).split(',').map(a => ({ align: a }))
            };
            out.push(m(Table, table));
        }

        return m('div', out);
    }
}

class Converter {
    constructor() {
        fetch('/docs/convert-instructions.html')
            .then(response => response.text())
            .then(html => {
                model.instructions = m.trust(html);
                m.redraw();
            });
    }
    view() {
        return m('#converter', [
            m('aside.upload-form', m(ConverterControls)),
            m('section.table-preview', m(ConverterTable))
        ]);
    }
}

module.exports = Converter;
