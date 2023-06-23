const express = require("express")
const app = express()

const bcrypt = require("bcrypt");
const { render } = require("ejs");
const saltRounds = 10


// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));


let errorMessage = ""
// set the view engine to ejs
app.set('view engine', 'ejs');


let usersDB = []

app.get("/", (req, res) => {
    res.send(usersDB)
})

app.get("/login", (req, res) => {
    res.render("login", { errorMessage })
})

app.post("/login", async (req, res) => {
    const passwordForm = req.body.password
    const userNameForm = req.body.username
    //checking if such user exists:
    const user = usersDB.find(user => user.userName === userNameForm)
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(passwordForm, user.password)
        if (isPasswordCorrect) {
            errorMessage = ""
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