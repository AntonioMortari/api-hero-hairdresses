import multer from 'multer';
import path from 'path';

const destination = path.resolve(__dirname, '..', '..', '..', 'public', 'uploads');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null,destination);
    },
    filename(req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024}
});

export {upload};