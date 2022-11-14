var Clase = require("../models/clase.model");
var User = require("../models/user.model");
var Profile = require("../models/profile.model");
const BaseError = require("../utils/error/BaseError");
const NotFoundError = require("../utils/error/NotFoundError.js");
const HttpStatusCodes = require("../utils/HttpStatusCodes");

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

async function setRole(body) {
  try {
    let profile = await Profile.findOne({ _id: body.profile });
    profile.role = body.role;
    return await profile.save();
  } catch (e) {
    throw new BaseError(
      "err",
      HttpStatusCodes.INTERNAL_SERVER,
      true,
      e.message
    );
  }
}
exports.setRole = setRole;
