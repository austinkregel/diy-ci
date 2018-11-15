module.exports = class RequestedJob {

    constructor(gitProviderData) {
        this.gitProviderData = gitProviderData;
    }

    getQueueName() {
        return 'jobs:requested';
    }

    toJson() {
        console.log('Building the toJson')
        return this.gitProviderData
    }
}
