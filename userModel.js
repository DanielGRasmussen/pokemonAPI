const MongoClient = require("mongodb");

const UserSchema = {
	google: {
		id: {
			type: String
		},
		name: {
			type: String
		},
		email: {
			type: String
		}
	}
};

function connectToDB() {
	return MongoClient.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
}

async function createUser(user) {
	const client = await connectToDB();
	const db = client.db(process.env.DB_NAME);
	const result = await db.collection("users").insertOne(user);
	client.close();
	return result;
}

async function findUserByGoogleId(googleId) {
	const client = await connectToDB();
	const db = client.db(process.env.DB_NAME);
	return await db.collection("users").findOne({ "google.id": googleId });
}

module.exports = {
	User: UserSchema,
	createUser,
	findUserByGoogleId
};
