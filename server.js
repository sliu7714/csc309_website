// NOTE: parts of this server setup code was adapted from the 'react-express-authentication' example we went through in class

// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
// const USE_TEST_USER = true; //TODO: COMMENT OUT IF PUSHING
const TEST_USER_ID = '61ad4286130ef012341ffcfa' // the id of our test user - username: test2 password: pass

//setup for path macro
const path = require('path')

const express = require("express")
// starting the express server
const app = express()

// NOTE: it seems like PATCH requests are acting weird with cors?
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

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddenly disconnects
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

/***************************** HELPERS **********************************/
// should move these to separate files later

// check if the current user is a creator of a posting
// make sure to await for the return value of this
const checkIsPostingCreator = (userID, postingID) =>{
    return Posting.findById(postingID)
        .then(posting =>{
            if(!posting){
                // console.log("checkIsAdmin: did not find user")
                return false
            }
            return posting.creatorID == userID
        })
        .catch(err =>{
            console.log(err)
            return false
        })
}

// check if the current user is a creator of a posting
// posting members does NOT include the creator of the post.
// make sure to await for the return value of this
const checkIsPostingMember = (userID, postingID) =>{

    return Posting.findById(postingID)
        .then(posting =>{
            if(!posting){
                // console.log("checkIsAdmin: did not find user")
                return false
            }
            return posting.members ? posting.members.includes(userID) : false
        })
        .catch(err =>{
            console.log(err)
            return false
        })

}

// check if the current user has a application in posting
// make sure to await for the return value of this
const checkHasApplied = async (userID, postingID) =>{
    return Posting.findById(postingID)
        .then(posting =>{
            if(!posting){
                // console.log(`checkIsApplied: did not find posting ${postingID}`)
                return false
            }
            if (posting.applications){
                const matchingApplicantIDs = posting.applications.filter(application => application.applicantID == userID)
                return matchingApplicantIDs.length > 0
            }
            return false;

        })
        .catch(err =>{
            console.log(err)
            return false
        })

}

// check if the current user is an admin user
// make sure to await for the return value of this
const checkIsAdmin = async (userID) =>{

    return User.findById(userID)
        .then(user =>{
            if(!user){
                // console.log("checkIsAdmin: did not find user")
                return false
            }
            return user.isAdmin ? user.isAdmin : false
        })
        .catch(err =>{
            console.log(err)
            return false
        })
}

// return some info about a user, given the id
// specifically the userID, name, and profile pic index
const getProfileSummary = async (id) =>{
    // start a new object representing profile summary
    const profileInfo = {id}
    await User.findById(id)
        .then(user => {
            if(!user){
                // return a object representing an deleted user
                return({
                    id: id,
                    name: 'deleted user',
                    profileImageIndex: 0, // can change to special index later as well
                })
            }
            profileInfo.name = user.name
            profileInfo.profileImageIndex = user.profileImageIndex
        })
        .catch(err =>{
            console.log("error in getProfileSummary for id", id," :", err)
            return
        })

    return profileInfo
}

// add profile info the the creator, applicant, and member sections of the posts
const addUserInfoToPosts = async (postingList, req) =>{
    return Promise.all(postingList.map(async (posting) => {
        // check if the current user is the creator or a member or admin
        const isCreator = await checkIsPostingCreator(req.session.user, posting._id)
        const isMember = await checkIsPostingMember(req.session.user, posting._id)
        const isAdmin = await checkIsAdmin(req.session.user)
        // check if current user has applied to this post
        const hasApplied  = await checkHasApplied(req.session.user, posting._id)

        // get creator info
        const creatorInfo = await getProfileSummary(posting.creatorID)

        // note : posting has some extra info from mongo so the actual posting is posting._doc
        const postingInfo = {...posting._doc, isCreator, isMember, hasApplied, creatorInfo}

        if(isCreator || isMember || isAdmin){
            // get member info
            // note not sure why indexing into members works to get id but using map or for...in... the member returns value of 0?
            // NOTE: might run into the same problem with applicants id below TODO: make sure to fix if this is the case
            const memberInfo = []
            for (let i=0 ; i< posting.members.length; i++){
                const info = await getProfileSummary(posting.members[i])
                memberInfo.push(info)
            }
            postingInfo.memberInfo = memberInfo
            // add userinfo to comments
            const commentsInfo = await Promise.all(posting.comments.map(async (comment) =>{
                const creatorInfo = await getProfileSummary(comment.creatorID)
                return({...comment._doc, creatorInfo})
            }));
            postingInfo.commentsInfo = commentsInfo
        }
        if (isCreator || isAdmin){
            // get applicant info
            const applicantsInfo = await Promise.all(posting.applications.map(async (application) =>{
                const applicantInfo = await getProfileSummary(application.applicantID)
                return({...application._doc, applicantInfo})
            }));
            postingInfo.applicantsInfo = applicantsInfo
        }
        if (hasApplied){
            // get application info
            const application = posting.applications.filter(application => application.applicantID == req.session.user)[0]
            postingInfo.application = application
        }

        return postingInfo
    }));
}


