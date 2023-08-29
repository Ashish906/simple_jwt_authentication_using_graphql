import mongoose from 'mongoose'

export default (mongoUrl) => {
    mongoose.connect(mongoUrl).then(()=> console.log('Database connected')).catch(err => console.log('Database connection error', err))
}