var Clase = require('../models/clase.model')
var Profile = require('../models/profile.model')
var User = require('../models/user.model')

var constants = require('../utils/constants')

var claseService = require('../services/clase.service');

exports.getClases = async function getClases(req, res) {

	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 10;

	try {
		let clases = await claseService.getClases({}, page, limit);
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
