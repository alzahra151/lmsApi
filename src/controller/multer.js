const multer = require('multer')
const ApiError = require('../helpers/apiError')
const allowed_img_types = ['image/jpeg', 'image/png', 'image/jpg'];
const imgFilter = (req, file, cb) => {
    if (allowed_img_types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ApiError(req.t("invalidType"), 400));
    }
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const multerForImgs = multer({ storage, fileFilter: imgFilter })
module.exports = multerForImgs