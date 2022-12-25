const express = require("express");
const handlebars = require("express-handlebars").create({
    defaultLayout: "main",
    extname: ".hbs",
});
const path = require("path");
const axios = require('axios');

// declare app
const app = express();
const port = 3113;

// setup resources for client
// all images,... are provided from the file "public"
app.use(express.static(path.join(__dirname, "public")));

//setup handlebars
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "view"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

const bcrypt = require('bcrypt');
const saltRounds = 10;
const userM = require('./app/models/user');
const passport = require('passport');
const { randomInt } = require('crypto')

//import JWT
const { createJWT, verifyJWT } = require('./configs/jwt');

//set up session
require('./configs/session')(app);

//set up authentication
require('./configs/passportAuth')(app);

app.use(express.json());

app.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('http://localhost:20468/');
    }
    res.redirect('/log');
});

app.get('/log', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('http://localhost:20468/');
    }
    res.render('log');
});

app.post('/logout', function (req, res, next) {
    if (req.isAuthenticated()) {
        req.logout(err => {
            console.log('userC - postLogout', err);
            if (err) {
                return next(err);
            }
        })
    }
    res.redirect('/log');
});

app.post("/login", passport.authenticate('local', {
    session: false, failureRedirect: "/log", failureMessage: "fail!"
}), async (req, res, next) => {

    // check authentication
    if (req.isAuthenticated()) {
        const user = await userM.SearchUserByUsername(req.body.username);

        axios.post('http://localhost:20468/login', {
            token: user.Token,
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        return res.redirect('http://localhost:20468/');
    }
    res.redirect('/log');

});

app.post("/register", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const address = req.body.address;
    try {
        const uDb = await userM.SearchUserByUsername(username);
        res.render("log", {
            notification: "This account already exists!",
        })
    }
    catch (err) {
        try {
            const pwHashed = await bcrypt.hash(password, saltRounds);
            const userIDs = await userM.allUserID();
            let userID = randomInt(200);
            while (userIDs.includes(userID)) {
                userID = randomInt(200);
            }

            const user = {
                UserID: userID,
                FullName: fullName,
            }

            const token = createJWT(user);

            const u = {
                UserID: userID,
                Username: username,
                Password: pwHashed,
                FullName: fullName,
                Token: token,
                Address: address,
            }
            const c = {
                CusID: userID,
                CustomerName: fullName,
                Token: token,
            }
            await userM.addUser(u);
            await userM.addCus(c);
            res.render("log", {
                notification: "Register successfully, please Login!",
            })
        }
        catch (err) {
            next(err);
        }
    }

});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
