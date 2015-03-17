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
app.post('/client_registration', routes.clientReg);
app.post('/addClient', routes.addClient);
app.get('/clientSuccess', routes.clientSuccess);
app.get('/signup', routes.signup);
app.get('/logout', routes.logout);
//Staff's Profile
app.get('/profile', routes.profile);
app.get('/reserveHotel', routes.reserveHotel);
//reserve Trip
app.post('/reserveHotel', routes.reservation);
//See clients reservations
app.get('/reservations', routes.reservations);
app.get('/clients', routes.clients);
app.get('/mainclients', routes.mainclients);
//Show client's reservation in his profile
app.get('/cl_reserv/:clientID', routes.reserv);
app.get('/labels', routes.labels);
app.get('/labelsTable', routes.labelsTable);
app.get('/newLabel', routes.newLabel);
app.get('/trip/:tripId', routes.tripInfo);
app.get('*', routes.clientProfile);


app.listen();
