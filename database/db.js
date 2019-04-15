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

	
var validateUser = function(userName, password){
	
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
						return true;
					}else{
						return false;
					}
				}else{
					console.log("user does not exists");
					return false;
				}
			}));
			client.close();
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

var addUser = function(userName){
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
					console.log("username already exists");
				}else{
					collection.insertOne({username: userName}, function(err, result){
						if(err){
							console.log("error adding user");
						}else{
							console.log("success");
						}
					});
				}
			}));
			client.close();
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

var getUserNickname = function(userName){
	
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
					return result.nickName;
				}else{
					console.log("user does not exists");
				}
			}));
			client.close();
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

var getUserBalance = function(userName){
	
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
					return result.balance;
				}else{
					console.log("user does not exists");
				}
			}));
			client.close();
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

var setUserNickname = function(userName, nickName){
	
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

var setUserBalance = function(userName, newBalance){
	
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
	addUser
}



