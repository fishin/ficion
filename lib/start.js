var Fs = require('fs');
var Smelt = require('smelt');

var pidsObj = [];

var smelt = new Smelt({});
smelt.runCommand('node_modules/.bin/confidence -c cfg/gills_confidence.json --filter.env=dev', pidsObj, function (result) {

    console.log('generating cfg/gills.json from cfg/gills_confidence.json');
    Fs.writeFileSync('cfg/gills.json', result.output);
    console.log('starting up UI');
    smelt.runCommand('node_modules/.bin/rejoice -c cfg/gills.json', pidsObj, function (result2) {

        console.log('Running UI');
        console.log(result2);
    });
});

smelt.runCommand('node_modules/.bin/confidence -c cfg/tacklebox_confidence.json --filter.env=dev --filter.port=port1', pidsObj, function (result3) {

    console.log('generating cfg/tacklebox_port1.json from cfg/tacklebox_confidence.json');
    Fs.writeFileSync('cfg/tacklebox_port1.json', result3.output);
    console.log('starting up API');
    smelt.runCommand('node_modules/.bin/rejoice -c cfg/tacklebox_port1.json', pidsObj, function (result4) {

        console.log('Running API');
        console.log(result4);
    });
});
