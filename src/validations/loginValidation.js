const { body } = require('express-validator')

function loginValidator() {
    const loginValidate = [
        body('mobile')
            .notEmpty().withMessage("Mobile is required")
            .isMobilePhone().withMessage("Mobile is not valid"),
        body('password')
            .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    ]
    return loginValidate
}
function adduserValidator() {
    const userValidate = [
        body('mobile')
            .notEmpty().withMessage("Mobile is required")
            .isMobilePhone().withMessage("Mobile is not valid"),
        body('password')
            .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        body('first_name',).withMessage("first name must be between 3 and 20")
            .isLength({ min: 3, max: 15 }),
        body('last_name',).withMessage("first name must be between 3 and 20")
            .isLength({ min: 3, max: 15 }),
        body('email')
            .optional()
            .isEmail().withMessage('Email not valid')
            .normalizeEmail(),
        body('photo')
            .optional().custom((value, { req }) => {
                if (req.file) {
                    const allowedFileTypes = ['image/jpeg', 'image/png']; // Specify allowed file types
                    if (!allowedFileTypes.includes(req.file.mimetype)) {
                        throw new Error('Invalid file type. Allowed types: JPEG, PNG, PDF');
                    }
                }
                return true;
            })

    ]
    return userValidate
}

module.exports = {
    loginValidator,

}