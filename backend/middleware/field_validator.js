const validationResult = require('express-validator').validationResult;

exports.validateField = async function validateField(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }
    next();
};