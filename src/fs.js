const parse_csv = require('csv-parse');

const t = (matrix) => matrix[0].map((col, i) => matrix.map(row => row[i]));
const union = (...arrays) => [...new Set(arrays[0].concat(...arrays.slice(1)))];

class FS {
  constructor(metadata = {}, loci = []) {
    this.metadata = metadata;
    this.loci = loci;
  }

  toTable(options = {
    transpose: false,
    na_string: '',
    precission: 3
  }) {
    const all_alleles = union(...this.loci.map(l => {
      return l.alleles.map(a => a.name);
    })).sort();

    const table = all_alleles.map(a => {
      return [a].concat(this.loci.map(l => {
        const freq = l.alleles.find(af => af.name == a);
        return freq === undefined ?
          options.na_string
          : (+freq.frequency).toFixed(options.precission)
      }));
    });

    // add table header
    table.unshift([''].concat(this.loci.map(l => l.name)));

    return options.transpose ? t(table) : table;
  }

  toFamilias() {
    return this.loci.map(locus => {
      return locus.name + '\n' + locus.alleles.map(a => {
        return a.name + '\t' + a.frequency;
      }).join('\n') + '\n';
    }).join('\n');
  }

  static fromTable(metadata, table, options = {
    transpose: false,
    na_string: 'NA'
  }) {
    if (options.transpose) table = t(table);

    const loci_names = table[0].slice(1);
    const allele_names = t(table)[0].slice(1);

    const loci = t(table).slice(1).map((loc, i) => {
      return {
        name: loci_names[i],
        alleles: loc.slice(1).reduce((prev, curr, j) => {
          if (curr && curr != options.na_string) {
            let afreq = {
              name: allele_names[j],
              frequency: curr
            };
            return prev.concat(afreq);
          } else {
            return prev;
          }
        }, [])
      };
    });

    return new FS(metadata, loci);
  }

  static generateMetadata(file) {
    return {
      'name': file.name,
      'source': {
        'name': `${file.name} (loaded from file)`,
        'date': new Date()
      }
    };
  }

  static fromCSVFile(metadata, file, options) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onload = e => {
        parse_csv(e.target.result, options, (err, out) => {
          return  err === undefined
            ? fulfill(FS.fromTable(metadata, out))
            : reject(err);
        });
      };

      reader.onerror = e => {
        // TODO: figure out where the error is
        console.error('Error reading file in FileReader');
        reject(e);
      };

      reader.readAsText(file);
    });
  }

  static fromFamiliasFile(metadata, file, options = {
    record_delimiter: '\n',
    delimiter: '\t'
  }) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onload = e => {
        let loci = [];
        let current_locus = false;
        for (const line of e.target.result.split(options.record_delimiter)) {
          if (!current_locus) {
            current_locus = { name: line, alleles: [] };
          } else {
            if (line != "") {
              const [name, frequency] = line.split(options.delimiter);
              current_locus.alleles.push({ name, frequency });
            } else {
              // finished with the current locus
              loci.push(current_locus);
              current_locus = false;
            }
          }
        }
        console.log(loci);

        fulfill(new FS(metadata, loci));
      };

      reader.onerror = reject;

      reader.readAsText(file);
    });
  }

  static guessTabularDelimiter(header, possibilities = ['\t', ',', ';', ' ']) {
    const scores = possibilities.map(del => {
      const fields = header.split(del);
      return { delimiter: del, score: fields.length };
    });

    // sort by score in descending order
    scores.sort((s, t) => t.score - s.score);

    return scores[0].delimiter;
  }

  static fromFile(file, options = {}, mode = 'auto') {
    let metadata = FS.generateMetadata(file);

    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onload = e => {
        if (mode == 'auto') {
          const contents = e.target.result;

          // guess line endings
          const newline = contents.includes('\n');
          const carriage_return = contents.includes('\r');
          if (newline && carriage_return)
            options.record_delimiter = '\r\n';
          else if (!newline && carriage_return)
            options.record_delimiter = '\r';
          else
            options.record_delimiter = '\n';

          // guess if it is a Familias file or a tabular file
          const [header, rest] = contents.split(options.record_delimiter, 2);
          if (!header.includes('\t') && rest.includes('\t'))
            mode = 'familias';
          else {
            mode = 'tabular';
            
            // guess column delimiter
            options.delimiter = FS.guessTabularDelimiter(header);
            console.info('Guessed delimiter is: ', options.delimiter);
          }

          console.info(`Guessed file format: ${mode}`);
          metadata.source.name = `${file.name} (appears to be a ${mode} file)`;
        }

        metadata.source.load_options = options;
        metadata.source.load_mode = mode;

        if (mode == 'familias') {
          return FS.fromFamiliasFile(metadata, file, options)
            .then(fulfill).catch(reject);
        } else {
          return FS.fromCSVFile(metadata, file, options)
            .then(fulfill).catch(reject);
        }
      }

      reader.onerror = reject;

      reader.readAsText(file);
    });
  }
}

module.exports = FS;
