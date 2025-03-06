import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import 'dotenv/config'
import userRouter from "./routes/UserRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

// api endpoints
app.use("/api/auth",userRouter)
app.use("/api/user",userRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API Working")
})


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})