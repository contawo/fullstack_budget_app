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
            created: true,
            user: newUser
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

// Get a single user
router.get("/:id", async (req, res) => {
    try {
        const user = await usersModel.findById(req.params.id);
        if (user === null) {
            return res.status(404).json({
                message: "Could not find user",
            })
        }
        res.status(200).json({
            message: "User found",
            data: user
        })
    } catch(err) {
        res.status(500).json({
            message: "Could not find user",
            errorType: "server",
            error: err
        })
    }
})

// Add income
router.post("/income/add", async (req, res) => {
    if (req.body.id === "" || req.body.id === null) {
        return res.status(404).json({
            error: "Authentication Error",
            message: "You are not an authenticated user, create an account"
        })
    }

    try {
        const options = {"$push": {"income": req.body.amount}}
        const updateUserIncome = await usersModel.findByIdAndUpdate(req.body.id, options)
        res.status(200).json({
            message: `Income added successfully: R${req.body.amount}`,
            income: updateUserIncome.income 
        })
    } catch(err) {
        res.status(404).json({
            message: "Could not add income",
            error: err
        })
    }
})

// Add expense
router.post("/expenses/add", async (req, res) => {
    if (req.body.id === "" || req.body.id === null) {
        return res.status(404).json({
            error: "Authentication Error",
            message: "You are not an authenticated user, create an account"
        })
    }
 
    try {
        const options = {"$push": {"expenses": {
            expenseType: req.body.expenseType,
            amount: req.body.amount
        }}}
        const updateUserExpense = await usersModel.findByIdAndUpdate(req.body.id, options)
        res.status(200).json({
            message: `expense added successfully: R${req.body.amount}`,
            expense: updateUserExpense.expenses
        })
    } catch(err) {
        res.status(404).json({
            message: "Could not add expense",
            error: err
        })
    }
})

// Update budget
router.post("/budget/update", async (req, res) => {
    if (req.body === {} || req.body === null) {
        res.status(404).json({
            error: "Authentication Error",
            message: "You are not an authenticated user, create an account"
        })
        return
    }

    try {
        const options = {"budgetAmount": req.body.amount}
        const updateUserBudget = await usersModel.findByIdAndUpdate(req.body.id, options)
        res.status(201).json({
            message: `Budget added successfully: R${req.body.amount}`,
            update: updateUserBudget
        })

    } catch(err) {
        res.status(404).json({
            message: "Failed to update budget",
            error: err
        })
    }
})

router.post("/messages/update", async (req, res) => {
    try {
        const options = {
            "advice": req.body.advice,
            "motivation": req.body.motivation
        }
        const updateMessage = await usersModel.findByIdAndUpdate(req.body.id, options)
        res.status(201).json({
            message: "Messages updated successfully",
            update: updateMessage
        })
    } catch(err) {
        res.status(404).json({
            message: "Could not updated the inputs"
        })
    }
})

module.exports = router;

