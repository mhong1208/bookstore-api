/**
 * @desc    Xử lý yêu cầu tải file lên
 * @route   POST /api/upload
 * @access  Private (Yêu cầu đăng nhập)
 */
const uploadFile = (req, res) => {
  // Middleware 'upload' đã xử lý việc lưu file.
  // Nếu không có file, nó sẽ không gọi đến controller này hoặc req.file sẽ là undefined.
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file nào được tải lên.' });
  }

  // Trả về đường dẫn công khai của file đã được tải lên.
  const fileUrl = `/images/${req.file.filename}`;

  res.status(201).json({
    message: 'Tải file lên thành công',
    url: fileUrl,
  });
};

module.exports = { uploadFile };