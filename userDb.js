const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const uri = process.env.DB_URL;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB database
client.connect((err) => {
	if (err) {
		console.error("Failed to connect to MongoDB database:", err);
	} else {
		console.log("Connected to MongoDB database");
	}
});
