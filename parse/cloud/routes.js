exports.login = function(req, res){      res.render('login.ejs', {yougotit: "Wreck The Media"});};//REDIRECTS USER TO LOGIN PAGEexports.logins = function(req, res){  Parse.User.logIn(req.body.usrname, req.body.pwd).then(function(user) {	  res.redirect('/profile');  }, function(error) {// Show the error message and let the user try again    res.render('login.ejs', {yougotit: "Invalid user or password!"});  });};//directs to profile needs user sessionexports.profile = function(req, res){	var usrClass = Parse.User.current().get("Class");	if(!Parse.User.current()){      res.redirect('/');	  //IF USER IS A STAFF  }else if(usrClass == "staff"){	  res.render('profile.ejs');	  //IF USER IS A CLIENT REDIRECT TO THE HOME FOR CLIENTS  }else if(usrClass == "client"){	  var usrID = Parse.User.current().get("ClientID");	  var queryClients = new Parse.Query("Clients");	  queryClients.equalTo("objectId", usrID);	  queryClients.first({		  success: function(object){	      res.render('home.ejs', { 	  		user: object	      });	  }	  });    }};//logout userexports.logout = function(req, res) {    Parse.User.logOut();    res.redirect('/');  };//Renders ReserveHotel Websiteexports.reserveHotel = function(req, res){	var usrClass = Parse.User.current().get("Class");	if(!Parse.User.current() || usrClass === "staff") {	      res.redirect('/');	 }else{   	  var usrID = Parse.User.current().get("ClientID");   	  var queryClients = new Parse.Query("Clients");   	  queryClients.equalTo("objectId", usrID);   	  queryClients.first().then(function(results) {	  	var queryReservations = new Parse.Query("Reservations");	      queryReservations.equalTo("ClientID", usrID);	  	queryReservations.descending('createdAt');     queryReservations.find({	  success: function(object) {      res.render('reserveHotel.ejs', {   		user: results,		  reservations: object      });  }  });});}};//SHOWS CLIENT'S RESERVATIONS TO STAFF MEMBERSexports.reservations = function(req, res){	if(!Parse.User.current()) {	      res.redirect('/');	 }else{    var queryReservations = new Parse.Query("Reservations");		queryReservations.descending('createdAt');        queryReservations.find({   	  success: function(object) {         res.render('reservations.ejs',{    		  reservations: object         });     }     });	 } };exports.reservation = function(req, res){ var arrival_date = req.body.arrival_date; var departure_date = req.body.departure_date; var airline = req.body.airline; var flight_number = req.body.flight_number; var number_people = req.body.number_people; var contact_tel = req.body.contact_tel; var contact_email = req.body.contact_email; var destination = req.body.destination; var destination2 = req.body.destination2; var notes = req.body.notes; var clientID = req.body.clientID; var clientName = req.body.clientName; //Create Reservation Object class and reserves in the new instance of the class    var Reservation = Parse.Object.extend("Reservations");    var reservation = new Reservation();//Save Client  reservation.save({    Arrival: arrival_date,    Departure: departure_date,	Airline: airline,	  Flight: flight_number,    People: number_people,	Telephone: contact_tel,	  Email: contact_email,	Destination: destination,	Destination2: destination2,    notes: notes,	  ClientID: clientID,	  ClientName: clientName,	  Icon: "/web/img/icons/waiting.png",	  Status2: "/web/img/icons/cancel1.png",	  Status: "Pending"  }, {    success: function(post) {		res.redirect("/reserveHotel");    },    error: function(post, error) {      // The save failed.      // error is a Parse.Error with an error code and message.    }  });   };exports.signup = function(req, res){      res.render('signup.ejs');};exports.labels = function(req, res){      res.render('labels.ejs');};exports.newLabel = function(req, res){      res.render('newLabel.ejs');};exports.labelsTable = function(req, res){      res.render('labelsTable.ejs');};exports.clientSuccess = function(req, res){	res.render('clientSuccess.ejs');};//direct to clients page needs user sessions and displays pending clients to be given a username and passwordexports.clients = function(req, res){	if(!Parse.User.current()) {	      res.redirect('/');	 }else{	 var queryClients = new Parse.Query("Clients");	 queryClients.equalTo("Status", "Pending");	 queryClients.descending('createdAt');	 queryClients.find({	 success: function(results){	   	res.render('clients.ejs', { 	   	clients: results	   		 });	   		    }	   		});	   }	   };	    //direct to clients page needs user sessions and displays active clientsexports.mainclients = function(req, res){	if(!Parse.User.current()) {   res.redirect('/');	  }else{	  var queryClients = new Parse.Query("Clients");	  queryClients.equalTo("Status", "Active");	  queryClients.descending('createdAt');	  queryClients.find({	  success: function(results){	  	res.render('mainclients.ejs', { 	  	clients: results   		 });   		    }   		});	   	   }	   	   };		  	       // Signs up a new user and data validation  exports.clientReg = function(req, res) {     var usrFullName = req.body.usrFullName;  	var usrCompany= req.body.usrCompany;     var usrCountry = req.body.usrCountry;	 var usrState = req.body.usrState;	 var usrCity = req.body.usrCity;	 var usrDestination = req.body.usrDestination;	 var usrAddress = req.body.usrAddress;	 var usrAddress2 = req.body.usrAddress2;	 var usrLanguage = req.body.usrLanguage;	 var usrID1 = req.body.usrID1;	 var usrID2 = req.body.usrID2;	 var usrTel = req.body.usrTel;     var reg_email = req.body.usrEmail;     var atpos = reg_email.indexOf("@");     var dotpos = reg_email.lastIndexOf("."); 	 var usrNotes = req.body.usrNotes; 	//not null name  	if(usrFullName == "" || usrFullName == null || usrFullName.length<2){  	  res.redirect('/signup');    //not null company	}else if(usrCompany == "" || usrCompany == null){ 	  res.redirect('/signup');	//not null username	}else if(usrCountry == "" || usrCountry == null){ 	  res.redirect('/signup');	//not null STATE	}else if(usrState == "" || usrState == null){	  res.redirect('/signup');	//not null city 	}else if(usrCity == "" || usrCity == null){	  res.redirect('/signup');	//not null Destination	}else if(usrDestination == "" || usrDestination == null){	  res.redirect('/signup');    //not null Address			}else if(usrAddress == "" || usrAddress == null){	  res.redirect('/signup');	 //not null usrID1	}else if(usrID1 == "" || usrID1 == null){	  res.redirect('/signup');	//not null Tel    }else if(usrTel == "" || usrTel == null){      res.redirect('/signup');	//not null email    }else if(reg_email == "" || reg_email == null){ 	  res.redirect('/signup');   //valid email 	}else if(atpos < 1 || ( dotpos - atpos < 2 )) { 	  res.redirect('/signup'); 	//not null password 	}else{ 		   //Create Client Object Client class and client is the new instance of the class	    var Client = Parse.Object.extend("Clients");	    var client = new Client();	//Save Client	  client.save({	    Name: usrFullName,	    Company: usrCompany,		Country: usrCountry,	    State: usrState,		City: usrCity,		Destination: usrDestination,		Address: usrAddress,	    Address2: usrAddress2,	    Language: usrLanguage,	    ID1: usrID1,	    ID2: usrID2,		Telephone: usrTel,		Email: reg_email,		  Status: "Pending",		Notes: usrNotes	  }, {	    success: function(post) {			res.redirect("/clientSuccess");	    },	    error: function(post, error) {	      // The save failed.	      // error is a Parse.Error with an error code and message.	    }	  }); 	}}//DISPLAYS CLIENT'S PROFILE YOU ARE VISITINGexports.clientProfile = function(req, res) {if (!Parse.User.current()) {      res.redirect('/'); }else{  var queryCliente = new Parse.Query("Clients");  var cliente = req.params;  var clienteHost = cliente.toString();  var clienteFinal = clienteHost.slice(1);  queryCliente.equalTo("objectId", clienteFinal);  queryCliente.first({  success: function(results){  	res.render('clientProfile.ejs', {   	user: results	 });	    }	});   	   }   	   };	  	   	   //DISPLAYS TRIPS TABLEexports.tripInfo = function(req, res) {if (!Parse.User.current()) {      res.redirect('/'); }else{  var queryReservation = new Parse.Query("Reservations");  var reservation = req.params.tripId;  queryReservation.equalTo("objectId", reservation);  queryReservation.first({	  success: function(object){      res.render('reservation.ejs', {   		reservation: object      });  }  });};};//DISPLAYS TRIP TABLE IN CLIENTS PROFILEexports.reserv = function(req, res){	if (!Parse.User.current()) {	      res.redirect('/');		 }else{	     var queryTrips = new Parse.Query("Reservations");	     var client = req.params.clientID;	     queryTrips.equalTo("ClientID", client);   	  queryTrips.find().then(function(results) {	  	var queryClient = new Parse.Query("Clients");	      queryClient.equalTo("objectId", client);     queryClient.first({	  success: function(object) {      res.render('cl_reserv.ejs', {   		trips: results,		  user: object      });  }  });});}};exports.addClient = function(req, res) {	var user = new Parse.User();	var username = req.body.clientUsrname;	var password = req.body.clientpwd;	var clientEmail = req.body.clientEmail;	var clientID = req.body.clientID;  //Save Client	Parse.Cloud.useMasterKey();  var queryClients = new Parse.Query("Clients");  queryClients.equalTo("objectId", clientID);  queryClients.first().then(function(results) {    results.set("Status", "Active");	results.save();  }).then(function() {     //Create Client USER and PASSWORD for sessions      var Client = Parse.Object.extend("User");      var client = new Client();  client.save({	  username: username,	  password: password,	  email: clientEmail,	  ClientID: clientID,	  Class: "client"  }, {    success: function(post) {		res.redirect("/mainclients");    },    error: function(post, error) {      // The save failed.      // error is a Parse.Error with an error code and message.    }  }); });}   