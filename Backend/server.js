const express = require("express")
const connectDB = require("./config")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req,res) => {
    res.status(200).send("🎯 Welcome to my backend RESTful API")
})


connectDB()
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`🚀 Server is running at http://localhost:${PORT}`)
        })
    })
    .catch((err)=>{
        console.error("❌ Error connecting to server.",err.message)
        process.exit(1)
    })

