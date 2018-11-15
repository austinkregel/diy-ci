module.exports = class Queue {
    constructor(kue, maxAttempts = 3) {
        this.queue = kue.createQueue();
        this.maxAttempts = maxAttempts;
        this.kue = kue;
    }

    dispatch(job, { priority = 'normal', ttl = 60000, delay = 400 }) {
        if (typeof job.getQueueName !== 'function') {
            throw new Error('You must defined a getQueueName method so the dispatcher knows where to put the job.');
        }

        if (typeof job.getQueueName !== 'function') {
            throw new Error('You must define a toJson method so the dispatcher can put data into the queue.');
        }

        let newJob = this.queue.create(job.getQueueName(), job.toJson())
            .priority(priority || 'normal')
            .attempts(this.maxAttempts || 3)
            .backoff({ type: 'exponential' })
            .ttl(ttl || 60000)
            .delay(delay || 400)
            .removeOnComplete(true)
            .save();

        app.log.info('Built new job!', {newJob})

        return newJob
    }

    register(name, action) {
        app.log.info("registered new processor", {queueName: name})
        this.queue.process(name, action);
    }

    listen(port = 3001) {
        this.kue.app.listen(3001, () => console.log('Kue UI started'))
    }

    static register() {
        require('./Jobs/Handlers/RunRequestHandler')
    }
}