/*jshint node:true*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as it's web server
 
var express = require('express');
var app = express();
var path = require('path');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');


// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/stylesheets',express.static(path.join(__dirname, 'public/stylesheets')));

//Shows register page
app.get('/register', function (req, res) {

	//res.render('register.html');
	res.sendFile(path.join(__dirname+'/public/register.html'));
 

});

//Shows puzzle page
app.get('/puzzle', function (req, res) {

 
	res.sendFile(path.join(__dirname+'/public/puzzle.html'));
 
});

//Shows leaderboard
app.get('/leaderboard', function (req, res) {

	res.sendFile(path.join(__dirname+'/public/leaderboard.html'));

});

//show challenges 
app.get('/showchallenge/:edition', function (req, res) {
   var challengeid = req.params.edition;
   res.writeHead(200, {'Content-Type': 'text/plain'});

   var img = "";

   if(challengeid.toString() == "555aa797e4b07b6ac504ed07a"){
   	img="https://w3-connections.ibm.com/files/form/anonymous/api/library/df27b346-8f9c-41bb-981f-cd4317b63186/document/8d69077e-a2c4-4614-a08d-2d863eee6be1/media/c1q1.jpg";	
   }else if(challengeid.toString() == "555aa797e4b07b6bc504ed07b"){
   	img="https://w3-connections.ibm.com/files/form/anonymous/api/library/df27b346-8f9c-41bb-981f-cd4317b63186/document/983f078e-8e0f-42f5-8c51-7cef3679bd7f/media/c1q2.jpg";
   }else if(challengeid.toString() == "555aa797e4b07b6cc504ed07c"){
   	img="https://w3-connections.ibm.com/files/form/anonymous/api/library/df27b346-8f9c-41bb-981f-cd4317b63186/document/f10c9365-d9b2-4986-b66e-93e905c04183/media/c1q3.jpg";
   }else{
   	img="https://w3-connections.ibm.com/files/form/anonymous/api/library/df27b346-8f9c-41bb-981f-cd4317b63186/document/bf88e283-f487-4c3a-abdc-f6c02b868ed0/media/thinkfunlogo.png";
   }
    res.write(img);

   /*
   	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	 
	var url = 'mongodb://IbmCloud_upcdb41b_8rfkqk6s_hupucuih:KjLPoJbMHQ0ysKneuW6ANowFd5tfgIAd@ds037812.mongolab.com:37812/IbmCloud_upcdb41b_8rfkqk6s';

	// Use connect method to connect to the Server 
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  
		if(err) {
			console.log("failed to connect to the database");
			res.write('Not Connected  ');
		} else {
			console.log("Connected correctly to server");
	  		//res.write('Test Connected '); 

	 		var collection = db.collection('challenges');
	 		
	 		var ObjectID = require('mongodb').ObjectID;
	 		var util = require('util');

			cid = new ObjectID(challengeid); 
 
			collection.find().toArray(function(err, challenge){
			    res.write(JSON.stringify(challenge));
			});
		  
	 		
		} 
	});
	*/
 

});
 
//check answers
app.get('/checkanswer/:challengenum/:answer/:uname', function (req, res) {
   var challengeid = req.params.challengenum;
   var answer = req.params.answer;
   var uname = req.params.uname;

   res.writeHead(200, {'Content-Type': 'text/plain'});
  

 
   	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	 
	var url = 'mongodb://IbmCloud_upcdb41b_8rfkqk6s_hupucuih:KjLPoJbMHQ0ysKneuW6ANowFd5tfgIAd@ds037812.mongolab.com:37812/IbmCloud_upcdb41b_8rfkqk6s';

	// Use connect method to connect to the Server 
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  
		if(err) {
			console.log("failed to connect to the database");
			res.write('Not Connected  ');
		} else {
			console.log("Connected correctly to server");
	  		//res.write('Test Connected '); 

	 		var collection = db.collection('challenges');
	 		
	 		var ObjectID = require('mongodb').ObjectID;
	 		var note ="";

			cid = new ObjectID(challengeid); 
 
			collection.find().toArray(function(err, challenge){
				//if(answer == challenge[0].q1[0].answer){
		  		//	note= "Answer is correct";
		  		//	//update points here
		  		//}else{
		  		//	note = "Try again!";
		  		//}
		  		//res.write(note);
			    res.write(JSON.stringify(challenge));
			});
		  	

	 		// res.write(challengeid+answer+uname);
		} 
		 
	});
 

});

