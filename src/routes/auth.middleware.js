const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * Middleware để bảo vệ các route yêu cầu xác thực.
 * Nó kiểm tra JWT trong header 'Authorization'.
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Tách token từ header (Bearer <token>)
      token = req.headers.authorization.split(' ')[1];

      // Xác thực token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Lấy thông tin người dùng từ ID trong token và gắn vào request
      // loại bỏ trường password
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Chuyển sang middleware/controller tiếp theo
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Không được phép, token không hợp lệ' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Không được phép, không tìm thấy token' });
  }
};

/**
 * Middleware để kiểm tra vai trò Admin.
 * Phải được sử dụng sau middleware `protect`.
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Không có quyền truy cập, yêu cầu vai trò Admin' });
  }
};


module.exports = { protect, admin };