const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI  || 'mongodb://localhost:27017/ConnectUofTAPI'

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.connect(mongoURI)

// export active connection
module.exports = { mongoose }