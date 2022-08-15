import { Router } from 'express'
import * as authCtrl from '../controllers/auth.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import { check } from 'express-validator'
import { validateField } from '../middleware/field_validator.js'

const router = Router()

/*---------- Public Routes ----------*/
router.post(
    '/signup', 
    [
        check("email", "Un mail valido es obligatorio").isEmail(),
        check("password", "La contrasena es obligatoria").not().isEmpty(),
        validateField
    ],
    authCtrl.signup
)

router.post(
    '/login',
    [
        check("email", "Un mail valido es obligatorio").isEmail(),
        check("password", "La contrasena es obligatoria").not().isEmpty(),
        validateField
    ],
    authCtrl.login
)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/changePassword', checkAuth, authCtrl.changePassword)

export { router }
