const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Đảm bảo thư mục 'assets/images' tồn tại
const dir = './assets/images';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/images');
  },
  filename: (req, file, cb) => {
    // Tạo tên file duy nhất: fieldname-timestamp.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Lọc file, chỉ chấp nhận file ảnh
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file ảnh định dạng .jpeg, .jpg, .png'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, 
});

module.exports = upload;

