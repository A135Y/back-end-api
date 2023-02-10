const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const User = require("./Users")
const { SECRET, BASE_URL, ISSUER_BASE_URL, CLIENT_ID } = process.env;
const SALT_COUNT = 9;
const bcrypt = require("bcrypt")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const { auth } = require('express-openid-connect');

// const config = {
//     authRequired: true,
//     auth0Logout: true,
//     secret: SECRET,
//     baseURL: BASE_URL,
//     clientID: CLIENT_ID,
//     issuerBaseURL: ISSUER_BASE_URL
// };

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });


app.post('/register', async (req, res, next) => {
    try {
        const { username, firstname, surname, email, dateOfBirth, password } = req.body
        const hashedPassword = bcrypt.hash(password, SALT_COUNT);
        console.log(req.body)
        const newUser = await User.create({ username, firstname, surname, email, dateOfBirth, password: hashedPassword })
        console.log("successfully created user " + newUser.username)
        res.send("successfully created user " + newUser.username)

    }
    catch (e) {
        console.log(e)
        next(error)
    }
})

// app.post('/login', async (req, res, next) => {
//     try {
//         const { username, password } = req.body

//         const [foundUser] = await User.findAll({ where: { username: username } })
//         if (!foundUser) {
//             res.send("incorrect username or password");
//         }
//         const isUserFound = await bcrypt.compare(password, foundUser.password)
//         if (isUserFound) {
//             res.send("successfully logged in user " + foundUser.username)
//         } else {
//             res.send("incorrect username or password")
//         }
//     }
//     catch (e) {
//         console.log(e)
//         next(e)
//     }
// })


app.listen(3000, () => console.log('API is running on http://localhost:3000'));

