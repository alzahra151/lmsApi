const { body } = require('express-validator')


const loginValidator = () => {
    return [
        body('mobile')
            .notEmpty().withMessage((value, { req }) => {
                return req.t('mobileRequiredMsg');
            })
            .isMobilePhone().withMessage((value, { req }) => {
                return req.t('mobileValidationMsg');
            }),
        body('password')
            .isLength({ min: 6 }).withMessage((value, { req }) => {
                return req.t('passwordValidationMsg');
            }),
    ]
}
const adduserValidator = () => {
    return [
        body('mobile')
            .notEmpty().withMessage((value, { req }) => {
                return req.t('mobileRequiredMsg');
            })
            .isMobilePhone().withMessage((value, { req }) => {
                return req.t('mobileValidationMsg');
            }),
        body('password')
            .isLength({ min: 6 }).withMessage((value, { req }) => {
                return req.t('passwordValidationMsg');
            }),
        body('first_name')
            .isAlpha()
            .isLength({ min: 3, max: 15 }).withMessage((value, { req }) => {
                return req.t('nameValidationMsg');
            }),
        body('last_name')
            .isAlpha()
            .isLength({ min: 3, max: 15 }).withMessage((value, { req }) => {
                return req.t('nameValidationMsg');
            }),
        body('last_name')
            .optional()
            .isEmail().withMessage((value, { req }) => {
                return req.t('emailValidMsg');
            }),
    ]

}

module.exports = { loginValidator, adduserValidator }