const MongoClient = require("mongodb").MongoClient;
const { ObjectID } = require("mongodb");
require("dotenv").config();
const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

async function connect(collectionName) {
	const client = await MongoClient.connect(uri, { useNewUrlParser: true });
	const db = client.db(dbName);
	return db.collection(collectionName);
}

exports.getByName = async function (collectionName, name) {
	const collection = await connect(collectionName);
	return await collection.findOne({ name: name });
};

exports.post = async function (collectionName, doc) {
	const collection = await connect(collectionName);
	return await collection.insertOne(doc);
};

exports.put = async function (collectionName, id, updatedDoc) {
	const collection = await connect(collectionName);
	return await collection.updateOne({ _id: ObjectID(id) }, { $set: updatedDoc });
};

exports.delete = async function (collectionName, id) {
	const collection = await connect(collectionName);
	return await collection.deleteOne({ _id: ObjectID(id) });
};
