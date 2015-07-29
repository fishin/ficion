var Hoek = require('hoek');
var Wreck = require('wreck');

var url = 'http://localhost:8081/api';

var projects = [ 'angler', 'bait', 'bobber', 'brag', 'catch-and-release', 'demo', 'fillet', 'fishhook', 'gills', 'hatchery', 'mock', 'pail', 'reel', 'smelt', 'tacklebox' ];

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
        pattern: 'lab.json'
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
            Wreck.get(url + '/job/byname/' + projects[i], { json: true }, function(err2, resp2, payload2) {

               
                var jobId = payload2.id;
                Wreck.get(url + '/job/' + jobId + '/start', function (err3, resp3, payload3) {

                    iterate(i + 1);
                });
            });
        });
    }
};
iterate(0);
