const {
    load_study_familias,
    load_leapdna,
    load_study_table,
    dump_familias,
    dump_leapdna,
    dump_table
} = require('leapdna');

function generate_metadata(file) {
    return {
        'name': file.name,
        'source': {
            'name': `${file.name} (loaded from file)`,
            'date': new Date()
        }
    };
}

function guess_file_format(name, contents) {
    if (name.includes('.leapdna') || name.includes('.json')) {
        return 'leapdna';
    }

    // guess if it is a Familias file or a tabular file
    const [header, rest] = contents.split('\n', 2);
    if (!header.includes('\t') && rest.includes('\t'))
        return 'familias';
    else
        return 'tabular';
}

function transform_study(study, options = {
    normalize: false,
    rare_allele: false
}) {
    if (options.normalize)
        study.normalize_allele_frequencies();

    if (options.rare_allele)
        study.add_rare_alleles();
    
    return study;
}

function read_file (file, format = 'auto', options = {
    delimiter: '',
    newline: '',
    na_string: '',
    row_indexing: '',
}) {
    let metadata = generate_metadata(file);

    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onload = e => {
            const contents = e.target.result;

            if (format == 'auto') {
                format = guess_file_format(file.name, contents);

                console.info(`Guessed file format: ${format}`);
                metadata.source.name = `${file.name} (appears to be a ${format} file)`;
            }

            metadata.source.load_options = options;
            metadata.source.filetype = format;

            let study;
            try {
                if (format == 'familias') {
                    study = load_study_familias(contents);
                } else if (format == 'tabular') {
                    study = load_study_table(contents, options);
                } else {
                    study = load_leapdna(contents);
                }
    
                study.metadata = {...study.metadata, metadata};
                console.log(study);
                fulfill(study);
            } catch (error) {
                reject(error);
            }
            
        }

      reader.onerror = reject;

      reader.readAsText(file);
    });
}

function write_file(study, format) {
    let contents, filename = 'study', type;

    if (study.metadata && study.metadata.leapdna) {
        filename = study.metadata.leapdna.id;
    }

    if (format == 'leapdna') {
        contents = dump_leapdna(study);
        filename += '.leapdna.json';
        type = 'application/json';
    } else if (format == 'familias') {
        contents = dump_familias(study);
        filename += '.familias.txt';
        type = 'text/plain';
    } else if (format == 'relmix' || format == 'lrmixstudio') {
        // TSV file
        contents = dump_table(study, {
            delimiter: '\t'
        });
        filename += `.${format}.txt`;
        type = 'text/tab-separated-values';
    } else if (format == 'euroformix') {
        // TSV file with NA
        contents = dump_table(study, {
            delimiter: '\t',
            na_string: 'NA'
        });
        filename += `.${format}.txt`;
        type = 'text/tab-separated-values';
    } else if (format == 'csv') {
        // TSV file
        contents = dump_table(study, {
            delimiter: ','
        });
        filename += `.csv`;
        type = 'text/csv';
    }
    return { filename, contents, type };
}

module.exports = {
    file: null,
    study: null,
    error: null,
    transform_study,
    read_file,
    write_file
}
