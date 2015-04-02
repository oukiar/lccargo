//BY NEURONS ART AND TECHNOLOGY ALL RIGHTS RESERVED AND COPYRIGHTED.
//IN ASSOCIATION WITH LC CARGO XPRESS LOS ANGELES
//SISTEM PLANIFICATION BY LC CARGO XPRESS
//AUTHORS: SUI GENERIS / OSCAR ALCANTARA

// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var parseExpressCookieSession = require('parse-express-cookie-session');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var app = express();
var routes = require('cloud/routes');


// Global app configuration section
app.set('views', 'cloud/views'); // Specify the folder to find templates
app.set('view engine', 'ejs');  // Set the template engine
app.use(express.bodyParser()); // Middleware for reading request body
app.use(parseExpressHttpsRedirect());// Automatically redirect non-secure urls to secure ones
app.use(express.methodOverride());
app.use(express.cookieParser('NeuronsAndLCcargo'));
app.use(parseExpressCookieSession({
  fetchUser: true,
  key: 'image.sess',
  cookie: {
    maxAge: 3600000 * 24 * 30
  }
}));

//This is an example of hooking up a request handler with a specific request
//path and HTTP verb using the Express routing API.
app.get('/', routes.login);
app.get('/login', routes.login);
app.post('/logins', routes.logins);
//Directs to sign up page
app.get('/signup', routes.signup);
app.get('/logout', routes.logout);
app.get('/settings', routes.Settings);
//delete Staff
//app.get('/deleteStaff:staffId', routes.deleteStaff);
//directs to the corresponding profile -STAFF-CLIENT -AGENCY
app.get('/profile', routes.profile);

//---AGENCIES SECTION---
//agency registration POST
app.post('/agency_registration', routes.agencyReg);
app.post('/addAgency', routes.addAgency);
//Show agency warehouse in their agegencies Profile
app.get('/ag_labels', routes.ag_labels);
//----CLIENTS SECTION---
app.post('/addClient', routes.addClient);
app.get('/clientSuccess', routes.clientSuccess);
//client registration post
app.post('/client_registration', routes.clientReg);
//hotel reservations client's side
app.get('/reserveHotel', routes.reserveHotel);
//reserve Trip
app.post('/reserveHotel', routes.reservation);
//Show clients warehouse in their clients Profile
app.get('/cl_warehouse', routes.cl_warehouse);
//Filter for clients warehouse view from Staff session
app.post('/postClientwarehouseStaff', routes.postClientsWarehouseStaff );

//----STAFF SECTION---
//To create a Staff Member
app.post('/createStaff', routes.createStaff);
//STAFF CONTROL AND VISION OF CLIENTS
//pending clients table
app.get('/clients', routes.clients);
//filter
app.post('/clients', routes.clientspost);
//active clients table 
app.get('/mainclients', routes.mainclients);
//filter
app.post('/mainclients', routes.mainclientspost);
//See clients reservations
app.get('/reservations', routes.reservations);
app.post('/reservations', routes.reservationspost);
//Displays full trip reservation
app.get('/trip/:tripId', routes.tripInfo);
//View trip from Client's profile
app.get('/cl_trip/:tripId', routes.cl_tripInfo);
//Show specific client's reservations in his profile
app.get('/cl_reserv/:clientID', routes.reserv);
app.post('/cl_reserv', routes.reservpost);
//active agencies table
app.get('/agencies', routes.mainAgencies);
//pending agencies table
app.get('/pagencies', routes.pendingAgencies);
//visit agency profile
app.get('/agency/:agencyId', routes.agencyProfile)
//WAREHOUSE SECTION
//new label
app.get('/labels', routes.labels);
app.get('/viewLabel/:labelId', routes.viewLabel);
//--Create consolidate
app.get('/createConsolidate', routes.createConsolidate);
app.get('/wareConsolidate', routes.wareConsolidate);
//autofill request
app.post('/warehouse', routes.warehousepost);
//See client warehouse
app.get('/clientsWareHouse/:clientID', routes.clientsWareHouse);
app.get('/ag_warehouse/:agencyID', routes.agencyWareHouse);
app.post('/client_autofill', routes.client_autofill);
//save new warehouse label
app.post('/addwarehouse', routes.addwarehousepost);
//warehouse receipts table
app.get('/labelsTable', routes.labelsTable);
app.post('/labelsFilter', routes.labelsFilter);
//open label in a new window
app.get('/newLabel/:myparam', routes.newLabel);
app.get('/staff/:staffId', routes.staffInfo);
app.get('*', routes.clientProfile);

app.listen();
