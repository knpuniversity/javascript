var Encore = require('@symfony/webpack-encore');

Encore
    // the project directory where all compiled assets will be stored
    .setOutputPath('public/build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')

    .addEntry('rep_log', './public/assets/js/rep_log.js')

    .enableBuildNotifications()
;

// export the final configuration
module.exports = Encore.getWebpackConfig();