//update points and attempts after answering
app.get('/updatepoints/:challengenum/:correct/:uname', function (req, res) {
   var challengeid = req.params.challengenum;
   var correct = req.params.correct; // 0 - correct
   var uname = req.params.uname;

   res.writeHead(200, {'Content-Type': 'text/plain'});
  

 
   	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	 
	var url = 'mongodb://IbmCloud_upcdb41b_8rfkqk6s_hupucuih:KjLPoJbMHQ0ysKneuW6ANowFd5tfgIAd@ds037812.mongolab.com:37812/IbmCloud_upcdb41b_8rfkqk6s';

	// Use connect method to connect to the Server 
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  
		if(err) {
			console.log("failed to connect to the database");
			res.write('Not Connected  ');
		} else {
			console.log("Connected correctly to server");
	  		//res.write('Test Connected '); 

	 		var collection = db.collection('users_challenge');

	 		//username and challenge edition
	 		//var str = "555aa797e4b07b6ac504ed07a";
    		var cid = challengeid.substring(0, 24);
			ucid = uname+"_"+ cid;

 			var msg="Out of the woods";

 
 			collection.findAndModify({
			    query: { ucid:ucid },
			    sort: { ucid: 1 },
			    update: {"$set": {"ucid": "555aa797e4b07b6ac504ed07"}},
			    upsert: true}, 
			    function(err, doc) {
			    	if(err){
			    		msg="err";
			    	}else{
			    		msg="found";
			    	}
			    	res.write(msg+ucid+JSON.stringify(doc));
			    }); 
 			
	 
			 
 			/*
 			collection.findOne({ucid: ucid}, function(err, doc) {
 			 {
		    "findAndModify": "users_challenge",
		    "query": {"ucid": "JeffSanz_555aa797e4b07b6ac504ed09"},
		    "sort": {},
		    "update": {"$set": {"c1d": [ { "points": 200, "attempts": 1, "status": 3 } ]}},
		    "new": false,
		    "fields": {},
		    "upsert": false

			res.write(msg+ucid+JSON.stringify(doc));
			});
	 		*/
		} 

		 
	});
 

});


//display challenge page 
app.get('/challenge/:edition', function (req, res){

	res.sendFile(path.join(__dirname+'/public/challenge.html'));
  
});

 
//show leaderboard
app.get('/showleaderboard', function (req, res) {

	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	// Connection URL 
	var url = 'mongodb://IbmCloud_upcdb41b_8rfkqk6s_hupucuih:KjLPoJbMHQ0ysKneuW6ANowFd5tfgIAd@ds037812.mongolab.com:37812/IbmCloud_upcdb41b_8rfkqk6s';
	
	// Use connect method to connect to the Server 
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  
		if(err) {
			console.log("failed to connect to the database");
			res.write('Not Connected  ');
		} else {
			console.log("Connected correctly to server");
			var userlist = [];

	  		//res.write('Leaderboard Connected ');
	  		var collection = db.collection('users', function(err, collection) { 
		  		
		  		var first = true;
		  		//showLeaderboard(db, function() {db.close();});
				res.setHeader("Content-Type", "application/json");
  				res.write('{"users" : [');

  				var options = {
					"limit": 30,
					"sort": {"points": -1}
					}
			 

  				var stream = collection.find({}, options).stream();

				stream.on('error', function (err) {
					console.error(err.stack)
				});
				
				stream.on("data", function(item) {
					//console.log(items);
					var prefix = first ? '' : ', ';
				    res.write(prefix + JSON.stringify(item));
				    first = false;
					
				});

				stream.on("end", function() {
					console.log("End");
					res.write(']}');
					res.end();
				});
			});
			   
		}
	 	 
	});
});


app.post('/registernow', function (req, res) {

	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	 
	var url = 'mongodb://IbmCloud_upcdb41b_8rfkqk6s_hupucuih:KjLPoJbMHQ0ysKneuW6ANowFd5tfgIAd@ds037812.mongolab.com:37812/IbmCloud_upcdb41b_8rfkqk6s';

	// Use connect method to connect to the Server 
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  
		if(err) {
			console.log("failed to connect to the database");
			res.write('Not Connected  ');
		} else {
			console.log("Connected correctly to server");
	  		//res.write('Test Connected '); 

	  		insertUser(db, function() {
			db.close();
			});
		 
			res.end();	
		} 
	});
});
	
	var insertUser = function(db, callback) {
		// Get the users collection
	 	var collection = db.collection('users');
	 	

	 	//var uemail = req.body.email;
	 	//var uname  = req.body.uname;
	 	var user1 = { "email" : "test4@gmail.com", "uname" : "JeffSanzx", "points": 0 };

		// Insert some users
		collection.insert(user1, function(err, result) {
		    assert.equal(err, null);
		    assert.equal(3, result.result.n);
		    assert.equal(3, result.ops.length);
		    res.writeHead(200, {'Content-Type': 'text/plain'});
		    res.write('User added successfully.');
		    callback(result);
		  	});
	}


 

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
