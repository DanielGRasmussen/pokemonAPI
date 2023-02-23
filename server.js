const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const passport = require("./passportConfig");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json())
	.use(cors())
	.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		next();
	})
	.use(passport.initialize())
	.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	.use("/pokemon", require("./routes/pokemon"))
	.use("/moves", require("./routes/moves"))
	.use("/auth", require("./routes/auth"))
	.listen(PORT, function () {
		console.log(`Listening on port ${PORT}`);
	});
