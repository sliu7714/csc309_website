const mongoose = require('mongoose')

// mongoose model for postings

const CommentSchema = new mongoose.Schema({
    // user id of the creator of the comment NOT the id of the comment
    creatorID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    // body of the comment
    content:{
        type: String,
        required: true,
        minlength: 1,
    },

    // can access creation time from createdAt attributes automatically created (from timestamps option below
}, {timestamps: true})

const PostingSchema = new mongoose.Schema({

    title:{
        type: String,
        minlength: 1,
        required: true,
        trim: true,
    },

    description: {
        type: String,
    },

    capacity: {
        type: Number,
        required: true,
        min: 2,
    },

    endDate:{
        type: Date,
        required: true,
    },

    tags:{
        type: [String],
        default: [],
    },

    // id of the creator of the post NOT the id of the posting
    creatorID:{
        type: mongoose.Types.ObjectId,
        required: true,
    },

    // the ids of users that are memebers of this post
    members: {
        type: [mongoose.Types.ObjectId],
        default :[]
    },

    // the ids of users that are applying to this post
    applicants: {
        type: [mongoose.Types.ObjectId],
        default :[]
    },

    comments:{
        type: [CommentSchema],
        default: []
    }

})


const Posting = mongoose.model('Posting',PostingSchema)
module.exports = { Posting }