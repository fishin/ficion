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
        pattern: '*/10 * * * *'
    },
    archive: {
        pattern: 'test.lab,test.html,test.log',
        type: 'maxnum',
        maxNumber: '20'
    },
    "notify": {
        "type": "email",
        "to": "lloyd.benson@gmail.com",
        "subject": "[ficion] [{type}] {name} {status}",
        "message": "http://localhost:8080/view/{relativeUrl}",
        "statuses": [
            "cancelled",
            "failed",
            "fixed"
        ]
    }
};

var jobs = [
    {
        name: 'clean',
        scm: {
            type: 'git',
            url: 'https://github.com/fishin/ficion',
            branch: 'master',
            prs: false,
            runOnCommit: false
        },
        body: [ 'bin/cleanNPM.sh' ],
        schedule: {
            type: 'cron',
            pattern: '8 0 * * *'
        },
        "notify": {
            "type": "email",
            "to": "lloyd.benson@gmail.com",
            "subject": "[ficion] [{type}] {name} {status}",
            "message": "http://localhost:8080/view/job/{jobId}/run/{runId}",
            "statuses": [
                "cancelled",
                "failed",
                "fixed"
            ]
        }
    },
    {
        name: 'rejoice',
        scm: {
            type: 'git',
            url: 'https://github.com/hapijs/rejoice',
            branch: 'master',
            prs: false,
            runOnCommit: false
        },
        body: [
            'rm -rf node_modules',
            'npm install',
            'node_modules/.bin/lab -a code -t 100 -v -m 2000  -L -r json -o test.lab -r html -o test.html -r console -o stdout -r console -o test.log'
        ],
        schedule: {
            type: 'cron',
            pattern: '*/15 * * * *'
        },
        archive: {
            pattern: 'test.lab,test.html,test.log',
            type: 'maxnum',
            maxNumber: '20'
        },
        "notify": {
            "type": "email",
            "to": "lloyd.benson@gmail.com",
            "subject": "[ficion] [{type}] {name} {status}",
            "message": "http://localhost:8080/view/job/{jobId}/run/{runId}",
            "statuses": [
                "cancelled",
                "failed",
                "fixed"
            ]
        }
    }
];

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

var iterateJobs = function(j) {

    if (j < jobs.length) {
        var job = jobs[j];
        console.log('importing job: ' + jobs[j].name);
        var options = {
            payload: JSON.stringify(job)
        };
        //console.log(options);
        Wreck.post(url + '/job', options, function(err, resp, payload) {
            if (err) {
                //console.log(err);
                //console.log(payload);
                //console.log(resp);
            }
            iterateJobs(j + 1);
        });
    }
};
iterateJobs(0);
