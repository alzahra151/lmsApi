
const db = require("../models")
const { genSaltSync, hashSync } = require("bcrypt");

async function addUser(userData) {
    const user = await db.User.create(userData)
    return user
}

module.exports = {
    addUser
}