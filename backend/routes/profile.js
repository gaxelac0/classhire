const express = require('express');
const profileCtrl = require('../controllers/profile.js');
const decodeUserFromToken = require('../middleware/auth.js').decodeUserFromToken;
const checkAuth = require('../middleware/auth.js').checkAuth;

var router = express.Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profileCtrl.getProfiles)
router.put('/role', checkAuth, profileCtrl.setRole)
router.put('/:id/add-photo', checkAuth, profileCtrl.addPhoto)

module.exports = router;
