const jwt = require('jsonwebtoken');
// set up dot env
require('dotenv').config();
const secretkey = "mysecret";

function createJWT(user) {

    return jwt.sign({
        CusID: user.UserID,
        CustomerName: user.FullName,
    }, secretkey, {
        expiresIn: '1d'
    });
}

function verifyJWT(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            error: 'You must provide a JWT for authorization'
        });
    }
    jwt.verify(token, secretkey, function (err, decoded) {
        if (err) {
            return res.status(401).send({
                error: 'Invalid JWT'
            });
        }
        req.CusID = decoded;
        next();
    });
}

module.exports = { createJWT, verifyJWT };