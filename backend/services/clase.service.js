var Clase = require("../models/clase.model");
var User = require("../models/user.model");
var Profile = require("../models/profile.model");
const BaseError = require("../utils/error/BaseError");
const NotFoundError = require("../utils/error/NotFoundError.js");
const HttpStatusCodes = require("../utils/HttpStatusCodes");
var constants = require("../utils/constants");
var mongoose = require("mongoose");

// Saving the context of this module inside the _the variable
_this = this;

async function getClases(query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };
  // Try Catch the awaited promise to handle the error
  try {
    //console.log("Query", query);
    var Clases = await Clase.paginate(query, options);

    var clone = JSON.parse(JSON.stringify(Clases));

    for (let i = 0; i < clone.docs.length; i++) {
      let teacherProfileId = clone.docs[i].teacher_profile_id;

      let profile = await Profile.findOne({ _id: teacherProfileId });
      clone.docs[i]["teacher_name"] =
        profile.firstName + " " + profile.lastName;
      clone.docs[i]["teacher_photo"] = profile.photo;
    }

    return clone;
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
exports.getClases = getClases;

async function getClasesByProfileId(body, page, limit) {
  let profile_id = body.profile_id;

  try {
    let profile = await Profile.findOne({ _id: body.profile_id }).lean()
    .exec();

    // console.log(`getClasesByProfileId  - retrieving clases(${profile.clases.length}) for profileId ${profile_id}`)
    // console.log(profile.clases);

    var result = profile.clases;
    if (profile.clases.length > 0) {
      query = {};
      query["_id"] = { $in: profile.clases};
      var result = await getClases(query, page, limit);
      return { docs: result.docs, page: result.page, totalPages: result.pages };
    }

    return { page: 0, totalPages: 0 };
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
exports.getClasesByProfileId = getClasesByProfileId;

exports.addReview = async function (body) {
  try {
    var clase = await Clase.findOne({ _id: body.clase_id });
    if (!clase) {
      throw new NotFoundError(
        "err",
        HttpStatusCodes.NOT_FOUND,
        true,
        "La clase no existe"
      );
    }
    // TODO: validar que el usuario haciendo la review tenga contratada la clase
    // TODO: validar que no sea el autor el que la postea

    clase.comments.push({
      type: body.type,
      comment: body.comment,
      profile_author_id: body.user.profile,
    });
    clase.reviewCount = clase.reviewCount + 1;

    let cantNeg = clase.reviewNegative;
    let cantPos = clase.reviewPositive;
    if (body.type === "positive") {
      cantPos = cantPos + 1;
    } else {
      cantNeg = cantNeg + 1;
    }
    clase.reviewPositive = cantPos;
    clase.reviewNegative = cantNeg;

    let percentage = (100 * cantPos) / clase.reviewCount;

    clase.rating = percentage / 20;

    await clase.save();
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
};

exports.addClase = async function (body) {
  try {
    let user = await User.findOne(body.user);
    let profile = await Profile.findOne({_id: user.profile._id});

    if (profile.role !== constants.RoleEnum[2]) {
      throw new BaseError(
        "err",
        HttpStatusCodes.UNAUTHORIZED,
        true,
        "Unauthorized: solo el rol teacher puede crear clases."
      );
    }

    body.teacher_profile_id = profile._id;

    const newClaseSchema = getNewClaseSchema(body);

    let newClase = await Clase.create(newClaseSchema);
    profile.clases.push(newClase._id);
    await profile.save();
    return newClase;
  } catch (e) {
    throw new BaseError(
      "err",
      HttpStatusCodes.INTERNAL_SERVER,
      true,
      e.message
    );
  }
};

exports.deleteClase = async function (body) {
  let clase = await Clase.findOne({ _id: body.clase_id });
  //let profile = await Profile.findOne({_id: body.user.profile});

  if (!clase) {
    throw new NotFoundError(
      "err",
      HttpStatusCodes.NOT_FOUND,
      true,
      "La clase no existe"
    );
  }

  try {
    await Profile.findOne(
      { _id: body.user.profile },
      async function (err, profile) {
        if (err) {
          console.log(err);
        } else {
          await profile.clases.pull(body.clase_id);
          await clase.delete();
          await profile.save();
        }
      }
    );

    //profile.clases.pull(clase);

    //profile.clases.pop(clase);
    //await profile.save();
  } catch (e) {
    throw new BaseError(
      "err",
      HttpStatusCodes.INTERNAL_SERVER,
      true,
      e.message
    );
  }
};

const getNewClaseSchema = (body) => {
  let newClassObject = {};

  for (var key in body) {
    if (["materia", "tipo_clase", "frecuencia", "nivel"].includes(key)) {
      newClassObject[key + ".value"] = body[key];
    } else {
      newClassObject[key] = body[key];
    }

    // console.log(key +  ' ;;;;;;;;;;;;;;;;;; ' + body[key])
  }
  return newClassObject;
};
