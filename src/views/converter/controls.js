const m = require('mithril');
const FS = require('../../fs');
const model = require('../../models/converter');

class FormSection {
  constructor(vnode) {
    this.collapsible = vnode.attrs.collapsible || false;
    this.open = vnode.attrs.open || !this.collapsible;
  }

  viewCollapsible(vnode) {
    const open = this.open ? '.open' : '';
    return m(`.form-section.collapsible${open}`, [
      m('p.form-section-title', {
        onclick: _ => this.open = !this.open
      }, ' ' + vnode.attrs.title),
      this.open ? vnode.children : []
    ]);
  }

  viewStatic(vnode) {
    return m('.form-section', [
      m('p.form-section-title', vnode.attrs.title),
      vnode.children
    ]);
  }

  view(vnode) {
    return this.collapsible ? this.viewCollapsible(vnode) : this.viewStatic(vnode);
  }
}

class DropdownGroup {
  view(vnode) {
    const id = `dropdown-${vnode.attrs.name}`;
    let iattrs = `[name=${vnode.attrs.name}]`;
    if (vnode.attrs.required) iattrs += '[required]';
    if (vnode.attrs.disabled) iattrs += '[disabled]';
    const options = Object.keys(vnode.attrs.options).map(key => {
      const selected = vnode.attrs.selected == vnode.attrs.options[key]
        ? '[selected]' : '';
      return m(`option[value="${vnode.attrs.options[key]}"]${selected}`, key)
    });

    return m('.form-group.dropdown-group', [
      m(`label[for=${id}]`, vnode.attrs.label),
      m(`select#${id}${iattrs}`, {
        oninput: e => vnode.attrs.callback(e.target.value)
      }, options)
    ]);
  }
}

class CheckboxLine {
  view(vnode) {
    const id = `checkbox-${vnode.attrs.name}`;
    const checked = vnode.attrs.checked ? '[checked]' : '';
    return m('.form-group.checkbox-line', [
      m(`input#${id}[type=checkbox]${checked}`, {
        oninput: e => vnode.attrs.callback(e.target.checked)
      }),
      m(`label[for=${id}]`, vnode.attrs.label)
    ]);
  }
}

class ConverterControls {
  constructor() {
    this.file = null;
    this.mode = 'auto';
    this.normalize = false;
    this.rare_allele = false;
    this.export_format = 'familias';
    this.options = {
        delimiter: '\t'
    };
    this.tabular_output_options = {};
  }

  saveFile() {
    if (model.fs === null) return;

    let contents, filename, type;
    if (this.export_format == 'familias') {
      contents = model.fs.toFamilias();
      filename = model.fs.metadata.name + '-familias.txt';
      type = 'text/plain';
    } else {
      return;
    }
        
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

  loadFile() {
    if (this.file == null) return;
    FS.fromFile(this.file, this.options, this.mode)
      .then(res => {
        model.fs = res;
        model.table.error = null;

        const table = res.toTable();
        model.table.attrs = 'center,'.repeat(table.length).split(',').map(a => ({ align: a }));
        model.table.table = table;
        m.redraw();
      }).catch(err => {
        console.error(err);
        model.table.error = this.mode == 'auto'
          ? 'Error: file format could not be guessed.'
          : `Error: expected data to be in ${this.mode} format but was not understood.`;

        m.redraw();
      }
    );
  }

  view() {
    return m('div', {
      oninput: _ => {
        this.loadFile();
      }
    }, [
      m(FormSection, { title: 'Input' }, [
        m('.form-group-inline', [
          m('input#upload-input[type=file][required]', {
            oninput: e => this.file = e.target.files[0]
          })
        ])
      ]),
      m(FormSection, { title: 'Input settings', collapsible: true }, [
        m(DropdownGroup, {
          label: 'File type',
          name: 'mode',
          selected: this.mode,
          callback: v => this.mode = v,
          required: true,
          options: {
            'Auto': 'auto',
            'Familias': 'familias',
            'Tabular': 'tabular'
          }
        }),
        m(DropdownGroup, {
          label: 'Column delimiter',
          name: 'delimiter',
          disabled: this.mode != 'tabular',
          callback: v => this.options.delimiter = v,
          options: {
            'Tab': '\t',
            'Comma': ',',
            'Space': ' ',
            'Semicolon': ';'
          }
        })
      ]),
      m(FormSection, { title: 'Transformations' }, [
        m(CheckboxLine, {
          label: 'Normalize allele frequencies',
          name: 'normalize',
          checked: this.normalize,
          callback: v => this.normalize = v
        }),
        m(CheckboxLine, {
          label: 'Add rare allele',
          name: 'rare_allele',
          checked: this.rare_allele,
          callback: v => this.rare_allele = v
        })
      ]),
      m(FormSection, { title: 'Output' }, [
        m(DropdownGroup, {
          label: 'Export format',
          name: 'export_format',
          selected: this.export_format,
          callback: v => this.export_format = v,
          options: {
            'Familias': 'familias',
            'relMix': 'relmix',
            'LRMix Studio': 'lrmixstudio',
            'EuroForMix': 'euroformix',
            'Custom': 'tabular'
          }
        }),
        m(DropdownGroup, {
          label: 'Column delimiter',
          name: 'output-delimiter',
          disabled: this.export_format != 'tabular',
          callback: v => this.tabular_output_options.delimiter = v,
          options: {
            'Tab': '\t',
            'Comma': ',',
            'Space': ' ',
            'Semicolon': ';'
          }
        }),
        m('.form-group', m('button.btn-wide', {
          onclick: _ => this.saveFile()
        }, 'Save'))
      ])
    ]);
  }
}

module.exports = ConverterControls;
