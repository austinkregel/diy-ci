const path = require('path');
const edge = require('edge.js');
const kue = require('kue');
const Queue = require('../src/Queue')

const createApp = require('github-app');

const github = createApp({
    // Your app id
    id: 20603,
    // The private key for your app, which can be downloaded from the
    // app's settings: https://github.com/settings/apps
    cert: require('fs').readFileSync('./ci.private-key.pem')
});

global.axios = require('axios').create({
    headers: {
        'Content-Type':'application/json',
        'Accept': 'application/vnd.github.antiope-preview+json'
    }
});

const queryRequest = req => {
    let bits = Object.assign(req.params, req.query);

    try {
        return Object.assign(bits, JSON.parse(req.body));
    } catch (e) {
        return bits;
    }
}
// configure cache
edge.configure({
    cache: process.env.APP_ENV === 'production'
})

// register views
edge.registerViews(path.join(__dirname, '../views'))

app.aliases({
    edge,
    queue: new Queue(kue),
    github
})

Queue.register()

if (process.env.APP_ENV !== 'production') {
    app.alias('queue').listen();
}


module.exports = {
    queryRequest
}
