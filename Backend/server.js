const express = require("express");
const connectDB = require("./config");
const cookieParser = require("cookie-parser");
const routes = require("./src/routes/combine.route");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(cookieParser());

const cookieParserSecret = process.env.SECRET_KEY;
app.use(cookieParser(cookieParserSecret));
// cookieParser("masaiOne")

// const whitelist = [process.env.FE_URL, process.env.DEPLOY_FE_URL];


// const corsOptionsDelegate = (req, callback) => {
//   if (whitelist.indexOf(req.header("Origin")) !== -1) {
//     callback(null, {
//       origin: req.header("Origin"), //// Automatically reflects the request's origin if in the whitelist
//       credentials: true,
//       methods: "GET,HEAD,PATCH,POST,PUT,DELETE",
//       allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//     }); // reflect (enable) the requested origin in the CORS response
//   } else {
//     callback(null, {origin: false}); // Deny CORS if not in whitelist
//   }
// };
// app.use(cors(corsOptionsDelegate));


// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://bewakoof-07.netlify.app",
];

// CORS setup with methods & headers
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);





app.use("/api", routes);

app.get("/", (req, res) => {
  res.status(200).send("🎯 Welcome to my backend RESTful API");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to server.", err.message);
    process.exit(1);
  });
