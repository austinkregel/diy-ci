let added = require('./added');
let created = require('./created');
let deleted = require('./deleted');
let removed = require('./removed');
let requested = require('./requested');

module.exports = {
    handle(hook) {
        switch (hook.action) {
            case 'added':
                added(hook);
                return;
            case 'created':
                created(hook);
                return;
            case 'deleted':
                deleted(hook);
                return;
            case 'removed':
                removed(hook);
                return;
            case 'requested':
            case 'rerequested':
                requested(hook);
                return;
            default:
                throw new Error('Your hook type [' + hook.action + '] is not currently supported');
        }
    }
}
