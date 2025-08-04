import mongoose from 'mongoose'


const connectDB = async () => {
    try {
         await mongoose.connect(process.env.MONGODB_URI)
        console.log('Mongodb Connected.')

    } catch (error) {
        console.log(`Error occurred: ${error.message}`)
    }
}


export default connectDB;