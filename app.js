const express = require("express")
const app = express()
const { getAllAirlines } = require("./Model/airlinesDb")
const bcrypt = require("bcrypt");

const saltRounds = 10
const token_secret = "blablabla"
const cookie_parser = require("cookie-parser")

const jwt = require('jsonwebtoken')

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser())

let errorMessage = ""
// set the view engine to ejs
app.set('view engine', 'ejs');


let usersDB = [{
    "userName": "Arya",
    "password": "$2b$10$7vmLkZWm4RWEJ4PO3r68Wu6xGAB4ImPrprClOqgz5SQM97AaeeELS",
    "email": "asdas@as.com"
}]

const authenticate = (req, res, next) => {
    if (req.path === '/login' || req.path === '/signUp') {
        return next()
    }
    const access_token = req.cookies.access_token
    try {
        const user = jwt.verify(access_token, token_secret);
        next();
    } catch (err) {
        res.redirect("/login")
    }
}

app.use("/", authenticate)

app.get("/", (req, res) => {
    // res.send(usersDB)
    res.render("home")
})

app.get("/login", (req, res) => {
    res.render("login", { errorMessage })
})


app.get("/getAllAirlines", async (req, res) => {
    try {
        const airlines = await getAllAirlines()
        res.render("airlines", { airlines })
    } catch (err) {
        res.send(err)
    }
})

app.post("/login", async (req, res) => {
    const passwordForm = req.body.password
    const userNameForm = req.body.username
    //checking if such user exists:
    const user = usersDB.find(user => user.userName === userNameForm)
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(passwordForm, user.password)
        if (isPasswordCorrect) {
            const token = jwt.sign(user, token_secret)
            // console.log("token is " , token);
            errorMessage = ""
            res.cookie("access_token", token, {
                sameSite: 'strict',
                httpOnly: true,
            })

            res.redirect("/")
        } else {
            errorMessage = "the password is not correct try again"
            res.render("login", { errorMessage })
        }
    } else {
        errorMessage = "no such user try again"
        res.render("login", { errorMessage })
    }
})



app.post("/signUp", async (req, res) => {
    const userName = req.body.username
    const password = req.body.password
    const hashedPasword = await bcrypt.hash(password, 10)
    console.log(hashedPasword);
    createUser(userName, hashedPasword, req.body.email)
    res.redirect("/")
})

const createUser = (userName, password, email) => {
    usersDB.push({ userName, password, email })
    console.log(usersDB);
    return true;
}

app.get("/signUp", (req, res) => {
    res.render("signUp", { errorMessage })
})




app.listen(3001, (err) => {
    if (!err) {
        console.log("server is up")
    }
})