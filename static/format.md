---
title: Format
---

<p class="alert alert-info">
   <strong>Note:</strong> Leapdna is a work in progress. This page will be updated as the format evolves and, once we're ready to relase a stable version, extensive documentation will be provided.
</p>

# The leapdna file format

The leapdna file format is a modular, flexible and easy to adopt standard
designed to enable easy exchange of DNA data between software used in the
statistical evaluation of the DNA test. It is designed with flexibility in
mind, providing support for arbitrary allele denominations ranging from the
traditional length-based allele names used in samples analysed using capillary
electrophoresis to full sequences, possible with flanking regions and alignment
coordinates with respect to a reference sequence. Thanks to its modularity,
applications can incorporate their own data into leapdna files without
necessarily affecting how other applications which understand the format deal
with the files. Finally, the leapdna file format comes with libraries in R,
Python and JavaScript that take care of loading and provide basic utilities,
which make it very easy for software maintainers to integrate the format into
existing applications.


## An example use case

If the current software ecosystem of programs used for the statistical
evaluation of DNA results adopted this format, the analysis of a case could
look like this:

1. Lab results are converted **once** into the leapdna format. (This step could
   even be eliminated if commercial providers were to adopt the format.)
2. The data is fed into a particular program for analysis, for example, to
   perform mixture deconvolution. Allele frequency databases used in previous
   cases and/or other programs are already compatible with this program, thus
   eliminating the need for manual conversion and the possibility of errors.
3. The program completes the analysis and attaches its results to the leapdna
   file. Other programs are able to build upon them if necessary but even if
   they not, the same file can still be used without the need for any
   conversion steps.
4. If the case requires further analysis in another piece of software, **the
   same file** can be used without the need to redefine population databases,
   mutation models, or other case parameters that were already defined in the
   previous program.
5. Finally, if necessary, the results (or just the data) can be shared with a
   coworker or a different laboratory by sending the same single,
   self-contained file.


## Technical specification

At the core, the leapdna file format is a JSON file. This means the format is
already understood by every major programming language and has a natural
mapping to the language's native data types (namely the equivalents of lists or
arrays and dictionaries or hashes). In addition, the extensive spread of JSON
means leapdna can take advantage of heavily optimised parsers and of the
natural support for it in distributed internet applications.
