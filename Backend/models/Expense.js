import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim:true
    },
    amount:{
        type: Number,
        required: true,

    },
    category:{
        type: String,
        default: 'other'
    },
    date:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Expense = mongoose.model('Expense', expenseSchema)

export default Expense;