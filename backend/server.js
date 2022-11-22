require("dotenv/config.js");
var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var formData = require("express-form-data");

var profileRouter = require("./routes/profile.js");
var authRouter = require("./routes/auth.js");
var claseRouter = require("./routes/clase.js");

// Swagger needs
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./docs/swagger.json');
const basicAuth = require('express-basic-auth');


require("./config/database.js");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(formData.parse());

app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);
app.use("/api/clase", claseRouter);

/****************
 * SWAGGER
 ****************/
 var swaggerUiOptions = {
	explorer: false,
	operationsSorter: 'alpha',
}

// Swagger basic Auth 
app.use('/doc', basicAuth({
	users: {
		'admin': 'admin'
	},
	challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerUiOptions));


app.use(function (req, res, next) {
  res.status(404).json({ err: "Not found" });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message });
});

module.exports = app;
