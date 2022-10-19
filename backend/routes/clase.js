import { Router } from 'express'
import * as claseCtrl from '../controllers/clase.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import { body } from 'express-validator'

import { FrecuenciaEnum } from '../models/clase.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, claseCtrl.index)
router.post('/add',
    body('frecuencia')
        .exists()
        .notEmpty()
        .isIn(FrecuenciaEnum),
    checkAuth,
    claseCtrl.addClase)


export { router }
