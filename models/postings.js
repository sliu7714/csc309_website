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

const ApplicationSchema = new mongoose.Schema({
    // user id of the creator of the comment NOT the id of the comment
    applicantID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    // message to include for application
    applyMsg:{
        type: String,
        default: ""
    },
    applicationStatus:{
        type: String,
        enum: ['ACCEPTED', 'PENDING', 'REJECTED', 'CANCELLED'],
        required: true,
        default: 'PENDING'
    }

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

    isReported: {
        type: Boolean,
        default: false
    },

    // id of the creator of the post NOT the id of the posting
    creatorID:{
        type: mongoose.Types.ObjectId,
        required: true,
    },

    // the ids of users that are members of this post
    members: {
        type: [mongoose.Types.ObjectId],
        default :[]
    },

    // applications to this post
    applications: {
        type: [ApplicationSchema],
        default :[]
    },

    comments:{
        type: [CommentSchema],
        default: []
    }

})


const Posting = mongoose.model('Posting',PostingSchema)
module.exports = { Posting }