const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://Shkmr07:${process.env.MONGODB}@storage.lpeti.mongodb.net/Bewakoof`)
        console.log("✅ Connected to database.")
    }catch(err){
        console.error("❌ Error connecting to MongoDB.",err.message)
        process.exit(1)
    }
}

module.exports = connectDB