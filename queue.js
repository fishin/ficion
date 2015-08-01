var Hoek = require('hoek');
var Wreck = require('wreck');

var url = 'http://localhost:8081/api';

var projects = [ 'angler', 'bait', 'bobber', 'brag', 'catch-and-release', 'fillet', 'fishhook', 'gills', 'hatchery', 'mock', 'pail', 'reel', 'smelt', 'tacklebox', 'demo' ];

var iterate = function(i) {

    if (i < projects.length) {
        console.log('starting project: ' + projects[i]);
        Wreck.get(url + '/job/byname/' + projects[i], { json: true }, function(err1, resp1, payload1) {

            var jobId = payload1.id;
            var payload = { jobId: jobId };
            var options = {
                payload: JSON.stringify(payload),
                json: true
            };
//            console.log(options);
            Wreck.post(url + '/queue', options, function(err2, resp2, payload2) {
                if (payload2 && payload2.statusCode) {
                    console.log(payload2);
                };
                iterate(i + 1);
            });
        });
    }
};
iterate(0);
