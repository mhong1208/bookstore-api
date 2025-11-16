const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/database");
// Danh sách route của các module
const userRoutes = require("./routes/user.route");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/product.route");
const orderRoutes = require("./routes/order.route");
const voucherRoutes = require("./routes/voucher.route");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Phục vụ các file tĩnh từ thư mục 'assets/images' qua đường dẫn '/images'
app.use("/images", express.static(path.join(__dirname, "../assets/images")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/vouchers", voucherRoutes)

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Connect DB
connectDB();

module.exports = app;
