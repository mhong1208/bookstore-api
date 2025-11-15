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

/**
 * @desc    Cập nhật trạng thái người dùng (Admin)
 * @route   PUT /api/users/:id/status
 * @access  Private/Admin
 */
const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'Trường isActive là bắt buộc và phải là true hoặc false.' });
    }

    const user = await userService.updateStatus(req.params.id, isActive);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    res.json({ message: `Trạng thái người dùng đã được cập nhật thành công.`, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUserStatus,
};