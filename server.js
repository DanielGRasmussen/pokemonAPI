const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const app = express();
require("dotenv").config();
const passport = require("passport");
require("./passportConfig")(passport);
const jwt = require("jsonwebtoken");
const { createUser, findUserByGoogleId } = require("./userModel");

// Redirect the user to the Google signin page
app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));
// Retrieve user data using the access token received
app.get(
	"/auth/google/callback",
	passport.authenticate("google", { session: false }),
	async (req, res) => {
		try {
			const user = await findUserByGoogleId(req.user.google.id);
			if (!user) {
				// User doesn't exist in database, add them
				const newUser = {
					google: {
						id: req.user.google.id,
						name: req.user.google.name,
						email: req.user.google.email
					}
				};
				await createUser(newUser);
			}
			// Generate JWT token for the user
			jwt.sign({ user: req.user }, "secretKey", { expiresIn: "1h" }, (err, token) => {
				if (err) {
					return res.json({
						token: null
					});
				}
				res.json({
					token
				});
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
);

app.use(express.json())
	.use(cors())
	.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		next();
	})
	.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	.use("/", require("./routes/pokemon"))
	.use("/moves", require("./routes/moves"))
	.listen(8080, function () {
		console.log("Listening on port 8080");
	});
