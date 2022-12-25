const homeRoute = require('./homeRoute');

function routes(app) {
    app.use("/", homeRoute);
}

module.exports = routes;