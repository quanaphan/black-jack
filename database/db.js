/*const MongoClient = require('mongodb').MongoClient;
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
	});*/



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
		var succ = false;
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
						succ = true;
					}else{
					}
				}else{
					console.log("user does not exists");
				}
			}));
			client.close();
			cb(succ);
			//collection.insertOne( {username: "poop", password: "wtfisthis"});
			//var query = { username: "poop" };
			//var newval = { $set: {balance: 500 }};
			//collection.updateOne(query, newval, function(err, res){
			//	if(err){
			//		console.log("error");
			//	}else{
			//		console.log("success");
			//	}
				// perform actions on the collection object
				//client.close();
			}
		});
}

var addUser = function(userName, psword, nickName, success, fail){
	const MongoClient = require('mongodb').MongoClient;
	
	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		var succ = false;
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
   
			console.log('Connected...Adding user');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			collection.find({username: userName}, (function(err, result){
				if(err){
					console.log("error in find");
				}else if(result != null){
					console.log("username already exists");
				}else{
					collection.insertOne({username: userName, password: psword, nickname: nickName, wins: 0, loses: 0}, function(err, result){
						if(err){
							console.log("error adding user");
						}else{
							console.log("success");
							succ = true;
						}
					});
				}
			}));
			client.close();
			if(succ){
				success();
			}else{
				fail();
			}
			//collection.insertOne( {username: "poop", password: "wtfisthis"});
			//var query = { username: "poop" };
			//var newval = { $set: {balance: 500 }};
			//collection.updateOne(query, newval, function(err, res){
			//	if(err){
			//		console.log("error");
			//	}else{
			//		console.log("success");
			//	}
				// perform actions on the collection object
				//client.close();
			}
		});
	
}

var getUserNickname = function(userName, cb){
	
	const MongoClient = require('mongodb').MongoClient;
	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {

		var  succ = false;
		var res;
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
					res = result.nickname;
					succ = true;
					
				}else{
					console.log("user does not exists");
				}
			}));
			client.close();
			if(succ) cb(res);
			//collection.insertOne( {username: "poop", password: "wtfisthis"});
			//var query = { username: "poop" };
			//var newval = { $set: {balance: 500 }};
			//collection.updateOne(query, newval, function(err, res){
			//	if(err){
			//		console.log("error");
			//	}else{
			//		console.log("success");
			//	}
				// perform actions on the collection object
				//client.close();
			}
		});
}

var getUserBalance = function(userName, cb){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		var succ = false;
		var res;
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
					res = result.balance
				}else{
					console.log("user does not exists");
				}
			}));
			client.close();
			if(succ) cb(result.balance);
			//collection.insertOne( {username: "poop", password: "wtfisthis"});
			//var query = { username: "poop" };
			//var newval = { $set: {balance: 500 }};
			//collection.updateOne(query, newval, function(err, res){
			//	if(err){
			//		console.log("error");
			//	}else{
			//		console.log("success");
			//	}
				// perform actions on the collection object
				//client.close();
			}
		});
}

var setUserNickname = function(userName, nickName, cb){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		var succ = false;
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
					succ = true;
				}
			}));
			client.close();
			if(succ) cb();
			//collection.insertOne( {username: "poop", password: "wtfisthis"});
			//var query = { username: "poop" };
			//var newval = { $set: {balance: 500 }};
			//collection.updateOne(query, newval, function(err, res){
			//	if(err){
			//		console.log("error");
			//	}else{
			//		console.log("success");
			//	}
				// perform actions on the collection object
				//client.close();
			}
		});
}

var setUserBalance = function(userName, newBalance, cb){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		var succ = false;
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
					succ = true;
				}
			}));
			client.close();
			if (succ) cb();
			//collection.insertOne( {username: "poop", password: "wtfisthis"});
			//var query = { username: "poop" };
			//var newval = { $set: {balance: 500 }};
			//collection.updateOne(query, newval, function(err, res){
			//	if(err){
			//		console.log("error");
			//	}else{
			//		console.log("success");
			//	}
				// perform actions on the collection object
				//client.close();
			}
		});
}

var getTopUsers = function(cb){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		var succ = false;
		var res;
		if(err) {
			console.log('Error occurred while connecting to MongoDB Atlas...\n',err.stack);
		}else{
			console.log('Connected...');
			const db = client.db("Blackjack");
			const collection = db.collection("Users");
			var sort = { balance: -1 };
			collection.find().sort(sort).toArray((function(err, result){
				if(err){
					console.log("error in find");
				}else if(result != null){
					console.log("success find function");
					console.log(result);
					res = result;
				}else{
					console.log("no users found");
				}
			}));
			client.close();
			if(succ) cb(res);
			//collection.insertOne( {username: "poop", password: "wtfisthis"});
			//var query = { username: "poop" };
			//var newval = { $set: {balance: 500 }};
			//collection.updateOne(query, newval, function(err, res){
			//	if(err){
			//		console.log("error");
			//	}else{
			//		console.log("success");
			//	}
				// perform actions on the collection object
				//client.close();
			}
		});
}

var getUserInfo = function(userName, cb){
	
	const MongoClient = require('mongodb').MongoClient;

	// replace the uri string with your connection string.
	const uri = "mongodb+srv://CarlosHz:BlackjackSeng513@blackjack-2j9ms.mongodb.net/test?retryWrites=true";
	MongoClient.connect(uri, function(err, client) {
		var succ = false;
		var res;
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
					res = result;
				}else{
					console.log("user does not exists");
				}
			}));
			client.close();
			if(succ) cb(result);
			//collection.insertOne( {username: "poop", password: "wtfisthis"});
			//var query = { username: "poop" };
			//var newval = { $set: {balance: 500 }};
			//collection.updateOne(query, newval, function(err, res){
			//	if(err){
			//		console.log("error");
			//	}else{
			//		console.log("success");
			//	}
				// perform actions on the collection object
				//client.close();
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
	getTopUsers, 
}



