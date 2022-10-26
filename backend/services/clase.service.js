var Clase = require("../models/clase.model");
var User = require("../models/user.model");
var Profile = require("../models/profile.model");
const BaseError = require("../utils/error/BaseError");
const NotFoundError = require("../utils/error/NotFoundError.js");
const HttpStatusCodes = require("../utils/HttpStatusCodes");
var constants = require('../utils/constants');

// Saving the context of this module inside the _the variable
_this = this;

async function getClases(query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query);
        var Clases = await Clase.paginate(query, options);
        // Return the Clase list that was retured by the mongoose promise
        return Clases;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e);
        throw Error('Error while Paginating Clases');
    }
}
exports.getClases = getClases;

exports.addReview = async function (body) {

    var result = await getClases({ _id: body.clase_id }, 1, 1);

    if (result.total == 0) {
        throw new NotFoundError("err", HttpStatusCodes.NOT_FOUND, `Clase id(${body.clase_id}) no encontrada.`); 
    }

    // TODO: validar que el usuario haciendo la review tenga contratada la clase

    let clase = result.docs[0];
    clase.comments.push({ type: body.type, comment: body.comment, profile_author_id: body.user.profile });
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
}

exports.addClase = async function (body) {
    let newClase = await Clase.create(body);
    let user = await User.findOne(body.user);
    let profile = await Profile.findOne(user.profile)

    if (profile.role !== constants.RoleEnum[2]) {
        throw new BaseError("err", HttpStatusCodes.UNAUTHORIZED, true, 'Unauthorized: solo el rol teacher puede crear clases.');
	}

    try {
        profile.clases.push(newClase);
        await profile.save();
        return newClase;
    } catch (e) {
        Clase.findByIdAndDelete(newClase._id)
        throw new BaseError("err", HttpStatusCodes.INTERNAL_SERVER, true, err.message);
    }
}

exports.deleteClase = async function (body) {
    let clase = await Clase.findOne({_id: body.clase_id});
    //let profile = await Profile.findOne({_id: body.user.profile});

    if (!clase) {
        throw new NotFoundError("err", HttpStatusCodes.NOT_FOUND, true, 'La clase no existe');
	}

    

    try {

        await Profile.findOne({'_id': body.user.profile}, async function(err, profile){
            if (err) {
                console.log(err);            
            }else{
                await profile.clases.pull(body.clase_id);
                await clase.delete();
                await profile.save();
            }
        });

       //profile.clases.pull(clase);

        
        //profile.clases.pop(clase);
        //await profile.save();
    } catch (e) {
        throw new BaseError("err", HttpStatusCodes.INTERNAL_SERVER, true, err.message);
    }
}