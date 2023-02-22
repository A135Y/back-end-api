const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');
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
    issuerBaseURL: ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


const setUser = async (req, res, next) => {
    const auth = req.header("Authorization");
    if (!auth) {
        return next();
    }

    try {
        const [, token] = auth.split(" ");
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = decodedToken.user;
        const userId = user && user.id;
        if (!userId) {
            throw new Error("Invalid token data: user ID not found");
        }
        req.user = { id: userId };
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).send({ error: "Invalid token" });
    }
};

app.use(setUser);




//req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });


app.post('/register', async (req, res, next) => {

    try {
        const { username, firstname, surname, email, dateOfBirth, password, avatar } = req.body

        const existingUsername = await User.findOne({ where: { username: username } });
        if (existingUsername) {
            return res.status(400).send({ error: 'Username  already in use' });
        }

        const existingEmail = await User.findOne({ where: { email: email } });
        if (existingEmail) {
            return res.status(400).send({ error: 'Email  already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const newUser = await User.create({ username, firstname, surname, email, dateOfBirth, password: hashedPassword, avatar });
        console.log("Successfully created user " + newUser.username);
        res.send({ message: "success", userId: newUser.id });
    } catch (e) {
        console.log(e);
        next(e);
    }
})

app.post("/", async (req, res, next) => {

    try {
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail) {
            return res.status(400).send({ error: "Username or email is required" });
        }

        let user;
        if (usernameOrEmail.includes("@")) {
            user = await User.findOne({ where: { email: usernameOrEmail } });
        } else {
            user = await User.findOne({ where: { username: usernameOrEmail } });
        }

        if (!user) {
            return res.status(401).send({ error: "Incorrect username or email" });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) {
            const token = jwt.sign({ user: user }, JWT_SECRET);
            localStorage.setItem("token", token);
            // console.log("token upon signing in: " + token);
            res.send({ token, user: user });
        } else {
            return res.status(401).send({ error: "Incorrect password" });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});



app.get("/home", async (req, res, next) => {
    try {
        // console.log("Authorization header:", req.headers.authorization);
        const userId = req.user.id; // use the user ID from req.user instead of decoding the token again
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send({ user });
    } catch (error) {
        console.error(error);
        next(error);
    }
});


app.get("/profile-page", async (req, res, next) => {
    try {
        // console.log("Authorization profile-page:", req.headers.authorization);
        const userId = req.user.id; // use the user ID from req.user instead of decoding the token again
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send({ user });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

app.put("/profile-page", async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Update user object with new data
        user.username = req.body.username || user.username;
        user.firstname = req.body.firstname || user.firstname;
        user.surname = req.body.surname || user.surname;
        user.email = req.body.email || user.email;
        user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
        if (req.body.password && req.body.confirmPassword && req.body.password === req.body.confirmPassword) {
            user.password = await bcrypt.hash(req.body.password, SALT_COUNT);
        }

        // Save updated user object to database
        await user.save();

        res.send({ user });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

app.post('/forgot-password', async (req, res, next) => {
    try {
        const { email } = req.body
        const existingEmail = await User.findOne({ where: { email: email } });
        if (existingEmail) {
            res.json({ email: email });
        } else {
            return res.status(400).send({ error: 'Email is not registered' });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
})


app.post('/enter-new-password', async (req, res, next) => {
    try {
        const { password, confirmPassword } = req.body;
        const email = req.query.email;
        const userWithExistingEmail = await User.findOne({ where: { email: email } });
        const isMatched = await bcrypt.compare(password, userWithExistingEmail.password);

        if (password !== confirmPassword) {
            return res.status(400).send({ error: "Passwords have to match" });
        }

        if (!isMatched) {
            const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
            userWithExistingEmail.password = hashedPassword;
            await userWithExistingEmail.save();
            res.send({ message: "success" });
        } else {
            return res.status(400).send({ error: 'Cannot use previous password' });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});




app.post("/api/google-signin", (req, res) => {
    const { name, email, imageUrl } = req.body;

    // Perform any necessary logic for creating or updating the user
    // ...

    // Return success or error response
})

app.use((error, req, res, next) => {
    console.error('SERVER ERROR: ', error);
    if (res.statusCode < 400) res.status(500);
    res.send({ error: error.message, name: error.name, message: error.message });
});

app.listen(3000, () => console.log('API is running on http://localhost:3000'));

