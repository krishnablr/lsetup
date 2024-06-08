const { name } = require('ejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connect = mongoose.connect('mongodb://localhost:27017/lsetup');
const bcrypt = require('bcrypt');

connect.then(() => {
    console.log('connected to mongodb');
}).catch((err) => {
    console.log('error connecting to mongodb', err);
});

//create a schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});


userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//create a model
const collection = mongoose.model('collection', userSchema);


module.exports = collection;

