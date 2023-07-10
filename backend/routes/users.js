const express = require("express");
const usersModel = require("../models/users");
const router = express.Router()

// Creating a user
router.post("/create", (req, res) => {
    const newUser = new usersModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const createUser = newUser.save();
        res.status(201).json({
            created: true
        })
    } catch(err) {
        res.status(400).json({
            created: false,
            error: err
        })
    }
})

// Loggin in a user
router.get('/login', async (req, res) => {
    try {
        const users = await usersModel.find();
        res.status(200).json({
            data: users
        })
    } catch(err) {
        res.status(500).json({
            loggin: false,
            error: err
        })
    }
})

module.exports = router;
