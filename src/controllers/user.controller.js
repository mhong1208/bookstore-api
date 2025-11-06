const userService = require("../services/user.service");

const getUsers = async (req, res) => {
  try {
    const pageIndex = parseInt(req.query.pageIndex) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const result = await userService.getAll(pageIndex, pageSize);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({
      data: user,
      message: "Đăng ký tài khoản thành công"
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);

    if (user) {
      res.json({
        data: user,
        message: "Đăng nhập thành công",
        token: user.token
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser
};