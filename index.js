const prplServer = ((num) => {

    const app = require('./dist/library');

   _start = (newPort, newBuildsPath, buildsConfig) => {
        app({newPort, newBuildsPath, buildsConfig});
    }

    startServer = (newPort='', newBuildsPath='', buildsConfig) => {
        if(!newPort || !newBuildsPath) return 'Invalid configuration';

        _start(newPort, newBuildsPath, buildsConfig);
    }

    return {
        startServer
    }
})();

module.exports = prplServer;