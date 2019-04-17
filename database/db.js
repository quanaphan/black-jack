var connectToDatabase = function(){
	const MongoClient = require('mongodb').MongoClient;
	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
   
			console.log('Connected...');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			collection.findOne({username: "test2"}, (function(err, result){
				if(err){
					console.log("error in find");
				}else if(result != null){
					console.log("success find function");
					console.log("username already exists");
				}else{
					collection.insertOne({username: "newUser"}, function(err, result){
						if(err){
							console.log("error adding user");
						}else{
							console.log("success");
						}
					});
				}
			}));
		}
	});
	};

	
var validateUser = function(userName, password, cb){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
			console.log('Connected...');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			collection.findOne({username: userName}, (function(err, result){
				if(err){
					console.log("error in find");
				}else if(result != null){
					console.log("success find function");
					if(result.username === userName && result.password === password){
						cb(true);
					}else{
						cb(false);
					}
				}else{
					console.log("user does not exists");
					cb(false);
				}
			}));
			client.close();
		}
	});
}

var addUser = function(userName, psword, nickName, success, fail){
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
   
			console.log('Connected...Adding user');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			collection.findOne({username: userName}, (function(err, result){
				if(err){
					console.log("error in find");
					fail();
				}else if(result != null){
					console.log("username already exists");
					fail();
				}else{
					collection.insertOne({username: userName, password: psword, nickname: nickName, balance: 150, wins: 0, loses: 0, rank: 0}, function(err, result){
						if(err){
							console.log("error adding user");
							fail();
						}else{
							console.log("success");
							success();
						}
					});
				}
			}));
		}
	});
	
}

var getUserNickname = function(userName, cb){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
			console.log('Connected...Getting nickname');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			collection.findOne({username: userName}, (function(err, result){
				if(err){
					console.log("error in find");
				}else if(result != null){
					console.log("success find function");
					cb(result.nickname);
				}else{
					console.log("user does not exists");
				}
			}));
			client.close();
		}
	});
}

var getUserBalance = function(userName, cb){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
			console.log('Connected... Getting balance');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			collection.findOne({username: userName}, (function(err, result){
				if(err){
					console.log("error in find");
				}else if(result != null){
					console.log("success find function");
					cb(result.balance);
				}else{
					console.log("user does not exists");
				}
			}));
			client.close();
		}
	});
}

var setUserNickname = function(userName, nickName){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
			console.log('Connected...Setting nickname');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			var query = { username: userName };
			var newval = { $set: {nickname: nickName }};
			collection.updateOne(query, newval, (function(err, result){
				if(err){
					console.log("error in setNickname");
				}else{
					console.log("successful change");
				}
			}));
			client.close();
		}
	});
}

var setUserBalance = function(userName, newBalance){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
			console.log('Connected...Setting balance');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			var query = { username: userName };
			var newval = { $set: {balance: newBalance }};
			collection.updateOne(query, newval, (function(err, result){
				if(err){
					console.log("error in setBalance");
				}else{
					console.log("successful change");
				}
			}));
			client.close();
		}
	});
}

var getTopUsers = function(cb){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
			console.log('Connected...');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			var sort = { balance: -1 };
			collection.find().project({_id: 0, nickname: 1, balance: 1}).sort(sort).toArray((function(err, result){
				if(err){
					console.log("error in find");
				}else if(result != null){
					console.log("success find function");
					console.log(result);
					cb(result);
				}else{
					console.log("no users found");
				}
			}));
			client.close();
		}
	});
}

var getUserInfo = function(userName, cb){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
			console.log('Connected...Getting nickname');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			collection.findOne({username: userName}, {projection: {nickname: 1, balance: 1, wins: 1, loses: 1}},(function(err, result){
				if(err){
					console.log("error in find");
				}else if(result != null){
					console.log("success find function");
					cb(result);
				}else{
					console.log("user does not exists");
				}
			}));
			client.close();
		}
	});
}

var updateStats = function(userName, isWin){
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
			console.log('Connected...Getting nickname');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			var query = { username: userName};
			var stat;
			if(isWin){
				stat = {$inc: {wins: 1}};
			}else{
				stat = {$inc: {loses: 1}};
			}
			collection.updateOne(query, stat, (function(err, result){
				if(err){
					console.log("error when trying to update");
				}else{
					console.log("succesfully updated stats");
				}
			}));
			client.close();
		}
	});
}

module.exports = {
	setUserBalance,
	setUserNickname,
	getUserBalance,
	getUserNickname,
	addUser,
	validateUser,
	getUserInfo,
	getTopUsers 
}



