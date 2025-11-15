const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = async (pageIndex = 1, pageSize = 10) => {
  const skip = (pageIndex - 1) * pageSize;
  const users = await User.find()
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments();

  return {
    data: users,
    pageIndex,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total,
  };
};

const register = async (data) => {
  // Kiểm tra xem email đã tồn tại chưa
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("Email đã được sử dụng. Vui lòng chọn một email khác.");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  const newUser = await User.create({
    ...data,
    password: hashedPassword,
  });

  return newUser;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { error: true, message: "Email hoặc mật khẩu không chính xác" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { error: true, message: "Email hoặc mật khẩu không chính xác" };
  }

  const payload = {
    id: user._id, 
    role: user.role,
    email: user.email
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1d' } 
  );

  const { password: _, ...userData } = user.toObject();

  return {
    error: false,
    user: userData,
    token: token
  };
};

module.exports = {
  getAll,
  register,
  login,
};