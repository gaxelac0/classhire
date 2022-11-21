var Clase = require("../models/clase.model");
var User = require("../models/user.model");
var Profile = require("../models/profile.model");
const BaseError = require("../utils/error/BaseError");
const NotFoundError = require("../utils/error/NotFoundError.js");
const HttpStatusCodes = require("../utils/HttpStatusCodes");
var constants = require("../utils/constants");
var mongoose = require("mongoose");
const Contratacion = require("../models/contratacion.model");

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

async function getContrataciones(query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };

  try {
    var contrataciones = await Contratacion.paginate(query, options);

    return contrataciones;
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
exports.getContrataciones = getContrataciones;

async function getClasesByProfileId(body, page, limit) {
  try {
    let profile = await Profile.findOne({ _id: body.profile_id }).lean().exec();

    // console.log(`getClasesByProfileId  - retrieving clases(${profile.clases.length}) for profileId ${profile_id}`)
    // console.log(profile.clases);

    var result = profile.clases;
    if (profile.clases.length > 0) {
      query = {};
      query["_id"] = { $in: profile.clases };
      var result = await getClases(query, page, limit);

      var cloneResult = { ...result };
      await Promise.all(
        cloneResult.docs.map(async (clase, idx) => {
          query = { clase_id: clase._id };
          if (profile.role === "student") {
            // El estudiante solo puede tener una contratacion por clase
            page = 1;
            limit = 1;
            query["profile_id"] = profile._id;
          }
  
          // obtener contrataciones de la clase
          let contrataciones = await getContrataciones(query, page, limit);
  
          result.docs[idx]["contrataciones"] = contrataciones;
        })
      )
      

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
  let user;
  let profile;
  try {
    user = await User.findOne(body.user);
    profile = await Profile.findOne({ _id: user.profile._id });
  } catch (e) {
    throw new BaseError(
      "err",
      HttpStatusCodes.INTERNAL_SERVER,
      true,
      e.message
    );
  }

  if (profile.role !== constants.RoleEnum[2]) {
    throw new BaseError(
      "err",
      HttpStatusCodes.UNAUTHORIZED,
      true,
      "Unauthorized: solo el rol teacher puede crear clases."
    );
  }

  try {
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

async function patchClase(body) {
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

    let clase = await Clase.findOne({ _id: body.clase_id });
    if (!clase) {
      throw new NotFoundError(
        "err",
        HttpStatusCodes.NOT_FOUND,
        true,
        "La clase no existe"
      );
    }

    if (!clase.teacher_profile_id == profile._id) {
      throw new BaseError(
        "err",
        HttpStatusCodes.UNAUTHORIZED,
        true,
        "Solo el profesor de la clase puede modificar la misma"
      );
    }

    let objCount = 0;

    if (body.state && body.state != "") {
      objCount = objCount+1;
      clase.state = body.state;
    }

    if (objCount === 0) {
      return null
    }

    let patchedClase = await clase.save();
    return {patchedClase};

  } catch (e) {
    throw new BaseError(
      "err",
      HttpStatusCodes.INTERNAL_SERVER,
      true,
      e.message
    );
  }
}
exports.patchClase = patchClase;


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

exports.contratar = async function (body) {
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

    let user = await User.findOne(body.user);
    let profile = await Profile.findOne({ _id: user.profile._id });

    if (profile.role !== constants.RoleEnum[1]) {
      throw new BaseError(
        "err",
        HttpStatusCodes.UNAUTHORIZED,
        true,
        "Unauthorized: solo el rol student puede contratar una clase."
      );
    }

    if (clase.teacher_profile_id.equals(profile._id)) {
      throw new BaseError(
        "err",
        HttpStatusCodes.UNAUTHORIZED,
        true,
        "Unauthorized: el profesor de la materia no puede contratarla."
      );
    }

    if (profile.clases.includes(clase._id)) {
      throw new BaseError(
        "err",
        HttpStatusCodes.UNAUTHORIZED,
        true,
        "Solo se puede contratar la clase una vez."
      );
    }

    profile.clases.push(clase._id);

    await profile.save();
    return Contratacion.create({
      clase_id: clase._id,
      profile_id: profile._id,
      horario: body.horario,
      telefono: body.telefono,
      state_in_order: ["solicitada"],
      reasons_in_order: [body.descr_contratacion],
      name: profile.firstName + " " + profile.lastName
    });
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw new BaseError(
      "err",
      e.statusCode ? e.statusCode : HttpStatusCodes.INTERNAL_SERVER,
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

async function patchContratacion(body) {
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

    let contratacion = await Contratacion.findOne({ clase_id: body.clase_id, profile_id: body.profile_id });

    let objCount = 0;

    if (body.new_state && body.new_state != "") {
      objCount = objCount+1;
      contratacion.state_in_order.push(body.new_state)
    }

    if (body.new_reason && body.new_reason != "") {
      objCount = objCount+1;
      contratacion.reasons_in_order.push(body.new_reason)
    }

    if (profile.role == "student") { 
      //profile.photo = constants.defaultProfileStudentImage;
    } else {
      // profile.photo = constants.defaultProfileTeacherImage;
    }     
    
    if (objCount === 0) {
      return null
    }

    let patchedContratacion = await contratacion.save();
    return {patchedContratacion};

  } catch (e) {
    throw new BaseError(
      "err",
      HttpStatusCodes.INTERNAL_SERVER,
      true,
      e.message
    );
  }
}
exports.patchContratacion = patchContratacion;
