// NOTE, parts of this server setup code was adapted from the 'react-express-authentication' example we went through in class

// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

//const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
//const TEST_USER_ID = '5fb8b011b864666580b4efe3' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
//const TEST_USER_USERNAME = 'user_test'

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
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

/***************************** EXPRESS SESSION  **********************************/
// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production

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
/**
 * const authenticate = (req, res, next) => {
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
**/

/***************************** API ROUTES **********************************/

app.get("/api/hello-world", (req, res)=>{
   res.send("hello world")
})

app.post("/api/user/create", (req, res)=>{
    // const
    res.send("user create TODO")
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