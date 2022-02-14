const express = require("express");
var cors = require("cors");

const colors = require("colors");
const dotenv = require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");
const authRoutes = require("./routes/authRoutes");

const path = require("path");

const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

connectDB();
const app = express();

// app.use(express.static(path.resolve(__dirname, "../frontend/build")));
// app.get("*", function (request, response) {
//     response.sendFile(
//         path.resolve(__dirname, "../frontend/build", "index.html")
//     );
// });

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/urls", urlRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server on port ${port}`));
