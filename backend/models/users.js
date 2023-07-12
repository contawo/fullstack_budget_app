const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema({
    expenseType: {
        type: String
    },
    amount: {
        type: Number,
        default: 0
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "User"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    budgetAmount: {
        type: Number,
        default: 0
    },
    expenses: {
        type: [expensesSchema],
    },
    income: {
        type: [Number]
    },
    motivation: {
        type: String,
        required: true,
        default: "Get started with setting your budget"
    },
    advice: {
        type: String,
        required: true,
        default: "The time to start saving and analysing how you spend your money is now. Nobody is going to do it for you."
    }
})

const usersModel = mongoose.model("users", userSchema)

module.exports = usersModel;