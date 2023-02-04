const MongoClient = require("mongodb").MongoClient;
const { ObjectID } = require("mongodb");
require("dotenv").config();
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

async function connect(collectionName) {
	const client = await MongoClient.connect(url, { useNewUrlParser: true });
	const db = client.db(dbName);
	const collection = db.collection(collectionName);
	return collection;
}

exports.getByName = async function (collectionName, name) {
	const collection = await connect(collectionName);
	const doc = await collection.findOne({ name: name });
	return doc;
};

exports.post = async function (collectionName, doc) {
	const collection = await connect(collectionName);
	const result = await collection.insertOne(doc);
	return result.insertedId.toString();
};

exports.put = async function (collectionName, id, updatedDoc) {
	const collection = await connect(collectionName);
	const result = await collection.updateOne({ _id: ObjectID(id) }, { $set: updatedDoc });
	if (result.matchedCount > 0) {
		return 204;
	} else {
		return 404;
	}
};

exports.delete = async function (collectionName, id) {
	const collection = await connect(collectionName);
	const result = await collection.deleteOne({ _id: ObjectID(id) });
	if (result.deletedCount > 0) {
		return 200;
	} else {
		return 404;
	}
};
