import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'src/uploads',
  filename(req, file, cb) {
    console.log('req :>> ', req);
    cb(null, `${file.fieldname}-${Date.now()
    }-${file.originalname}`);
  },
});
const upload = multer({
  storage,
});

export default upload;
