const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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
  if (!user) return {
    message: "Không tìm thấy người dùng với email này"
  };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return {
    message: "Mật khẩu không chính xác"
  };

  const { password: _, ...userData } = user.toObject();
  return userData;
};

module.exports = {
  getAll,
  register,
  login,
};