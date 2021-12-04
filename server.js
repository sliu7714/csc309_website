// NOTE: parts of this server setup code was adapted from the 'react-express-authentication' example we went through in class

// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
const TEST_USER_ID = '61aa60e1af5adf44801f1523' // the id of our test user

//setup for path macro
const path = require('path')

const express = require("express")
// starting the express server
const app = express()

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose")
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models - Schemas
const { User } = require("./models/users")
const { Posting } = require("./models/postings")

// to validate object IDs
const { ObjectID } = require("mongodb")

/************************* BODY-PARSER MIDDLEWARE *******************************/
// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser') 
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })) // parsing URL-encoded form data (from form POST requests)

/***************************** EXPRESS SESSION  **********************************/
// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo'); // to store session information on the database in production
const { postings } = require('./connect-uoft-frontend/src/data/data');

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/***************************** MONGO MIDDLEWARE **********************************/
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        console.log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()
    }
}

/***************************** AUTHENTICATION MIDDLEWARE **********************************/
 const authenticate = (req, res, next) => {

    if (env !== 'production' && USE_TEST_USER)
        req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

app.post('/api/postings', mongoChecker, authenticate, async (req, res) => {

    // Create a new posting
    const posting = new Posting({
        name: req.body.title, // fill in the rest
    })

    // Save posting to the database
    // async-await version:
    try {
        const result = await Posting.save() 
        res.send(result)
    } catch(error) {
        log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

// a GET route to get all posts
app.get('/api/postings', mongoChecker, authenticate, async (req, res) => {

    // Get the postings
    try {
        const postings = await Posting.find({}) // can filter here > {creator: req.user._id}
        res.send(postings) 
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
});

// PATCH to update the applicants
app.patch('/api/postings', mongoChecker, authenticate, async (req, res) => {

    // Update the posting
    try {
        const postings = await Posting.updateOne({ _id: req.posting_id }, { $push: {applicants: req.applicant }}) // can filter hyere > {creator: req.user._id}
        //res.send(postings) 
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
});

app.get('/api/postings/report', mongoChecker, authenticate, async (req, res) => {

    // Get the postings
    try {
        const postings = await Posting.find({isReported: True}) // can filter here > {creator: req.user._id}
        res.send(postings) 
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
});

app.patch('/api/postings/report', mongoChecker, authenticate, async (req, res) => {

    // Update the posting
    try {
        const postings = await Posting.updateOne({ _id: req.posting_id }, {isReported: True }) // can filter hyere > {creator: req.user._id}
        //res.send(postings) 
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
    }
});


/***************************** HELPERS **********************************/
// should move these to separate files later

// check if the current user is a creator of a posting
// assume user is authenticated - so req.session.user exists
const checkIsPostingCreator = (postingID) =>{
    // userID = req.session.user;
    // TODO
}

// check if the current user is a creator of a posting
// posting members does NOT include the creator of the post.
// assume user is authenticated - so req.session.user exists
const checkIsPostingMember = (postingID) =>{
    // userID = req.session.user;
    // TODO

}

// check if the current user is an admin user
// assume user is authenticated - so req.session.user exists
// make sure to await for the return value of this
const checkIsAdmin = async (req) =>{

    return User.findById(req.session.user)
        .then(user =>{
            if(!user){
                // console.log("checkIsAdmin: did not find user")
                return false
            }
            return true
        })
        .catch(err =>{
            console.log(err)
            return false
        })
}

/***************************** SESSION HANDLING  **********************************/

// create session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "connect uoft secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 3600000, // session lasts 1 hour
            httpOnly: true
        },
        // store the sessions on the database in production
        store: env === 'production' ? MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/ConnectUofTAPI'
        }) : null
    })
);

// login, create session
app.post("/api/user/login", (req, res) =>{

    const username = req.body.username
    const password = req.body.password

    // find user
    User.findByUsernamePassword(username, password)
        .then(user => {
            // add user id to session
            req.session.user = user._id
            req.session.username = user.username
            // make sure to update check-session endpoint as well if adding anything to this response
            res.send({userID: user._id, isAdmin: user.isAdmin})
        })
        .catch(err => {
            console.log(err)
            res.status(400).send()
        })
})

// logout, delete session
app.get("/api/user/logout", (req, res) =>{

    // delete session
    req.session.destroy(err => {
        if (err){
            res.status(500).send(err)
        }
        else{
            res.send()
        }
    })
})

// check if user is logged in
app.get("/api/user/check-session", async (req, res) => {
    if (env !== 'production' && USE_TEST_USER){
        req.session.user = TEST_USER_ID
        res.send({userID: TEST_USER_ID, isAdmin: false})
        return;
    }

    // user session exists if session.user (userid) exists -- this is set in login
    if (req.session.user){
        isAdmin = await checkIsAdmin(req)
        res.send({ userID: req.session.user, isAdmin: isAdmin })
    }
    else{
        res.status(401).send('No session')
    }
})

/***************************** API ROUTES **********************************/

// simple hello world for testing
app.get("/api/hello-world", mongoChecker, (req, res)=>{
   res.send("hello world")
})


// create new user
// note: does NOT login or create a session.
app.post("/api/user/create", mongoChecker, async (req, res)=>{

    // make new user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.username, // start off with username as name of the user
        // use defaults for the rest of the properties
    })

    try{
        const newUser = await user.save()
        res.send(newUser)
    }
    catch(err){
        res.status(400).send('Bad Request: Incorrect format or non-unique username')
    }

})

// get userInfo of the user logged in
app.get("/api/user", mongoChecker, authenticate, (req, res)=>{

    // check if there is user logged in
    if (req.session.user){
        User.findById(req.session.user)
            .then(user =>{
                if (!user){
                    res.status(404).send("No user found")
                }
                res.send(user)
            })
            .catch((err) =>{
                res.status(500).send('Internal server error')
            })
    }
    else{
        res.status(404).send("No user logged in")
    }

})

/************************** WEBPAGE ROUTES **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/connect-uoft-frontend/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/home", "/manage", "/profile", "/posting/*"];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/connect-uoft-frontend/build/index.html"));
});


/******************************* SERVER LISTENING ***************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});