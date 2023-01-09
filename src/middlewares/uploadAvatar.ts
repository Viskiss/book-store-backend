import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'src/static/avatars',
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()
    }-${file.originalname}`);
  },
});
const upload = multer({
  storage,
});

export default upload;
