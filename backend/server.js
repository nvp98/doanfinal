var bodyParser = require("body-parser");
const express = require("express"); //express framework to have a higher level of methods
const cors = require('cors');
const app = express(); //assign app variable the express class/method
const personRoutes = express.Router();

var http = require("http");
var path = require("path");
//mongodb
 var MongoClient = require("mongodb").MongoClient;
//var url = "mongodb://localhost:27017/";
const url = "mongodb+srv://kiki:111@cluster0.ewazt.mongodb.net/doan?retryWrites=true&w=majority";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app); //create a server
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//***************this snippet gets the local ip of the node.js server. copy this ip to the client side code and add ':3000' *****
//****************exmpl. 192.168.56.1---> var sock =new WebSocket("ws://192.168.56.1:3000");*************************************
require("dns").lookup(require("os").hostname(), function (err, add, fam) {
  console.log("addr: " + add);
});
/**********************websocket setup**************************************************************************************/
//var expressWs = require('express-ws')(app,server);
const WebSocket = require("ws");
const s = new WebSocket.Server({ server });
//when browser sends get request, send html file to browser
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../build')));
// viewed at http://localhost:30000
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
  
});
let dbo;

MongoClient.connect(url, function(err, db) {
 if(err)console.log("err mongo");
	console.log("MongoClient correctly to server");
	dbo = db.db("doan");
});


 app.get("/doan", (request, response) => {
	 response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    dbo.collection("dht11").find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
		var ob={nhietdo:[result[0].Nhietdo],doam:[result[0].Doam],as:[result[0].as],damkk:[result[0].damkk]};
        response.json(ob);
    });

	
});


/* personRoutes.route('/test').get(function (req, res) {
    console.log(req.body);
	console.log("tsts");
    //person.save()

}); */



 app.post("/control", urlencodedParser,(request, response) => {
	 response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

 obj={maybom:request.body.maybom || "", quat:request.body.quat|| "", phunsuong:request.body.phunsuong|| "", chedo:request.body.chedo|| "",id:request.body.id|| ""};
	 console.log("control data",obj); 
  dbo.collection("control").updateOne({id:'2'},{$set:obj}, function(err, res) {
    if (err) console.log(err);
    console.log("1 document inserted");
    
  });
  //insert
/*     dbo.collection("control").insertOne(obj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
	}); */ 

	//end db 
	 //response.send(JSON.stringify(obj));
	 //response.json(request.body)
	 //request.send("post");
});
 app.get("/control",(request, response) => {
	 response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

 obj={maybom:request.body.maybom, quat:request.body.quat, phunsuong:request.body.phunsuong, chedo:request.body.chedo,id:request.body.id};
	 //console.log("res_body"+response.body); 
	 //response.send("get test");
	 //db

  dbo.collection("control").findOne({}, function(err, result) {
    if (err) console.log(err);
   // console.log("get_control"+result);
/* 	response.json({nhietdo:[Math.floor(Math.random()*10)],
	doam:[Math.floor(Math.random()*10)]}); */
	response.json(result);
  });

	 //end db
	 //response.json(request.body)
	 //request.send("post");
});
let prevData = "";
		function safelyParseJSON (json) {
  // This function cannot be optimised, it's best to
  // keep it small!
  var parsed

  try {
    parsed = JSON.parse(json)
  } catch (e) {
    // Oh well, but whatever...
  }

  return parsed // Could be undefined!
}

//*************************************************************************************************************************
//***************************ws chat server********************************************************************************
//app.ws('/echo', function(ws, req) {
s.on("connection", function (ws, req) {
  /******* when server receives messsage from client trigger function with argument message *****/
 
/*    ws.on('open', function open() {
	  ws.send("From Server only to sender test: open");
	  console.log("ws.on open");
  //db
	 MongoClient.connect(url,{useUnifiedTopology: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("doan");
  dbo.collection("test").findOne({}, function(err, result) {
    if (err) throw err;
    console.log("test send"+result);
	ws.send("From Server only to sender test: open" + JSON.stringify(result));
    db.close();
  });
}); 
//end db
  }); */

 ws.on("message", function (message) {
    //console.log("Received: " + message);
	// mongodb
	if(message){
	   var item = [];
	   var myobj ={};
	   let myobj11={};
	   let mynewobj={};
	    
	try {
		myobj11 = JSON.parse(message);
		mynewobj={Nhietdo:myobj11.Nhietdo||"",Doam:myobj11.Doam||"",as:myobj11.as||"",damkk:myobj11.damkk||""};
	   //console.log("obj",myobj11.id);
	   var myobj1 = {id:1,Nhietdo:"58",Doam:"149"}
	   var myobjnew ={$set: mynewobj};
	   dbo.collection("dht11").find({}).toArray(function(err, result) {
		if (err) console.log(err);
		//console.log("result ",result);
		 item=result.filter(x =>{
			return x.id == 1;
		})
		myobj={Nhietdo:item[0].Nhietdo,Doam:item[0].Doam};
		});
		
       dbo.collection("dht11").updateMany(myobj,myobjnew, function(err, res) {
			if (err) console.log(err);
			//console.log("1 document inserted");
    
		});
		
	   //console.log("==============");
		  } catch (e) {
    // Oh well, but whatever...
	console.log("err parse");
		}
	
				//db
			//MongoClient.connect(url,{useUnifiedTopology: true}, function(err, db) {
		 // if (err) console.log(err);
		  dbo.collection("control").findOne({}, function(err, result) {
			if (err) console.log(err);
			const resultStr = JSON.stringify(result);
			if (resultStr !== prevData) {
				ws.send(JSON.stringify(result));
				prevData = resultStr;
			}			
			//db.close();
		  });
		//});
		//end db
	
	 }
	
	 
/*     s.clients.forEach(function (client) {
      //broadcast incoming message to all clients (s.clients)
      if (client != ws && client.readyState) {
        //except to the same client (ws) that sent this message
        //client.send("broadcast: " + message);
      }
    }); */
	

    //ws.send("From Server only to sender: " ); //send to client where message is from
  });
  //ws.send("new client send connected");

  console.log("new client connected");
  ws.on("close", function () {
    console.log("lost one client");
  });

  	
//ws.send("From Server only to sender: hihi" );
});
const port = process.env.PORT || 5001;
server.listen(port);
