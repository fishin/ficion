var Hoek = require('hoek');
var Wreck = require('wreck');

var url = 'http://localhost:8081/api';

var projects = [ 'angler', 'bait', 'bobber', 'brag', 'catch-and-release', 'demo', 'fillet', 'fishhook', 'gills', 'hatchery', 'mock', 'pail', 'reel', 'smelt', 'tacklebox', 'taut' ];

var template = {
    body: ['npm run clean', 'npm install', 'npm test'],
    scm: {
        type: 'git',
        branch: 'master',
        prs: false,
        runOnCommit: false
    },
    schedule: {
        type: 'cron',
        pattern: '*/5 * * * *'
    },
    archive: {
        pattern: 'lab.json,lab.html,console.log',
        type: 'maxnum',
        maxNumber: '20'
    },
    "notify": {
        "type": "email",
        "to": "lloyd.benson@gmail.com",
        "subject": "{name} {status}",
        "message": "http://localhost:8080/view/job/{jobId}/run/{runId}",
        "statuses": [
            "failed",
            "fixed"
        ]
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
        if (job.name === 'tacklebox' || job.name === 'bobber' || job.name === 'bait') {
            job.scm.runOnCommit = true;
        }
        else {
            job.scm.runOnCommit = false;
        }
        if (job.name === 'demo') {
            job.scm.prs = true;
        }
        else {
            job.scm.prs = false;
        }
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
