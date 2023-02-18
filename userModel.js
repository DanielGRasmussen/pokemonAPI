const MongoClient = require("mongodb").MongoClient;
const uri = process.env.DB_URI;
const dbName = "users";

async function connect(collectionName) {
	const client = await MongoClient.connect(uri, { useNewUrlParser: true });
	const db = client.db(dbName);
	return db.collection(collectionName);
}

async function createUser(user) {
	return await connect("users").insertOne(user);
}

async function findUserByGoogleId(googleId) {
	return await connect("users").findOne({ "google.id": googleId });
}

module.exports = {
	createUser,
	findUserByGoogleId
};
