var Clase = require("../models/clase.model");
var User = require("../models/user.model");
var Profile = require("../models/profile.model");
const BaseError = require("../utils/error/BaseError");
const NotFoundError = require("../utils/error/NotFoundError.js");
const HttpStatusCodes = require("../utils/HttpStatusCodes");

const moment = require("moment");

const authService = require("./auth.service")

// Saving the context of this module inside the _the variable
_this = this;

async function getProfiles(query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };
  // Try Catch the awaited promise to handle the error
  try {
    //console.log("Query", query)
    var Profiles = await Profile.paginate(query, options);
    // Return the Clase list that was retured by the mongoose promise
    return Profiles;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw new BaseError(
      "err",
      HttpStatusCodes.INTERNAL_SERVER,
      true,
      e.message
    );
  }
}
exports.getProfiles = getProfiles;

async function patchProfile(body) {
  try {
    let profile = await Profile.findOne({ _id: body.user.profile });

    if (!profile) {
      throw new BaseError(
        "err",
        HttpStatusCodes.NOT_FOUND,
        true,
        "Profile not found"
      );
    }

    let objCount = 0;

    if (body.role && body.role != "") {
      objCount = objCount+1;
      profile.role = body.role;
    }

    if (body.experiencias && body.experiencias.length > 0) {
      objCount = objCount+1;
      profile.experiencias = body.experiencias;
    }

    if (body.fecha_nacimiento && body.fecha_nacimiento != "") {
      objCount = objCount+1;
      profile.fecha_nacimiento = moment(body.fecha_nacimiento).format("DD/MM/YYYY") ;
    }

    if (objCount === 0) {
      return null
    }

    let patchedProfile = await profile.save();
    const token = authService.createJWT({ user: body.user, role: patchedProfile.role });
    return {patchedProfile, token};

  } catch (e) {
    throw new BaseError(
      "err",
      HttpStatusCodes.INTERNAL_SERVER,
      true,
      e.message
    );
  }
}
exports.patchProfile = patchProfile;
