const m = require('mithril');
const model = require('../../models/converter');

const TableView = require('./table');
const ConverterControls = require('./controls');

class Converter {
  view() {
    return m('#converter', [
      m('aside.upload-form', m(ConverterControls)),
      m('section.table-preview', m(TableView, model.table ))
    ]);
  }
}

module.exports = Converter;
