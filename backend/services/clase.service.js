var Clase = require("../models/clase.model")

// Saving the context of this module inside the _the variable
_this = this

exports.getClase  = async function (filtro) {
    try {
        var clases = await Clase.find(filtro);
    } catch (e) {
        throw Error("No se pudo encontrar la clase")
    }

    if (!clases) {
        return false;
    }
    return clases;
}

exports.getClaseById = async function (id) {
    try {
        var clases = await Clase.findById(id);
    } catch (e) {
        throw Error("No se pudo encontrar la clase")
    }

    if (!clases) {
        return false;
    }
    return clases;
}