import mongoose from 'mongoose'

let isConnected = false
export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('MongoDB is already connected.')
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = db.connections[0].readyState
        console.log('MongoDB is connected.')
    }

    catch (error) {
        console.log('MongoDB connection error:', error)
    }
}

