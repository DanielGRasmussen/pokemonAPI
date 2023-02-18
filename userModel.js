const MongoClient = require("mongodb").MongoClient;
const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

async function connect(collectionName) {
	const client = await MongoClient.connect(uri);
	const db = client.db(dbName);
	return db.collection(collectionName);
}

async function createUser(user) {
	const collection = await connect("users");
	return collection.insertOne(user);
}

async function findUserByGoogleId(googleId) {
	const collection = await connect("users");
	return collection.findOne({ "google.id": googleId });
}

module.exports = {
	createUser,
	findUserByGoogleId
};
