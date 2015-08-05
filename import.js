var Hoek = require('hoek');
var Wreck = require('wreck');

var url = 'http://localhost:8081/api';

var projects = [ 'angler', 'bait', 'bobber', 'brag', 'catch-and-release', 'demo', 'fillet', 'fishhook', 'gills', 'hatchery', 'mock', 'pail', 'reel', 'smelt', 'tacklebox', 'taut' ];

var template = {
    body: ['npm install', 'npm test'],
    scm: {
        type: 'git',
        branch: 'master',
        prs: false,
        runOnCommit: false
    },
    schedule: {
        type: 'none',
        pattern: '*/5 * * * *'
    },
    archive: {
        pattern: 'lab.json,lab.html,console.log'
    },
    notify: {
        type: 'none'
    }
};

var iterate = function(i) {

    if (i < projects.length) {
        console.log('importing project: ' + projects[i]);
        var job = {
            name: projects[i],
            scm: {
                url: 'https://github.com/fishin/' + projects[i]
            }
        };
        var payload = Hoek.merge(template, job);
        var options = {
            payload: JSON.stringify(payload)
        };
        //console.log(options);
        Wreck.post(url + '/job', options, function(err, resp, payload) {
            if (err) {
                //console.log(err);
                //console.log(payload);
                //console.log(resp);
            }
            iterate(i + 1);
        });
    }
};
iterate(0);
