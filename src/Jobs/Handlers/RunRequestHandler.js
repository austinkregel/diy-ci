// Get the job we want to run.
const RunRequest = require('../RunRequestedJob')
// Bind the queue name to the action
app.make('queue').register((new RunRequest()).getQueueName(), async (job, done) => {
    const data = job.data;
    // since only one type of job will ever be passed through here
    // we can make some assumptions about the methods available to`job`

    //   - Clone the repo.
    //   - Run the install script from the configuration file.
    //   - Update the status in github
    app.make('github').asInstallation(data.installation.id).then(github => {
        github.repos.getContent({
            owner: data.repository.owner.login,
            repo: data.repository.name,
            path: '.custom_file.yml',
            ref: data.check_suite.head_sha
        })
    }).catch(e => {
        app.log.info('Your response is bad', {e})
    })

    done()
    // let config = parseConfigFile(response.contents);

    // build the container
    // set configuration
    // run the commands - pipe output to the files from the config file
    //

    // docker.build(config.containers)
    // docker.setConfiguration(config.baseConfig)
    // docker.execMany(config.commands);
    //
    // await axios.put('https://api.github.com/repos/' + data.repository.full_name + '/check-suite/' + job.data.external_id, {
    //     status: 'success'
    // })
});