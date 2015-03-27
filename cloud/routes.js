//BY NEURONS ART AND TECHNOLOGY ALL RIGHTS RESERVED AND COPYRIGHTED.//IN ASSOCIATION WITH LC CARGO XPRESS LOS ANGELES//AUTHORS: SUI GENERIS / OSCAR ALCANTARAexports.login = function(req, res){      res.render('login.ejs', {yougotit: "Wreck The Media"});};//REDIRECTS USER TO LOGIN PAGEexports.logins = function(req, res){  Parse.User.logIn(req.body.usrname, req.body.pwd).then(function(user) {	  res.redirect('/profile');  }, function(error) {// Show the error message and let the user try again    res.render('login.ejs', {yougotit: "Invalid user or password!"});  });};//directs to profile needs user sessionexports.profile = function(req, res){	var usrClass = Parse.User.current().get("Class");	if(!Parse.User.current()){      res.redirect('/');	  //IF USER IS A STAFF  }else if(usrClass == "staff"){	  res.render('profile.ejs');	  //IF USER IS A CLIENT REDIRECT TO THE HOME FOR CLIENTS  }else if(usrClass == "client"){	  var usrID = Parse.User.current().get("ClientID");	  var queryClients = new Parse.Query("Clients");	  queryClients.equalTo("objectId", usrID);	  queryClients.first({		  success: function(object){	      res.render('home.ejs', { 	  		user: object	      });	  }	  });    }};//logout userexports.logout = function(req, res) {    Parse.User.logOut();    res.redirect('/');  };//Renders ReserveHotel Websiteexports.reserveHotel = function(req, res){	var usrClass = Parse.User.current().get("Class");	if(!Parse.User.current() || usrClass === "staff") {	      res.redirect('/');	 }else{   	  var usrID = Parse.User.current().get("ClientID");   	  var queryClients = new Parse.Query("Clients");   	  queryClients.equalTo("objectId", usrID);   	  queryClients.first().then(function(results) {	  	var queryReservations = new Parse.Query("Reservations");	      queryReservations.equalTo("ClientID", usrID);	  	queryReservations.descending('createdAt');     queryReservations.find({	  success: function(object) {      res.render('reserveHotel.ejs', {   		user: results,		  reservations: object      });  }  });});}};//SHOWS CLIENT'S RESERVATIONS TO STAFF MEMBERSexports.reservations = function(req, res){	if(!Parse.User.current()) {	      res.redirect('/');	 }else{    var queryReservations = new Parse.Query("Reservations");		queryReservations.descending('createdAt');        queryReservations.find({   	  success: function(object) {         res.render('reservations.ejs',{    		  reservations: object         });     }     });	 } };//SHOWS CLIENT'S RESERVATIONS TO STAFF MEMBERS(FILTERED) exports.reservationspost = function(req, res){	if(!Parse.User.current()){	      res.redirect('/');	}else{      var queryReservations = new Parse.Query("Reservations");	  queryReservations.descending('createdAt');      queryReservations.find(     {	success: 	function(results){	//variables que vienen por POST	var filterby = req.body.filterby;	var searchtext = req.body.searchtext;	var showfirst = parseInt(req.body.showfirst, 10);	//maximo de resultados, convertido a entero	//en este arreglo almacenaremos el resultado filtrado	var resultfilter = [];		//recorrer la lista de objetos en el resultado	for (var i = 0; i < results.length; i++){	var object = results[i];	//obtenemos el valor de este objeto en el campo de busqueda	var field = object.get(filterby);	//minusculas 	field = field.toLowerCase();	searchtext = searchtext.toLowerCase();			//verificar si contiene el texto que buscamos	 if(field.search(searchtext) != -1){	//agregar a la nueva lista de resultado	 resultfilter.push(object);	if(resultfilter.length >= showfirst)	break;		}	}	res.render('reservations.ejs',{ 	reservations: resultfilter		});			}		});	 } };  exports.reservation = function(req, res){ var arrival_date = req.body.arrival_date; var departure_date = req.body.departure_date; var airline = req.body.airline; var flight_number = req.body.flight_number; var number_people = req.body.number_people; var contact_tel = req.body.contact_tel; var contact_email = req.body.contact_email; var destination = req.body.destination; var destination2 = req.body.destination2; var notes = req.body.notes; var clientID = req.body.clientID; var clientName = req.body.clientName; //Create Reservation Object class and reserves in the new instance of the class    var Reservation = Parse.Object.extend("Reservations");    var reservation = new Reservation();//Save Client  reservation.save({    Arrival: arrival_date,    Departure: departure_date,	Airline: airline,	  Flight: flight_number,    People: number_people,	Telephone: contact_tel,	  Email: contact_email,	Destination: destination,	Destination2: destination2,    notes: notes,	  ClientID: clientID,	  ClientName: clientName,	  Icon: "/web/img/icons/waiting.png",	  Status2: "/web/img/icons/cancel1.png",	  Status: "Pending"  }, {    success: function(post) {		res.redirect("/reserveHotel");    },    error: function(post, error) {      // The save failed.      // error is a Parse.Error with an error code and message.    }  });  }; exports.signup = function(req, res){      res.render('signup.ejs');};exports.labels = function(req, res){      res.render('labels.ejs');};exports.newLabel = function(req, res){	var usrClass = Parse.User.current().get("Class");	if(usrClass === "staff"){      res.render('newLabel.ejs');  }else{	  res.redirect('/');  }};exports.clientSuccess = function(req, res){	res.render('clientSuccess.ejs');};//direct to clients page needs user sessions and displays pending clients to be given a username and passwordexports.clients = function(req, res){	if(!Parse.User.current()) {	      res.redirect('/');	 }else{	 var queryClients = new Parse.Query("Clients");	 queryClients.equalTo("Status", "Pending");	 queryClients.descending('createdAt');	 queryClients.find({	 success: function(results){	   	res.render('clients.ejs', { 	   	clients: results	   		 });	   		    }	   		});	   }	   };	    //direct to clients page needs user sessions and displays active clientsexports.mainclients = function(req, res){	if(!Parse.User.current()) {   res.redirect('/');	  }else{	  var queryClients = new Parse.Query("Clients");	  queryClients.equalTo("Status", "Active");	  queryClients.descending('createdAt');	  queryClients.find({	  success: function(results){	  	res.render('mainclients.ejs', { 	  	clients: results   		 });   		    }   		});	   	   }	   	   };//renders and display active agencies	    exports.mainAgencies = function(req, res){	 var usrClass = Parse.User.current().get("Class");	 //Permisions to visit section of the page if(!Parse.User.current() || usrClass === "client"){	  res.redirect('/');	     }else{   var queryAgencies = new Parse.Query("Agencies");   queryAgencies.equalTo("Status", "Active");   queryAgencies.descending('createdAt');   queryAgencies.find({		 success: function(results){				res.render('agencies.ejs', {					 agencies: results					   	});					  }				   });			   }		   };//renders and display pending agencies exports.pendingAgencies = function(req, res){	 var usrClass = Parse.User.current().get("Class");	 //Permisions to visit section of the page  if(!Parse.User.current() || usrClass === "client") {	 res.redirect('/');	}else{	var queryAgency = new Parse.Query("Agencies");    queryAgency.equalTo("Status", "Pending");    queryAgency.descending('createdAt');    queryAgency.find({    success: function(results){    res.render('pagencies.ejs', {     agencies: results		   	});		   	   }		   });		   }		   	  };//peticion post de la seccion de clientes pendientesexports.clientspost = function(req, res){	if(!Parse.User.current()) 	{		res.redirect('/');	}	else	{		var queryClients = new Parse.Query("Clients");		queryClients.equalTo("Status", "Pending");		queryClients.descending('createdAt');		queryClients.find(		{		success: 			function(results)			{				//variables que vienen por POST				var filterby = req.body.filterby;				var searchtext = req.body.searchtext;				var showfirst = parseInt(req.body.showfirst, 10);	//maximo de resultados, convertido a entero								//en este arreglo almacenaremos el resultado filtrado				var resultfilter = [];								//recorrer la lista de objetos en el resultado				for (var i = 0; i < results.length; i++) 				{					var object = results[i];										//obtenemos el valor de este objeto en el campo de busqueda					var field = object.get(filterby);										//minusculas 					field = field.toLowerCase();					searchtext = searchtext.toLowerCase();										//verificar si contiene el texto que buscamos					if(field.search(searchtext) != -1)					{						//agregar a la nueva lista de resultado						resultfilter.push(object);												//						if(resultfilter.length >= showfirst)							break;					}				}								//res.render('clients.ejs', {clients: resultfilter});				res.render('clients.ejs', {clients: resultfilter});													}		});	}};	   		 //peticion POST desde el formulario de filtrar clientesexports.mainclientspost = function(req, res){	if(!Parse.User.current()){   res.redirect('/');	}else{		var queryClients = new Parse.Query("Clients");	queryClients.equalTo("Status", "Active");	queryClients.descending('createdAt');    queryClients.find({		success: 		function(results){		  //variables que vienen por POST		  var filterby = req.body.filterby;		  var searchtext = req.body.searchtext;		  var showfirst = parseInt(req.body.showfirst, 10);	//maximo de resultados, convertido a entero		  //en este arreglo almacenaremos el resultado filtrado		  var resultfilter = [];				  //recorrer la lista de objetos en el resultado		  for (var i = 0; i < results.length; i++){			var object = results[i];			//obtenemos el valor de este objeto en el campo de busqueda			var field = object.get(filterby);			//minusculas 			field = field.toLowerCase();			searchtext = searchtext.toLowerCase();			//verificar si contiene el texto que buscamos			  if(field.search(searchtext) != -1){			  //agregar a la nueva lista de resultado			  resultfilter.push(object);				if(resultfilter.length >= showfirst)				  break;					}				}				res.render('mainclients.ejs', {clients: resultfilter});			}		});	}};		  	       // Signs up a new user and data validation  exports.clientReg = function(req, res) {     var usrFullName = req.body.usrFullName;  	var usrCompany= req.body.usrCompany;     var usrCountry = req.body.usrCountry;	 var usrState = req.body.usrState;	 var usrCity = req.body.usrCity;	 var usrDestination = req.body.usrDestination;	 var usrAddress = req.body.usrAddress;	 var usrAddress2 = req.body.usrAddress2;	 var usrLanguage = req.body.usrLanguage;	 var usrID1 = req.body.usrID1;	 var usrID2 = req.body.usrID2;	 var usrTel = req.body.usrTel;     var reg_email = req.body.usrEmail;     var atpos = reg_email.indexOf("@");     var dotpos = reg_email.lastIndexOf("."); 	 var usrNotes = req.body.usrNotes; 	//not null name  	if(usrFullName == "" || usrFullName == null || usrFullName.length<2){  	  res.redirect('/signup');    //not null company	}else if(usrCompany == "" || usrCompany == null){ 	  res.redirect('/signup');	//not null username	}else if(usrCountry == "" || usrCountry == null){ 	  res.redirect('/signup');	//not null STATE	}else if(usrState == "" || usrState == null){	  res.redirect('/signup');	//not null city 	}else if(usrCity == "" || usrCity == null){	  res.redirect('/signup');	//not null Destination	}else if(usrDestination == "" || usrDestination == null){	  res.redirect('/signup');    //not null Address			}else if(usrAddress == "" || usrAddress == null){	  res.redirect('/signup');	 //not null usrID1	}else if(usrID1 == "" || usrID1 == null){	  res.redirect('/signup');	//not null Tel    }else if(usrTel == "" || usrTel == null){      res.redirect('/signup');	//not null email    }else if(reg_email == "" || reg_email == null){ 	  res.redirect('/signup');   //valid email 	}else if(atpos < 1 || ( dotpos - atpos < 2 )) { 	  res.redirect('/signup'); 	//not null password 	}else{ 		   //Create Client Object Client class and client is the new instance of the class	    var Client = Parse.Object.extend("Clients");	    var client = new Client();	//Save Client	  client.save({	    Name: usrFullName,	    Company: usrCompany,		Country: usrCountry,	    State: usrState,		City: usrCity,		Destination: usrDestination,		Address: usrAddress,	    Address2: usrAddress2,	    Language: usrLanguage,	    ID1: usrID1,	    ID2: usrID2,		Telephone: usrTel,		Email: reg_email,		  Status: "Pending",		Notes: usrNotes	  }, {	    success: function(post) {			res.redirect("/clientSuccess");	    },	    error: function(post, error) {	      // The save failed.	      // error is a Parse.Error with an error code and message.	    }	  }); 	}};//DISPLAYS CLIENT'S PROFILE YOU ARE VISITINGexports.clientProfile = function(req, res) {	var usrClass = Parse.User.current().get("Class");if (!Parse.User.current()) {      res.redirect('/'); }else if(usrClass === "client"){ 	res.redirect('/');}else{  var queryCliente = new Parse.Query("Clients");  var cliente = req.params;  var clienteHost = cliente.toString();  var clienteFinal = clienteHost.slice(1);  queryCliente.equalTo("objectId", clienteFinal);  queryCliente.first({  success: function(results){  	res.render('clientProfile.ejs', {   	user: results	 });	    }	});   	   }   	   };	   //DISPLAYS AGENCIES PROFILE YOU ARE VISITINGexports.agencyProfile = function(req, res){	var usrClass = Parse.User.current().get("Class");  if(!Parse.User.current()){	 res.redirect('/'); }else if(usrClass === "client"){	  res.redirect('/');	   }else{	 var queryAgency = new Parse.Query("Agencies");	 var agencyId = req.params.agencyId;	 queryAgency.equalTo("objectId", agencyId);	 queryAgency.first({	 success: function(results){     res.render('agencyProfile.ejs',{		agency: results			});		  }			  });		   }	   };	  //DISPLAYS STAFF INFORMATION exports.staffInfo = function(req, res) {	  var usrclass =Parse.User.current().get("Class"); if (!Parse.User.current() || usrclass === "client") {     res.redirect('/');	   }else{	   var queryStaff = new Parse.Query("User");	   var staffId = req.params.staffId;	   queryStaff.equalTo("objectId", staffId);	   queryStaff.first({	   success: function(object){	     res.render('staff.ejs', { 	     	staff: object	       });	     }	     });	   };	   }; 	   //DISPLAYS TRIPS TABLEexports.tripInfo = function(req, res) {	var usrClass = Parse.User.current().get("Class");if (!Parse.User.current()) {      res.redirect('/');	   }else if(usrClass === "client"){ 	 res.redirect('/');	 }else{  var queryReservation = new Parse.Query("Reservations");  var reservation = req.params.tripId;  queryReservation.equalTo("objectId", reservation);  queryReservation.first({	  success: function(object){      res.render('reservation.ejs', {   		reservation: object      });  }  });};};//DISPLAYS TRIP TABLE IN CLIENTS PROFILEexports.reserv = function(req, res){	if (!Parse.User.current()) {	      res.redirect('/');		  //IF USER IS A CLIENT REDIRECT TO THE HOME FOR CLIENTS	  }else{	     var queryTrips = new Parse.Query("Reservations");	     var client = req.params.clientID;	     queryTrips.equalTo("ClientID", client);   	  queryTrips.find().then(function(results) {	  	var queryClient = new Parse.Query("Clients");	      queryClient.equalTo("objectId", client);     queryClient.first({	  success: function(object) {      res.render('cl_reserv.ejs', {   		trips: results,		  user: object      });  }  });});}};exports.addClient = function(req, res) {	var user = new Parse.User();	var username = req.body.clientUsrname;	var password = req.body.clientpwd;	var clientEmail = req.body.clientEmail;	var clientID = req.body.clientID;  //Save Client	Parse.Cloud.useMasterKey();  var queryClients = new Parse.Query("Clients");  queryClients.equalTo("objectId", clientID);  queryClients.first().then(function(results) {    results.set("Status", "Active");	results.save();  }).then(function() {     //Create Client USER and PASSWORD for sessions      var Client = Parse.Object.extend("User");      var client = new Client();  client.save({	  username: username,	  password: password,	  email: clientEmail,	  ClientID: clientID,	  Class: "client"  }, {    success: function(post) {		res.redirect("/mainclients");    },    error: function(post, error) {      // The save failed.      // error is a Parse.Error with an error code and message.    }  }); });};//Settings section of the platformexports.Settings = function(req, res){		if(!Parse.User.current()) {		      res.redirect('/');		 }else{			 	Parse.Cloud.useMasterKey();	    var queryStaff = new Parse.Query("User");			queryStaff.equalTo("Class", "staff");	        queryStaff.find({	   	  success: function(object) {	         res.render('settings.ejs',{ 	   		  staffs: object	         });	     }	     });		 }	 };// Signs up a new STAFF and data validation  exports.createStaff = function(req, res) {     var staffName = req.body.staffName;  	var staffLastName= req.body.staffLastName;	 var staffUsrname = req.body.staffUsrname;	 var staffPassword = req.body.staffPassword;	 var staffCpass = req.body.staffCpass;     var staff_email = req.body.staffEmail;     var atpos = staff_email.indexOf("@");     var dotpos = staff_email.lastIndexOf("."); 	//not null name  	if(staffName == "" || staffName == null || staffName.length<2){  	  res.redirect('/settings');    //not null lastName	}else if(staffLastName == "" || staffLastName == null){ 	  res.redirect('/settings');	//not null username	}else if(staffUsrname == "" || staffUsrname == null || staffUsrname.lenght<2){ 	  res.redirect('/settings');	//not null Password	}else if(staffPassword == "" || staffPassword == null || staffPassword.lenght<5){	  res.redirect('/settings');	//not null email    }else if(staff_email == "" || staff_email == null){ 	  res.redirect('/settings');   //valid email 	}else if(atpos < 1 || ( dotpos - atpos < 2 )) { 	  res.redirect('/settings'); 	//not null password 	}else{ 		   //Create Staff Object class and staff is the new instance of the class	    var Staff = Parse.Object.extend("User");	    var staff = new Staff();	//Save Client	  staff.save({	  username: staffUsrname,	  password: staffPassword,	  email: staff_email,	  Class: "staff",		  Name: staffName,		  LastName: staffLastName	 	  }, {	    success: function(post) {			res.redirect("/settings");	    },	    error: function(post, error) {	      // The save failed.	      // error is a Parse.Error with an error code and message.	    }	  }); 	}};// Signs up a new Agency and data validation  exports.agencyReg = function(req, res) {     var agName = req.body.agName;     var agCountry = req.body.agCountry;	 var agState = req.body.agState;	 var agCity = req.body.agCity;	 var agZip = req.body.agZip;	 var agDestination = req.body.agDestination;	 var agAddress = req.body.agAddress;	 var agAddress2 = req.body.agAddress2;	 var agPoBox = req.body.agPoBox;	 var agPoBoxId = req.body.agPoBoxId;	 var agLanguage = req.body.agLanguage;	 var agID1 = req.body.agID1;	 var agID2 = req.body.agID2;	 var agTel = req.body.agTel;	 var agWebsite = req.body.agWebsite;     var reg_email = req.body.agEmail;     var atpos = reg_email.indexOf("@");     var dotpos = reg_email.lastIndexOf("."); 	 var agNotes = req.body.agNotes; 	//not null name  	if(agName == "" || agName == null || agName.length<2){  	  res.redirect('/signup');    //not null country	}else if(agCountry == "" || agCountry == null){ 	  res.redirect('/signup');	//not null STATE	}else if(agState == "" || agState == null){	  res.redirect('/signup');	//not null city 	}else if(agCity == "" || agCity == null){	  res.redirect('/signup');	//not null Destination	}else if(agDestination == "" || agDestination == null){	  res.redirect('/signup');    //not null Address			}else if(agAddress == "" || agAddress == null){	  res.redirect('/signup');	 //not null usrID1	}else if(agID1 == "" || agID1 == null){	  res.redirect('/signup');	//not null Tel    }else if(agTel == "" || agTel == null){      res.redirect('/signup');	//not null ZIP CODE    }else if(agZip == "" || agZip == null){      res.redirect('/signup');	//not null email    }else if(reg_email == "" || reg_email == null){ 	  res.redirect('/signup');   //valid email 	}else if(atpos < 1 || ( dotpos - atpos < 2 )) { 	  res.redirect('/signup'); 	//not null password 	}else{ 		   //Create Client Object Client class and client is the new instance of the class	    var Agency = Parse.Object.extend("Agencies");	    var agency = new Agency();	//Save Client	  agency.save({	    Name: agName,		Country: agCountry,	    State: agState,		City: agCity,		Destination: agDestination,		Address: agAddress,	    Address2: agAddress2,		  ZIP: agZip,	    Language: agLanguage,	    ID1: agID1,	    ID2: agID2,		PoBox: agPoBox,		  PoBoxId: agPoBoxId,		Telephone: agTel,		  Website: agWebsite,		Email: reg_email,		  Status: "Pending",		Notes: agNotes	  }, {	    success: function(post) {			res.redirect("/clientSuccess");	    },	    error: function(post, error) {	      // The save failed.	      // error is a Parse.Error with an error code and message.	    }	  }); 	}};//peticion POST desde el formulario de shipper de agenciaexports.warehousepost = function(req, res){	if(!Parse.User.current()) 	{		res.redirect('/');	}	else	{			var query = new Parse.Query("Agencies");		query.descending('createdAt');		query.find(		{		success: 			function(results)			{				//variables que vienen por POST				var txt_shipper = req.body.txt_agency;								//en este arreglo almacenaremos el resultado				var resultsearch = [];								//recorrer la lista de objetos en el resultado				for (var i = 0; i < results.length; i++) 				{					var object = results[i];										//obtenemos el nombre de la agencia					var field = object.get("Name");										//minusculas 					field = field.toLowerCase();					txt_shipper = txt_shipper.toLowerCase();										//verificar si contiene el texto que buscamos					if(field.search(txt_shipper) != -1)					{						//agregar a la nueva lista de resultado						resultsearch.push(object);					}				}								res.send(JSON.stringify(resultsearch));			}		});				}	};//peticion POST para hacer busqueda de clientes usando AJAXexports.client_autofill = function(req, res){	if(!Parse.User.current()) 	{		res.redirect('/');	}	else	{			var query = new Parse.Query("Clients");		query.descending('createdAt');		query.find(		{		success: 			function(results)			{				//variables que vienen por POST				var txt_search = req.body.txt_search;								//en este arreglo almacenaremos el resultado				var resultsearch = [];								//recorrer la lista de objetos en el resultado				for (var i = 0; i < results.length; i++) 				{					var object = results[i];										//obtenemos el nombre de la agencia					var field = object.get("Name");										//minusculas 					field = field.toLowerCase();					txt_search = txt_search.toLowerCase();										//verificar si contiene el texto que buscamos					if(field.search(txt_search) != -1)					{						//agregar a la nueva lista de resultado						resultsearch.push(object);					}				}								res.send(JSON.stringify(resultsearch));			}		});				}	};// insert a new warehouseexports.addwarehousepost = function(req, res) {    var txt_receipt = req.body.txt_receipt;    var txt_receiptDate = req.body.txt_receiptDate;    var txt_agent = req.body.txt_agent;    var txt_shipper = req.body.txt_shipper;    var txt_consignee = req.body.txt_consignee;    var lst_transport = req.body.lst_transport;    var lst_warehouse = req.body.lst_warehouse;    var usrCountry = req.body.usrCountry;    var txt_prices = req.body.txt_prices;    var txt_extracost = req.body.txt_extracost;    var txt_weight = req.body.txt_weight;    var txt_invoice = req.body.txt_invoice;    var txt_weightvol = req.body.txt_weightvol;    var txt_value = req.body.txt_value;    var txt_volume = req.body.txt_volume;    var txt_zone = req.body.txt_zone;    var txt_content = req.body.txt_content;    var txt_generalnotes = req.body.txt_generalnotes;    var txt_internalnotes = req.body.txt_internalnotes;    	var clientID = req.body.txt_clientID;	var agencyID = req.body.agencyID;	    //extraccion de las cajas    var c=1;        var boxes = [];        do    {        boxes.push({                    'lenght':req.body["txt_length-" + c.toString()],                    'width':req.body["txt_width-" + c.toString()],                    'height':req.body["txt_height-" + c.toString()],                    'weight':req.body["txt_weight-" + c.toString()],                    'boxes':req.body["txt_boxes-" + c.toString()]});                c += 1;    }    while(typeof req.body["txt_length-" + c.toString()] != "undefined");        	//the data of the related objects	var Agency = Parse.Object.extend("Agencies");	var query = new Parse.Query(Agency);		query.get( agencyID , 	{		success: 			function(agency) 			{				// The object was retrieved successfully.																//the data of the related objects				var Clients = Parse.Object.extend("Clients");				var query2 = new Parse.Query(Clients);								query2.get( clientID , 				{					success: 						function(client) 						{							var WareHouse = Parse.Object.extend("WareHouse");							var warehouse = new WareHouse();														//save the agency as a relation							warehouse.set("Shipper", agency);																					//save the client as a relation							warehouse.set("Consignee", client);																											//Save warehouse							warehouse.save(							{								Receipt: txt_receipt,								ReceiptDate: txt_receiptDate,								Agent: txt_agent,								Transport: lst_transport,								Warehouse: lst_warehouse,								Country: usrCountry,								Prices: txt_prices,								ExtraCost: txt_extracost,								Weight: txt_weight,								Invoice: txt_invoice,								WeightVol: txt_weightvol,								Value: txt_value,								Volume: txt_volume,								Zone: txt_zone,								Content: txt_content,								GeneralNotes: txt_generalnotes,								InternalNotes: txt_internalnotes,                                Boxes: JSON.stringify(boxes)							  }, {								success: function(post) {									res.redirect("/labels");								},								error: function(post, error) {								  // The save failed.								  // error is a Parse.Error with an error code and message.								}							  }); 							  },						error: 	//error on query for Agencies by objectID							function(object, error) 							{								// The object was not retrieved successfully.								// error is a Parse.Error with an error code and message.															}					});			},		error: 	//error on query for Agencies by objectID			function(object, error) 			{				// The object was not retrieved successfully.				// error is a Parse.Error with an error code and message.							}	});	}	//SHOWS WAREHOUSE TABLEexports.labelsTable = function(req, res){	var usrClass = Parse.User.current().get("Class");		if(!Parse.User.current() || usrClass === "client")	{			res.redirect('/');	}	else	{			var queryWareHouse = new Parse.Query("WareHouse");		queryWareHouse.descending('createdAt');                //INCLUDE        queryWareHouse.include("Shipper");        queryWareHouse.include("Consignee");        		queryWareHouse.find().then(				function(results)				{		                    res.render('labelsTable.ejs', {labels: results});				}			);                            				}};//SHOWS WAREHOUSE OF CLIENTS VIEW FORM STAFF SESSION	exports.clientsWareHouse = function(req, res){		var client = req.params.clientID;	var usrClass = Parse.User.current().get("Class");		if(!Parse.User.current() || usrClass === "client"){			res.redirect('/');		}else{			var queryWareHouse = new Parse.Query("WareHouse");			queryWareHouse.equalTo("ClientID", client);			queryWareHouse.descending('createdAt');			queryWareHouse.find({				success: function(label){				  res.render('clientsWareHouse.ejs', {					  labels: label				  });				}			});	  }	};