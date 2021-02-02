require('ideogram');

const loci = [];

document.addEventListener('turbolinks:load', () => {
  const config = {
    container: '#ideogram-container',
    orientation: 'vertical',
    sex: 'female',
    showFullyBanded: false,
    organism: 'human',
    chrHeight: 200,
    chrWidth: 10,
    rows: 1,
    rotatable: false,
    onWillShowAnnotTooltip: (annot) => {
      annot.displayName = `<a href=\"/explore/locus/${annot.name}\">${annot.name}</a>`;
      return annot;
    },
    annotations: loci
  };

  new Ideogram(config);
});


