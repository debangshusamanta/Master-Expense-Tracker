import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './Config/db.js'
import userRoute from './Routes/userRoute.js'
import expenseRoute from './Routes/expenseRoute.js'


await connectDB();


const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoute)
app.use('/api/expenses', expenseRoute)

app.get('/', (req, res)=>{
    res.send('Backend Is Running Perfectly !')
})

app.listen(PORT, ()=>{
    console.log(`Port is running on Port ${PORT}`)
})