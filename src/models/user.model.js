const mongoose = require("mongoose");
const { EUser } = require("../enum/EUser");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: false },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    role: { type: String, enum: EUser, default: EUser.CUSTOMER },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    avatarUrl: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    bio: { type: String }, // Mô tả hoặc tiểu sử về người dùng
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
