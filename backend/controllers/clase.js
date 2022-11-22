var Clase = require("../models/clase.model");
var Profile = require("../models/profile.model");
var User = require("../models/user.model");

var mongoose = require("mongoose");

var constants = require("../utils/constants");

var claseService = require("../services/clase.service");

exports.getClases = async function getClases(req, res) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  query = {};
  if (req.body.ids && req.body.ids.length > 0) {
    query["_id"] = { $in: req.body.ids };
  }

  if (req.body.rating_min) {
    query["rating"] = { $gte: req.body.rating_min };
  }

  if (req.body.materia) {
    query["materia.value"] = req.body.materia;
  }

  if (req.body.tipo_clase) {
    query["tipo_clase.value"] = req.body.tipo_clase;
  }

  if (req.body.frecuencia) {
    query["frecuencia.value"] = req.body.frecuencia;
  }

  if (req.body.nivel) {
    query["nivel.value"] = req.body.nivel;
  }

  if (req.body.state) {
    query["state"] = req.body.state
  } else {
    query["state"] = "publicada"
  }

  try {
    let clases = await claseService.getClases(query, {page: page, limit: limit, sort: { updatedAt: 'desc' }});
    return res.status(200).json({ status: "ok", data: clases });
  } catch (e) {
    return res.status(400).json({ status: "err", message: e.message });
  }
};

exports.getClasesByProfileId = async function getClasesByProfileId(req, res) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  req.body.user = req.user;

  try {
    let clases = await claseService.getClasesByProfileId(req.body, page, limit);
    return res.status(200).json({ status: "ok", data: clases });
  } catch (e) {
    return res.status(400).json({ status: "err", message: e.message });
  }
};

exports.addClase = async function addClase(req, res) {
  const body = req.body;
  body.user = req.user;

  try {
    let clase = await claseService.addClase(body);
    return res
      .status(200)
      .json({
        status: "ok",
        message: "Clase dada de alta exitosamente",
        data: clase,
      });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

exports.deleteClase = async function deleteClase(req, res) {
  const body = req.body;
  body.user = req.user;
  try {
    await claseService.deleteClase(body);
    return res
      .status(200)
      .json({ status: "ok", message: "Clase eliminada exitosamente" });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

exports.patchClase = async function patchClase(req, res) {
  try {
    req.body.user = req.user;
    let data = await claseService.patchClase(req.body);
    if (!data) return res.status(304).json({status:"ok", msg: "Not Modified"}) 
    return res.status(200).json({ status: "ok", data: data});
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

exports.addReview = async function addReview(req, res) {
  try {
    const body = req.body;
    body.user = req.user;
    let clase = await claseService.addReview(body);
    return res
      .status(200)
      .json({ status: "ok", msg: "Calificado con exito!", data: clase });
  } catch (e) {
    return res.status(e.statusCode).json({ status: e.name, msg: e.message });
  }
};

exports.contratar = async function contratar(req, res) {
  try {
    const body = req.body;
    body.user = req.user;
    let contratacion = await claseService.contratar(body);
    return res
      .status(200)
      .json({ status: "ok", msg: `Solicitud de contratacion enviada.\n El profesor tiene 48 horas para contactarse contigo.`, data: contratacion });
  } catch (e) {
    return res.status(e.statusCode).json({ status: e.name, msg: e.message });
  }
};

exports.patchContratacion = async function patchContratacion(req, res) {
  try {
    req.body.user = req.user;
    let data = await claseService.patchContratacion(req.body);
    if (!data) return res.status(304).json({status:"ok", msg: "Not Modified"}) 
    return res.status(200).json({ status: "ok", data: data});
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

exports.patchReview = async function patchReview(req, res) {
  try {
    req.body.user = req.user;
    let data = await claseService.patchReview(req.body);
    if (!data) return res.status(304).json({status:"ok", msg: "Not Modified"}) 
    return res.status(200).json({ status: "ok", data: data});
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};