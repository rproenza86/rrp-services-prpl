const prplServer = ((num) => {

    const app = require('./dist/library');

   _start = (newPort, newBuildsPath, buildsConfig) => {
        return app({newPort, newBuildsPath, buildsConfig});
    }

    startServer = (newPort='', newBuildsPath='', buildsConfig) => {
        if(!newPort || !newBuildsPath) return 'Invalid configuration';

        return _start(newPort, newBuildsPath, buildsConfig);
    }

    return {
        startServer
    }
})();

module.exports = prplServer;