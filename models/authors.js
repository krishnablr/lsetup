const mongoose = require('mongoose')

const authorSchema = new    mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    skill: {
        type: String, 
        required: true
    },
    place: {
        type: String, 
        required: true
    },
    num: {
        type: Number, 
        required: true
    }
})

Author = mongoose.model('Author', authorSchema) ; 
module.exports = Author ; 
