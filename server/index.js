const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken');

const { User } = require("./User")
const { SECRET, BASE_URL, ISSUER_BASE_URL, CLIENT_ID, JWT_SECRET } = process.env;
const SALT_COUNT = 9;
const bcrypt = require("bcrypt")




const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: SECRET,
    baseURL: BASE_URL,
    clientID: CLIENT_ID,
    issuerBaseURL: ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


const setUser = async (req, res, next) => {
    const auth = req.header("Authorization")
    if (!auth) {
        next();
    } else {
        const [, token] = auth.split(" ")
        const user = jwt.verify(token, JWT_SECRET)
        req.user = user
        next()
    }
}

app.use(setUser);



// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });


app.post('/register', async (req, res, next) => {

    try {
        const { username, firstname, surname, email, dateOfBirth, password } = req.body

        const existingUsername = await User.findOne({ where: { username: username } });
        if (existingUsername) {
            return res.status(400).send({ error: 'Username  already in use' });
        }

        const existingEmail = await User.findOne({ where: { email: email } });
        if (existingEmail) {
            return res.status(400).send({ error: 'Email  already in use' });
        }


        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const newUser = await User.create({ username, firstname, surname, email, dateOfBirth, password: hashedPassword });
        console.log("Successfully created user " + newUser.username);
        res.send({ message: "success", newUser });
    } catch (e) {
        console.log(e);
        next(e);
    }
})

app.post('/', async (req, res, next) => {
    const { username, password } = req.body
    const isEmail = username;
    const changeToEmail = false;
    for (let i = 0; i < isEmail.length; i++) {
        if (isEmail[i] == "@") {
            console.log(isEmail[i])
            changeToEmail = true;
        }
    }

    try {
        const user = await User.findOne({ where: { username: username } });
        const isMatched = await bcrypt.compare(password, user.password)

        if (isMatched) {

            res.send({ message: "success You're logged in " + user.username })
        }
        else {
            res.sendStatus(401);
        }

    }
    catch (e) {
        console.log(e)
        next(e)
    }
})



app.use((error, req, res, next) => {
    console.error('SERVER ERROR: ', error);
    if (res.statusCode < 400) res.status(500);
    res.send({ error: error.message, name: error.name, message: error.message });
});

app.listen(3000, () => console.log('API is running on http://localhost:3000'));

