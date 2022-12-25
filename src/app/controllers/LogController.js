const { verifyJWT } = require('../../configs/jwt');

class LogController {
    //[POST] /login
    postLogin(req, res, next) {
        verifyJWT(req, res, next);
        console.log("Successfully logged in ");
    }
}

module.exports = new LogController();