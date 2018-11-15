const RequestedJob = require('../Jobs/RunRequestedJob');

module.exports = async (hook) => {
    //create a local record of the job, save the ID, and pass that through to the job.

    // Post to github that our system acknowledges that this commit is going to be checked.

    // const check = new Check();
    // check.id = Math.random() * 314.159;
    // check.hash = hook.check_suite.head_sha;
    // check.save();

    app.make('github').asInstallation(hook.installation.id).then(github => {
        github.checks.create({
            owner: hook.repository.owner.login,
            repo: hook.repository.name,
            name: 'Type of CI Coverage',
            head_sha: hook.check_suite.head_sha,
            details_url: 'http://example.com/not-implemented',
            external_id: ''+ Math.round(Math.random() * 3141.59),
            // always start the status at queued
            status: 'queued',
        })
    })

    app.log.info('Created a new check for the repo!');

    const JobToRun = new RequestedJob(hook);
    app.make('queue').dispatch(JobToRun, {});
}