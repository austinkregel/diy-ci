require('dotenv').config({})
require('fringejs')
app.log.info = (message, context = []) => {
    console.log('[-]', message, context)
}

let { queryRequest } = require('./bootstrap/app');
let webhook = require('./src/Webhook');

let Router = app.make('Router');
let edge = app.make('edge');
let bodyParser = require('body-parser');

// parse application/json
Router.express.use(bodyParser.json())

Router.get('/register', (req, res) => {
    return edge.render('home', {
        installation_id: queryRequest(req).installation_id,
        setup_action: queryRequest(req).setup_action
    })
});

Router.express.post('/webhook', (req, res) => {
    webhook.handle(req.body)
    res.send('OK');
});

Router.listen(3000, () => console.log('Doing a thing!'))