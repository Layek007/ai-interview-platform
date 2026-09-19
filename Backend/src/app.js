const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})


app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: "https://ai-interview-platform-frontend-piyush.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.get("/api/test", (req, res) => {
    res.status(200).json({ status: "api works" })
})


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


console.log(
  "AUTH ROUTES:",
  authRouter.stack.map(route => route.route?.path)
)

module.exports = app

