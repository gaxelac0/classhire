
var Clase = require("../models/clase.model");
var User = require("../models/user.model");
var Profile = require("../models/profile.model");
const BaseError = require("../utils/error/BaseError");
const NotFoundError = require("../utils/error/NotFoundError.js");
const HttpStatusCodes = require("../utils/HttpStatusCodes");
var constants = require('../utils/constants');
var jwt = require('jsonwebtoken')

// Saving the context of this module inside the _the variable
_this = this;
 
exports.signUp = async function (body) {

    let user = await User.findOne({ email: body.email });
    if (user) {
        throw new BaseError("err", HttpStatusCodes.BAD_REQUEST, true, 'Account already exists');
    }

 
    if (!process.env.SECRET) {
        throw new BaseError("err", HttpStatusCodes.INTERNAL_SERVER, true, 'no SECRET in .env file');
    }

    let newProfile;
    try {
        newProfile = await Profile.create(body);
    } catch (e) {
        throw new BaseError("err", HttpStatusCodes.INTERNAL_SERVER, true, e.message);
    }

    body.profile = newProfile._id
    try {
        user = await User.create(body);
    } catch(e) {
        await Profile.findByIdAndDelete(body.profile)
        throw new BaseError("err", HttpStatusCodes.INTERNAL_SERVER, true, e.message);
    }
   
    let token = await createJWT({ user, profile: newProfile });
    return token;
}




/* --== Helper Functions ==-- */

function createJWT(userDetails) {
    return jwt.sign(userDetails, process.env.SECRET, { expiresIn: '24h' })
}
exports.createJWT = createJWT;