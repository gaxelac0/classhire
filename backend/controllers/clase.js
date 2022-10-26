var Clase = require('../models/clase.model');
var Profile = require('../models/profile.model');
var User = require('../models/user.model');

var mongoose = require('mongoose');

var constants = require('../utils/constants');

var claseService = require('../services/clase.service');

exports.getClases = async function getClases(req, res) {

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 10;

	query = {};
	if (req.body.ids && req.body.ids.length > 0) {
		query["_id"] = {"$in": req.body.ids};
	}

	if (req.body.ratingMin) {
		query["rating"] = {"$gte": req.body.ratingMin};
	}
	
	try {
		let clases = await claseService.getClases(query, page, limit);
		return res.status(200).json({ status: "ok", data: clases });
	} catch (e) {
		return res.status(400).json({ status: "err", message: e.message });
	}
}

exports.getClasesByProfileId = async function getClasesByProfileId(req, res) {

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 10;

	try {
		let clases = await claseService.getClasesByProfileId(req.body, page, limit);
		return res.status(200).json({ status: "ok", data: clases });
	} catch (e) {
		return res.status(400).json({ status: "err", message: e.message });
	}
}

exports.addClase = async function addClase(req, res) {
	const body = req.body;
	body.user = req.user;
	try {
		let clase = await claseService.addClase(body);
		return res.status(200).json({ status: "ok", message: "Clase dada de alta exitosamente", data: clase });
	} catch (e) {
		return res.status(e.statusCode).json({ status: e.name, message: e.message });
	}
}


exports.deleteClase = async function deleteClase(req, res) {
	const body = req.body;
	body.user = req.user;
	try {
		await claseService.deleteClase(body);
		return res.status(200).json({ status: "ok", message: "Clase eliminada exitosamente" });
	} catch (e) {
		return res.status(e.statusCode).json({ status: e.name, message: e.message });
	}
} 

exports.addReview = async function addReview(req, res) { 
	try {
		const body = req.body;
		body.user = req.user;
		let clase = await claseService.addReview(body)
		return res.status(200).json({ status: "ok", msg: "Review posteada", data: clase });
	} catch (e) {
		return res.status(e.statusCode).json({ status: e.name, msg: e.message }) 
	}
}
