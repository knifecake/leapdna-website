const charts = require('../charts');

fetch(window.location + '.json')
    .then(response => response.json())
    .then(json => charts.histogram('#freqchart', json['histogram']))