/***************************** SESSION HANDLING  **********************************/

// create session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "connect uoft secret", // added secret to heroku config vars
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 3600000, // session lasts 1 hour
            httpOnly: true
        },
        // store the sessions on the database in production
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/ConnectUofTAPI'
        })
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
        isAdmin = await checkIsAdmin(req.session.user)
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

/************** POSTINGS API *********************/
// note: if using the "authenticate" middleware,  get req.session.user is the userID of the current logged in user

// // code snippet to check if a user is a member for editing posts (sometimes don't need to be creator for example to comment)
// const canEditPost = await checkIsPostingCreator(req.postingID)
// if (! canEditPost ){
//     res.status(403).send("Cannot edit a post that a user has not created")
// }

// create a new post with the currently logged in user as the creator
app.post('/api/postings', mongoChecker, authenticate, async (req, res) => {

    try {
        // Create a new posting
        const posting = new Posting({
            creatorID: req.session.user,
            title: req.body.title,
            description: req.body.description,
            capacity: req.body.capacity,
            endDate: new Date(req.body.endDate), // NOTE: make sure this is a string in the format "YYYY-mm-dd"
            tags: req.body.tags ? req.body.tags : [],
            // rest is default (see postings.js)
        })

        // Save posting to the database
        const postResult = await posting.save()
        res.send(postResult)
    } catch(error) {
        console.log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
});

// update post with new information
app.put('/api/postings', mongoChecker, authenticate, async (req, res) => {

    // only creator can update post
    const canEditPost = await checkIsPostingCreator(req.session.user, req.postingID)
    if (! canEditPost ){
        res.status(403).send("Cannot edit a post that a user has not created")
    }

    try {
        // Find the posting and overwrite all information
        await Posting.findOneAndUpdate({ _id : req.body.postingID }, { $set: {
            title: req.body.posting.title,
            description: req.body.posting.description,
            capacity: req.body.posting.capacity,
            endDate: req.body.posting.endDate,
            tags: req.body.posting.tags,
          }});

    } catch(error) {
        console.log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request')
        }
    }
});

// a DELETE route to delete specific posting
app.delete('/api/postings', mongoChecker, authenticate, async (req, res) => {

    // only creator or admin can delete post
    const isCreator = checkIsPostingCreator(req.session.user, req.body.postingID)
    const isAdmin = checkIsAdmin(req.session.user)
    const canDeletePost = isCreator || isAdmin
    if (! canDeletePost ){
        res.status(403).send("Cannot edit a post that a user has not created")
    }

    try {
        const posting = await Posting.deleteOne({ _id: req.body.postingID })
        if (!posting){
            res.status(404).send(`delete: could not find posting, id: ${req.body.postingID}`)
        }
        res.send(`deleted post, id: ${req.body.postingID}`)
    } catch(error) {
        console.log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request')
        }
    }
});

// a POST rout to leave a comment on a post, creator,member, or admin only
app.post('/api/postings/comment', mongoChecker, authenticate, async (req, res) => {

    // only creator or admin or member can delete post
    const isCreator = checkIsPostingCreator(req.session.user, req.body.postingID)
    const isMember = checkIsPostingCreator(req.session.user, req.body.postingID)
    const isAdmin = checkIsAdmin(req.session.user)
    const canComment = isCreator || isAdmin || isMember
    if (! canComment ){
        res.status(401).send("Cannot edit a post that a user has not created")
    }


    const comment = {
        creatorID: req.session.user,
        content: req.body.content,
    }

    // Update the posting
    try {
        const posting = await Posting.findOneAndUpdate({ _id: req.body.postingID }, { $push: {comments: comment }})
        if (!posting){
            res.status(404).send(`comment: could not find posting, id: ${req.body.postingID}`)
        }
        res.send(`commented on posting, id: ${req.body.postingID}`)
    } catch(error) {
        console.log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request')
        }
    }
});

