'use strict'

const mongoose = require('mongose')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	displayName: String,
	password: { type: String, select: false },
	avatar: String,
	singupDate: { type: Date, default: Date.now() },
	lastLogin: Date
})

UserSchema.pre('save', (next) => {
	let user = this
	if(!user.isModified('password')) return next()

	bycrypt.genSalt(10, (err, salt) => {
		if(err) return next(err)

		bycrypt.hash(user.password, salt, (err, hash) => {
			if(err) return next(err)

			user.password = hash
			next()
		})
	})
})

UserSchema.methods.gravatar = function(){
	if(!user.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

	const md5 = crypto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}/?s=200&d=retro`
}

const User = mongoose.model('User', UserSchema)
module.exports = User