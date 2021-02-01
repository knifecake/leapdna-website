require('ideogram');

const loci = [
  {
    "name": "D1S1677",
    "chr": "1",
    "start": 163589926,
    "stop": 163589926
  },
  {
    "name": "D1S1656",
    "chr": "1",
    "start": 230769516,
    "stop": 230769516
  },
  {
    "name": "TPOX",
    "chr": "2",
    "start": 1489553,
    "stop": 1489553
  },
  {
    "name": "D2S441",
    "chr": "2",
    "start": 68011847,
    "stop": 68011847
  },
  {
    "name": "D2S1776",
    "chr": "2",
    "start": 168788793,
    "stop": 168788793
  },
  {
    "name": "D2S1338",
    "chr": "2",
    "start": 218014759,
    "stop": 218014759
  },
  {
    "name": "D3S1358",
    "chr": "3",
    "start": 45540639,
    "stop": 45540639
  },
  {
    "name": "D3S4529",
    "chr": "3",
    "start": 85803384,
    "stop": 85803384
  },
  {
    "name": "D4S2408",
    "chr": "4",
    "start": 31302698,
    "stop": 31302698
  },
  {
    "name": "FGA",
    "chr": "4",
    "start": 154587636,
    "stop": 154587636
  },
  {
    "name": "D5S2500",
    "chr": "5",
    "start": 59401344,
    "stop": 59401344
  },
  {
    "name": "D5S2800",
    "chr": "5",
    "start": 59403032,
    "stop": 59403032
  },
  {
    "name": "D5S818",
    "chr": "5",
    "start": 123775456,
    "stop": 123775456
  },
  {
    "name": "CSF1PO",
    "chr": "5",
    "start": 150076224,
    "stop": 150076224
  },
  {
    "name": "SE33",
    "chr": "6",
    "start": 88277044,
    "stop": 88277044
  },
  {
    "name": "D6S1043",
    "chr": "6",
    "start": 91740125,
    "stop": 91740125
  },
  {
    "name": "D6S474",
    "chr": "6",
    "start": 112557851,
    "stop": 112557851
  },
  {
    "name": "D7S820",
    "chr": "7",
    "start": 84160126,
    "stop": 84160126
  },
  {
    "name": "D8S1179",
    "chr": "8",
    "start": 124894765,
    "stop": 124894765
  },
  {
    "name": "D9S1122",
    "chr": "9",
    "start": 77073726,
    "stop": 77073726
  },
  {
    "name": "D9S2157",
    "chr": "9",
    "start": 133160182,
    "stop": 133160182
  },
  {
    "name": "D10S1248",
    "chr": "10",
    "start": 129294144,
    "stop": 129294144
  },
  {
    "name": "TH01",
    "chr": "11",
    "start": 2170988,
    "stop": 2170988
  },
  {
    "name": "VWA",
    "chr": "12",
    "start": 5983877,
    "stop": 5983877
  },
  {
    "name": "D12S391",
    "chr": "12",
    "start": 12296920,
    "stop": 12296920
  },
  {
    "name": "D12ATA63",
    "chr": "12",
    "start": 107928490,
    "stop": 107928490
  },
  {
    "name": "D13S317",
    "chr": "13",
    "start": 82147925,
    "stop": 82147925
  },
  {
    "name": "D14S1434",
    "chr": "14",
    "start": 94841954,
    "stop": 94841954
  },
  {
    "name": "Penta_E",
    "chr": "15",
    "start": 96830915,
    "stop": 96830915
  },
  {
    "name": "D16S539",
    "chr": "16",
    "start": 86352602,
    "stop": 86352602
  },
  {
    "name": "D17S1301",
    "chr": "17",
    "start": 74684755,
    "stop": 74684755
  },
  {
    "name": "D18S51",
    "chr": "18",
    "start": 63281567,
    "stop": 63281567
  },
  {
    "name": "D19S433",
    "chr": "19",
    "start": 29926135,
    "stop": 29926135
  },
  {
    "name": "D20S482",
    "chr": "20",
    "start": 4525592,
    "stop": 4525592
  },
  {
    "name": "D21S11",
    "chr": "21",
    "start": 19181873,
    "stop": 19181873
  },
  {
    "name": "Penta_D",
    "chr": "21",
    "start": 43636105,
    "stop": 43636105
  },
  {
    "name": "D22S1045",
    "chr": "22",
    "start": 37140187,
    "stop": 37140187
  },
  {
    "name": "DYS393",
    "chr": "Y",
    "start": 3263011,
    "stop": 3263011
  },
  {
    "name": "DYS505",
    "chr": "Y",
    "start": 3772690,
    "stop": 3772690
  },
  {
    "name": "DYS456",
    "chr": "Y",
    "start": 4402819,
    "stop": 4402819
  },
  {
    "name": "DYS570",
    "chr": "Y",
    "start": 6993090,
    "stop": 6993090
  },
  {
    "name": "DYS576",
    "chr": "Y",
    "start": 7185218,
    "stop": 7185218
  },
  {
    "name": "DYS522",
    "chr": "Y",
    "start": 7547485,
    "stop": 7547485
  },
  {
    "name": "DYS458",
    "chr": "Y",
    "start": 7999739,
    "stop": 7999739
  },
  {
    "name": "DYS449",
    "chr": "Y",
    "start": 8349854,
    "stop": 8349854
  },
  {
    "name": "DYS481",
    "chr": "Y",
    "start": 8558237,
    "stop": 8558237
  },
  {
    "name": "DYS627",
    "chr": "Y",
    "start": 8781844,
    "stop": 8781844
  },
  {
    "name": "DYS19",
    "chr": "Y",
    "start": 9684280,
    "stop": 9684280
  },
  {
    "name": "DYS391",
    "chr": "Y",
    "start": 11981989,
    "stop": 11981989
  },
  {
    "name": "DYS635",
    "chr": "Y",
    "start": 12258760,
    "stop": 12258760
  },
  {
    "name": "DYS437_(GRCH37)",
    "chr": "Y",
    "start": 12346167,
    "stop": 12346167
  },
  {
    "name": "DYS437_(GRCH38)",
    "chr": "Y",
    "start": 12346167,
    "stop": 12346167
  },
  {
    "name": "DYS439__(GRCH37)",
    "chr": "Y",
    "start": 12403417,
    "stop": 12403417
  },
  {
    "name": "DYS439__(GRCH38)",
    "chr": "Y",
    "start": 12403417,
    "stop": 12403417
  },
  {
    "name": "DYS389-I_/_-II",
    "chr": "Y",
    "start": 12500348,
    "stop": 12500348
  },
  {
    "name": "DYS438__(GRCH37)",
    "chr": "Y",
    "start": 12825789,
    "stop": 12825789
  },
  {
    "name": "DYS438__(GRCH38)",
    "chr": "Y",
    "start": 12825789,
    "stop": 12825789
  },
  {
    "name": "DYS612",
    "chr": "Y",
    "start": 13640628,
    "stop": 13640628
  },
  {
    "name": "DYS390",
    "chr": "Y",
    "start": 15162967,
    "stop": 15162967
  },
  {
    "name": "DYS518",
    "chr": "Y",
    "start": 15207888,
    "stop": 15207888
  },
  {
    "name": "DYS643",
    "chr": "Y",
    "start": 15314032,
    "stop": 15314032
  },
  {
    "name": "DYS533",
    "chr": "Y",
    "start": 16281249,
    "stop": 16281249
  },
  {
    "name": "Y-GATA-H4",
    "chr": "Y",
    "start": 16631573,
    "stop": 16631573
  },
  {
    "name": "DYS385b",
    "chr": "Y",
    "start": 18639613,
    "stop": 18639613
  },
  {
    "name": "DYS385a",
    "chr": "Y",
    "start": 18680412,
    "stop": 18680412
  },
  {
    "name": "DYS460____(MPS_sequence_may_include_incidental_STR_DYS461:_[TCTG]a_[TCTA]b)",
    "chr": "Y",
    "start": 18888704,
    "stop": 18888704
  },
  {
    "name": "DYS549",
    "chr": "Y",
    "start": 19358238,
    "stop": 19358238
  },
  {
    "name": "DYS392",
    "chr": "Y",
    "start": 20471887,
    "stop": 20471887
  },
  {
    "name": "DYS448",
    "chr": "Y",
    "start": 22218823,
    "stop": 22218823
  },
  {
    "name": "DYF387S1_fragment_1",
    "chr": "Y",
    "start": 23785261,
    "stop": 23785261
  },
  {
    "name": "DYF387S1_fragment_2",
    "chr": "Y",
    "start": 25884481,
    "stop": 25884481
  },
  {
    "name": "DXS10135",
    "chr": "X",
    "start": 9338202,
    "stop": 9338202
  },
  {
    "name": "DXS8378",
    "chr": "X",
    "start": 9402162,
    "stop": 9402162
  },
  {
    "name": "DXS7132",
    "chr": "X",
    "start": 65435547,
    "stop": 65435547
  },
  {
    "name": "DXS10074",
    "chr": "X",
    "start": 67757245,
    "stop": 67757245
  },
  {
    "name": "DXS10103",
    "chr": "X",
    "start": 134284859,
    "stop": 134284859
  },
  {
    "name": "HPRTB",
    "chr": "X",
    "start": 134481409,
    "stop": 134481409
  },
  {
    "name": "DXS7423",
    "chr": "X",
    "start": 150542422,
    "stop": 150542422
  },
  {
    "name": "D1GATA113",
    "chr": "1",
    "start": 7382711,
    "stop": 7382711
  },
  {
    "name": "D1S1627",
    "chr": "1",
    "start": 106420972,
    "stop": 106420972
  },
  {
    "name": "D2S1360",
    "chr": "2",
    "start": 17310598,
    "stop": 17310598
  },
  {
    "name": "D2S1772",
    "chr": "2",
    "start": 66823866,
    "stop": 66823866
  },
  {
    "name": "D3S3045",
    "chr": "3",
    "start": 107271067,
    "stop": 107271067
  },
  {
    "name": "D3S1744",
    "chr": "3",
    "start": 147374652,
    "stop": 147374652
  },
  {
    "name": "D3S3053",
    "chr": "3",
    "start": 172033055,
    "stop": 172033055
  },
  {
    "name": "D4S2366",
    "chr": "4",
    "start": 6482994,
    "stop": 6482994
  },
  {
    "name": "D4S2364",
    "chr": "4",
    "start": 92596122,
    "stop": 92596122
  },
  {
    "name": "D6S477",
    "chr": "6",
    "start": 6140294,
    "stop": 6140294
  },
  {
    "name": "D6S1017",
    "chr": "6",
    "start": 41709421,
    "stop": 41709421
  },
  {
    "name": "D7S3048",
    "chr": "7",
    "start": 21226999,
    "stop": 21226999
  },
  {
    "name": "D7S1517",
    "chr": "7",
    "start": 123857545,
    "stop": 123857545
  },
  {
    "name": "D8S1115",
    "chr": "8",
    "start": 42681338,
    "stop": 42681338
  },
  {
    "name": "D8S1132",
    "chr": "8",
    "start": 106316572,
    "stop": 106316572
  },
  {
    "name": "D9S925",
    "chr": "9",
    "start": 18288988,
    "stop": 18288988
  },
  {
    "name": "D10S1435",
    "chr": "10",
    "start": 2201038,
    "stop": 2201038
  },
  {
    "name": "D10S2325",
    "chr": "10",
    "start": 12750942,
    "stop": 12750942
  },
  {
    "name": "D11S2368",
    "chr": "11",
    "start": 19259481,
    "stop": 19259481
  },
  {
    "name": "D11S4463",
    "chr": "11",
    "start": 131002411,
    "stop": 131002411
  },
  {
    "name": "D13S325",
    "chr": "13",
    "start": 42599164,
    "stop": 42599164
  },
  {
    "name": "D14S608",
    "chr": "14",
    "start": 28380143,
    "stop": 28380143
  },
  {
    "name": "D15S659",
    "chr": "15",
    "start": 46081811,
    "stop": 46081811
  },
  {
    "name": "D17S974",
    "chr": "17",
    "start": 10615328,
    "stop": 10615328
  },
  {
    "name": "D17S1290",
    "chr": "17",
    "start": 58254009,
    "stop": 58254009
  },
  {
    "name": "D18S853",
    "chr": "18",
    "start": 3990509,
    "stop": 3990509
  },
  {
    "name": "D18S535",
    "chr": "18",
    "start": 40568743,
    "stop": 40568743
  },
  {
    "name": "D18S1364",
    "chr": "18",
    "start": 65732848,
    "stop": 65732848
  },
  {
    "name": "D19S253",
    "chr": "19",
    "start": 15617364,
    "stop": 15617364
  },
  {
    "name": "D20S470",
    "chr": "20",
    "start": 17391787,
    "stop": 17391787
  },
  {
    "name": "D20S1082",
    "chr": "20",
    "start": 55249299,
    "stop": 55249299
  },
  {
    "name": "D21S1270",
    "chr": "21",
    "start": 30334368,
    "stop": 30334368
  },
  {
    "name": "D21S2055",
    "chr": "21",
    "start": 39819388,
    "stop": 39819388
  },
  {
    "name": "D22GATA198B05",
    "chr": "22",
    "start": 17169711,
    "stop": 17169711
  },
  {
    "name": "DYS526-II",
    "chr": "Y",
    "start": 3772270,
    "stop": 3772270
  },
  {
    "name": "DYS526-I",
    "chr": "Y",
    "start": 3772530,
    "stop": 3772530
  },
  {
    "name": "DYF403S1a__(312_NT)",
    "chr": "Y",
    "start": 6357729,
    "stop": 6357729
  },
  {
    "name": "DYF403S1a__(316_NT)",
    "chr": "Y",
    "start": 9816553,
    "stop": 9816553
  },
  {
    "name": "DYF403S1b1__(341_NT)",
    "chr": "Y",
    "start": 9681951,
    "stop": 9681951
  },
  {
    "name": "DYF403S1b2__(437_NT)",
    "chr": "Y",
    "start": 6479504,
    "stop": 6479504
  },
  {
    "name": "DYS547",
    "chr": "Y",
    "start": 16760014,
    "stop": 16760014
  },
  {
    "name": "DYS626",
    "chr": "Y",
    "start": 22270730,
    "stop": 22270730
  },
  {
    "name": "DYF399S1_fragment_1",
    "chr": "Y",
    "start": 22950182,
    "stop": 22950182
  },
  {
    "name": "DYF399S1_fragment_2",
    "chr": "Y",
    "start": 24583939,
    "stop": 24583939
  },
  {
    "name": "DYF399S1_fragment_3",
    "chr": "Y",
    "start": 25085865,
    "stop": 25085865
  },
  {
    "name": "DYF404S1_fragment_1",
    "chr": "Y",
    "start": 23807834,
    "stop": 23807834
  },
  {
    "name": "DYF404S1_fragment_2",
    "chr": "Y",
    "start": 25861938,
    "stop": 25861938
  },
  {
    "name": "DYS464_fragment_1",
    "chr": "Y",
    "start": 23094729,
    "stop": 23094729
  },
  {
    "name": "DYS464_fragment_2",
    "chr": "Y",
    "start": 23325672,
    "stop": 23325672
  },
  {
    "name": "DYS464_fragment_3",
    "chr": "Y",
    "start": 24728354,
    "stop": 24728354
  },
  {
    "name": "DYS464_fragment_4",
    "chr": "Y",
    "start": 24941344,
    "stop": 24941344
  },
  {
    "name": "DXS10148",
    "chr": "X",
    "start": 9270818,
    "stop": 9270818
  },
  {
    "name": "DXS10079",
    "chr": "X",
    "start": 67495961,
    "stop": 67495961
  },
  {
    "name": "DXS10101",
    "chr": "X",
    "start": 134520365,
    "stop": 134520365
  },
  {
    "name": "DXS10146___(GRCH38)",
    "chr": "X",
    "start": 150403692,
    "stop": 150403692
  },
  {
    "name": "DXS10146___(GRCH37)",
    "chr": "X",
    "start": 150403692,
    "stop": 150403692
  },
  {
    "name": "DXS10134__(GRCH37)",
    "chr": "X",
    "start": 150481726,
    "stop": 150481726
  },
  {
    "name": "DXS10134__(GRCH38)",
    "chr": "X",
    "start": 150481726,
    "stop": 150481726
  }
];

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

const ideogram = new Ideogram(config);
});