// a GET route to get a specific posting by id
// note the id is part of the url
// add the /get-by-id/ to prevent the other paths (ex - /api/postings/create) from being directed to this route
app.get('/api/postings/get-by-id/:pid', mongoChecker, authenticate, async (req, res) => {

    if(!ObjectID.isValid(req.params.pid)){
        console.log('cant find post with id: ', req.params.pid)
        res.status(404).send("Cannot find resource, Invalid id.")
    }

    try {
        const posting = await Posting.findById(req.params.pid)
        if(!posting){
            res.status(404).send("post not found")
        }
        const parsedPosting = await addUserInfoToPosts([posting], req)
        res.send(parsedPosting[0])
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});

// a GET route to get all posts a user has created
app.get('/api/postings/created', mongoChecker, authenticate, async (req, res) => {
    // Get the postings
    try {
        const postings = await Posting.find({creatorID: ObjectID(req.session.user)})
        //  parse posting applicants and members to include other profile info
        const parsedPostings = await addUserInfoToPosts(postings, req)
        res.send(parsedPostings)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});

// a GET route to get all posts a user is a member of
app.get('/api/postings/member', mongoChecker, authenticate, async (req, res) => {

    // Get the postings
    try {
        const postings = await Posting.find({members: ObjectID(req.session.user)})
        //  parse posting applicants and members to include other profile info
        const parsedPostings = await addUserInfoToPosts(postings, req)
        res.send(parsedPostings)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});

// a POST route to get all posts matching a list of tags
// POST since we are generating search results
// do not return any posts that the currently logged in user is a creator of
app.post('/api/postings/search', mongoChecker, authenticate, async (req, res) => {

    // if tags is empty, don't filter
    const filter = req.body.tags && req.body.tags.length > 0? {tags: {$all: req.body.tags}, creatorID: {$ne: req.session.user}, members: {$not: {$all: [req.session.user]}}} 
    : 
    {creatorID: {$not: {$eq: req.session.user}}, members: {$not: {$all: [req.session.user]}}}

    //const filter =  {creatorID: {$ne: req.session.user}}
    // if tags is empty, don't filter by tags
    //if(req.body.tags && req.body.tags.length > 0){
    //    filter.tags = {$in: req.body.tags}
    //}


    // Get the postings
    try {
        const postings = await Posting.find(filter)
        //  parse posting applicants and members to include other profile info
        const parsedPostings = await addUserInfoToPosts(postings, req)
        res.send(parsedPostings)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});


// POST to create application to a post
app.post('/api/postings/apply', mongoChecker, authenticate, async (req, res) => {

    const applicant = {
        applicantID: req.session.user,
        applyMsg: req.body.message,
        applicationStatus: 'PENDING'
    }

    // Update the posting
    try {
        console.log('apply', req.body.postingID)
        const retval = await Posting.findOneAndUpdate({ _id: req.body.postingID }, { $push: {applications: applicant }})
        //res.send(postings)
        res.send(retval)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});

// a PUT to accept a applicant
app.put('/api/postings/accept', mongoChecker, authenticate, async (req, res) => {

    // only creator can update applicant status
    const canEditPost = await checkIsPostingCreator(req.session.user, req.body.postingID)
    if (! canEditPost ){
        res.status(403).send("Cannot edit a post that a user has not created")
    }

    // TODO: check capacity, check that application is actually pending (so don't accept twice)

    // fix to use postingID to find the post
    // update the applicant status to ACCEPTED
    // update the members by pushing the userID
    try {
        await Posting.updateOne({ _id: req.body.postingID, "applications.applicantID": req.body.applicantID }, { $set: {"applications.$.applicationStatus": 'ACCEPTED'}})
        await Posting.updateOne({ _id: req.body.postingID }, { $push: { members: req.body.userID}})
        res.send("added applicant")

    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});

// a PUT to decline a applicant
app.put('/api/postings/decline', mongoChecker, authenticate, async (req, res) => {

    // only creator can update applicant status
    const canEditPost = await checkIsPostingCreator(req.session.user, req.body.postingID)
    if (! canEditPost ){
        res.status(403).send("Cannot edit a post that a user has not created")
    }

    // update the applicant status to REJECTED
    try {
        const posting = await Posting.findOneAndUpdate({ _id: req.body.postingID, "applications.applicantID": req.body.applicantID }, { $set: {"applications.$.applicationStatus": 'REJECTED'}})

    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});


// get all reported posts
app.get('/api/postings/report', mongoChecker, authenticate, async (req, res) => {

    // Get the postings
    try {
        const postings = await Posting.find({isReported: true}) // can filter here > {creator: req.user._id}
        //  parse posting applicants and members to include other profile info
        const parsedPostings = await addUserInfoToPosts(postings, req)
        res.send(parsedPostings)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});

// report a specific post
app.put('/api/postings/report', mongoChecker, authenticate, async (req, res) => {

    // Update the posting
    try {
        const posting = await Posting.updateOne({ _id: req.body.postingID }, {isReported: true })
        if (!posting){
            res.status(404).send(`report: could not find posting id: ${req.body.postingID}`)
        }
        res.send(`reported posting id: ${req.body.postingID}`)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }

});

app.get('/api/postings/pending', mongoChecker, authenticate, async (req, res) => {

    // Get the postings
    try {
        const postings = await Posting.find({applications: {$elemMatch: {_id: req.session.user, applicationStatus: 'PENDING'}}})
        //  parse posting applicants and members to include other profile info
        const parsedPostings = await addUserInfoToPosts(postings, req)
        res.send(parsedPostings)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});

app.get('/api/postings/denied', mongoChecker, authenticate, async (req, res) => {

    // Get the postings
    try {
        const postings = await Posting.find({applications: {$elemMatch: {_id: req.session.user, applicationStatus: 'REJECTED'}}})
        //  parse posting applicants and members to include other profile info
        const parsedPostings = await addUserInfoToPosts(postings, req)
        res.send(parsedPostings)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});


/************** USERS API *********************/


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
app.get("/api/user/profile/:id", mongoChecker, async(req, res)=>{
    const userID = req.params.id
    if (!ObjectID.isValid(userID)) {
		res.status(404).send()
		return;
	}
    try{
        const user = await User.findById(userID)
        res.send(user)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
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

app.put("/api/user/modify", mongoChecker, authenticate, async(req, res)=>{
    const updatedInfo = {
		name:req.body.name,
        email: req.body.email,
		username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
        profileImageIndex: req.body.profileImageIndex,
        courses: req.body.courses
	}
    
    try {
        const user = await User.findById(req.session.user)
        console.log(user)
        user.set(updatedInfo)
        const result = await user.save()
        if (!user) {
			res.status(404).send('Resource not found')
		} else {  
			res.send(user)
		}
    } catch (error) {
		console.log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') 
		}
    }
})

app.post('/api/user/report', mongoChecker, authenticate, async (req, res) => {

    // Update the User to Reported status
    try {
        const user = await User.updateOne({ _id: req.body.userID }, { isReported: true }) 
        if (!user){
            res.status(404).send(`report: could not find posting id: ${req.body.userID}`)
        }
        res.send(`reported posting id: ${req.body.userID}`)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }

});

app.get('/api/user/report', mongoChecker, authenticate, async (req, res) => {

    const isAdmin = checkIsAdmin(req.session.user)
    if (! isAdmin ){
        res.status(403).send("Only Admins may get reported users")
    }

    // Get the Users that are reported
    try {
        const users = await User.find({isReported: true})
        res.send(users)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
});

app.post('/api/user/unreport', mongoChecker, authenticate, async (req, res) => {

    // Update the User to Reported status
    try {
        const user = await User.updateOne({ _id: req.body.userID }, { isReported: false }) 
        if (!user){
            res.status(404).send(`report: could not find posting id: ${req.body.userID}`)
        }
        res.send(`unreported posting id: ${req.body.userID}`)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }

});

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