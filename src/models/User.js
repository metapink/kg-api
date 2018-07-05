const passport = require('passport')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// create schema
const UserSchema = new Schema({
    facebook: {
        id: String,
        token: String,
        name: String
    },
    name: String,
    img: String,
    profileImg: String,
    posts: [ObjectId],
    friends: [ObjectId]
})
User = mongoose.model('user', UserSchema)

passport.serializeUser((user, done) => {
    done(null, user.facebook.id)
})

passport.deserializeUser((id, done) => {
    User.findOne({'facebook.id': id})
    .then(existingUser => {
        done(null, existingUser)
    })
    .catch(err => {
        done(err)
    })
})

module.exports = User