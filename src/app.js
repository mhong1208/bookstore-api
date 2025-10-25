const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
// Danh sách route của các module
const userRoutes = require("./routes/user.route");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/product.route");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Connect DB
connectDB();

module.exports = app;
