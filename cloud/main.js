//BY NEURONS ART AND TECHNOLOGY ALL RIGHTS RESERVED AND COPYRIGHTED.
//IN ASSOCIATION WITH LC CARGO XPRESS LOS ANGELES
//SISTEM PLANIFICATION BY LC CARGO XPRESS
//AUTHORS: SUI GENERIS / OSCAR ALCANTARA

require('cloud/app.js');

// CANCEL RESERVATION
Parse.Cloud.define("cReservation", function(request, response) {
	Parse.Cloud.useMasterKey();
  var queryReservation = new Parse.Query("Reservations");
  queryReservation.equalTo("objectId", request.params.reservationId);
  queryReservation.first({
           success: function (Contact) {
           Contact.save(null, {
           success: function (contact) {
           contact.set("Status", "Cancelled");
		   contact.set("Icon", "/web/img/icons/cancel1.png");
		   contact.set("Status2", "/web/img/icons/refresh.png");
		   contact.save();
           response.success("works");
                    }
                   });
			     }
                          });
});


// CANCEL RESERVATION
Parse.Cloud.define("rReservation", function(request, response) {
	Parse.Cloud.useMasterKey();
  var queryReservation = new Parse.Query("Reservations");
  queryReservation.equalTo("objectId", request.params.reservationId);
  queryReservation.first({
           success: function (Contact) {
           Contact.save(null, {
           success: function (contact) {
           contact.set("Status", "Pending");
		   contact.set("Icon", "/web/img/icons/waiting.png");
		   contact.set("Status2", "/web/img/icons/cancel1.png");
		   contact.save();
           response.success("works");
                    }
                   });
			     }
                    });
           });
		   
		   
// CANCEL RESERVATION
 Parse.Cloud.define("tConfirmation", function(request, response) {
 	Parse.Cloud.useMasterKey();
	 var queryReservation = new Parse.Query("Reservations");
     queryReservation.equalTo("objectId", request.params.reservationId);
     queryReservation.first({
		 success: function (Contact) {
		    Contact.save(null, {
		    success: function (contact) {
		    contact.set("Status", "Confirmed");
		    contact.set("Icon", "/web/img/icons/confirmed.png");
		    contact.save();
		    response.success("works");
		              }
		          });
		   			  }
		                });
		              });
					  
