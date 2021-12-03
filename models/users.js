const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

// mongoose model for users

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid Email'
        }
    },
    bio: {
        type: String,
        default: ""
    },
    courses: {
        type: [mongoose.Types.ObjectId],
        default :[]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

    // the ids of posts that this user has made
    createdPostings: {
        type: [mongoose.Types.ObjectId],
        default :[]
    },
    // the ids of postings that this user is a member of NOT including postings that this user has created
    groups: {
        type: [mongoose.Types.ObjectId],
        default :[]
    },
    // the ids of posting that this user is currently applying for (and has not gotten in)
    applying: {
        type: [mongoose.Types.ObjectId],
        default :[]
    },

})

// THE FUNCTIONS THE SECTION BELOW ARE ADAPTED FROM user.js from react-express-authentication example on the classroom github
// https://github.com/csc309-fall-2021/react-express-authentication/blob/master/models/user.js
// START
UserSchema.pre('save', function(next) {
    const user = this

    // checks to ensure not hashing password mutliple times
    if (user.isModified('password')) {
        // generate salt and hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    }
    else{
        next()
    }
})

UserSchema.statics.findByUsernamePassword = function(username, password) {
    const User = this

    // First find the user by username: (username should be unique)
    return User.findOne({ username: username }).then((user) => {
        if (!user) {
            return Promise.reject()
        }
        // found user with matching email, now check password
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user)
                }
                else{
                    reject()
                }
            })
        })
    })
}
// END

const User = mongoose.model('User', UserSchema)
module.exports = { User }