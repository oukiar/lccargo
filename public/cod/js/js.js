//FORM CLIENT REGISTRATION VALIDATION
function valRegClient() {
   var vusrFullName = document.forms["regClientform"]["usrFullName"].value;
   var vusrCompany = document.forms["regClientform"]["usrCompany"].value;
   var vusrCountry = document.forms["regClientform"]["usrCountry"].value;
   var vusrState = document.forms["regClientform"]["usrState"].value;
   var vusrCity = document.forms["regClientform"]["usrCity"].value;
   var vusrAddress = document.forms["regClientform"]["usrAddress"].value;
   var vusrID1 = document.forms["regClientform"]["usrID1"].value;
   var vusrTel = document.forms["regClientform"]["usrTel"].value;
   var vreg_email = document.forms["regClientform"]["usrEmail"].value;
   var atpos = vreg_email.indexOf("@");
   var dotpos = vreg_email.lastIndexOf(".");
   
   if( vusrFullName == null || vusrFullName == "") {
	 sweetAlert("Oops...","Please tell us your name!", "error");
        return false;
    } else if (vusrFullName.length < 2) {
	   sweetAlert("Oops...", "Full name too short!", "error");
        return false;
  }else if (vreg_email == null || vreg_email == "") {
	  sweetAlert("Oops...", "Email must be filled out!", "error");
        return false;
  } else if (atpos < 1 || ( dotpos - atpos < 2 )) {
	  sweetAlert("Oops...", "Invalid Email!", "error");
        return false;
  } else if (vusrCompany == null || vusrCompany == "") {
	  sweetAlert("Oops...", "Empty company!", "error");
        return false;
    } else if (vusrState == null || vusrState == "") {
	 sweetAlert("Oops...", "Empty State!");
        return false;
    } else if (vusrCity == null || vusrCity == "") {
	  sweetAlert("Oops...", "Empty City!", "error");
        return false;
    } else if (vusrAddress == null || vusrAddress == "") {
	 sweetAlert("Oops...", "Empty Address!");	
        return false;
    } else if(vusrID1 == null || vusrID1 == ""){
   	 sweetAlert("Oops...", "Empty ID1!", "error");	
           return false;
    }else if(vusrTel == null || vusrTel == ""){
   	 sweetAlert("Oops...", "Empty Telephone number!", "error");	
           return false;
        }	
      }
	  
	
	  function track(){
	    swal({title: "Sweet!",   
		  text: "Here's a custom image.",   
		  imageUrl: "images/thumbs-up.jpg" });
	         };
	 
	 //Cancel the trip
	  function Pending(reservationId){
	   	swal({title: "Trip Cancelation!",   
	   	 text: "Are you sure you want to cancel?",
		  confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, cancel it!",
		  showCancelButton: true },
		  
	 	 function(){
	 Parse.initialize("XEPryFHrd5Tztu45du5Z3kpqxDsweaP1Q0lt8JOb", "MDhb1hBngr2tx2v9TjyzoUhMcOFeWGJ56TWvChqi");
	 		  Parse.Cloud.run('cReservation', { reservationId: reservationId}, {
	 		    success: function() {
					location.reload();
	 		    },
	 		    error: function() {
	 		    }
	 		  });
	 	  });
	 	  	  }
			  
	 //Cancel the trip
	 function ConfirmedD(reservationId){
	 	swal({title: "Trip Cancelation!",   
		 text: "Are you sure you want to cancel?",
		 confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, cancel it!",
		 showCancelButton: true },
			function(){
		 Parse.initialize("XEPryFHrd5Tztu45du5Z3kpqxDsweaP1Q0lt8JOb", "MDhb1hBngr2tx2v9TjyzoUhMcOFeWGJ56TWvChqi");
	     Parse.Cloud.run('cReservation', { reservationId: reservationId}, {
			success: function() {
			location.reload();
			  },
			   error: function() {
			 		    }
			 		  });
			 	  });
			 	  	  }
			  
			  
 //Reschedule the trip
		 function CancelledD(reservationId){
		
	   	swal({title: "Re-Plan your trip!",   
		  	 text: "Do you want to reschedule?",
		     confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, reschedule!",
		     showCancelButton: true },
			 	 function(){
			 Parse.initialize("XEPryFHrd5Tztu45du5Z3kpqxDsweaP1Q0lt8JOb", "MDhb1hBngr2tx2v9TjyzoUhMcOFeWGJ56TWvChqi");
			 Parse.Cloud.run('rReservation', { reservationId: reservationId}, {
			 success: function() {
			 location.reload();
			 		 },
			 error: function() {
			 		    }
			 		  });
			 	  });
			 	  	  }


//Confirm Trip
	function PendingC(reservationId){
 	 swal({title: "Trip Confirmation",   
	   	 text: "The client will be notified of the confirmation!",
		 confirmButtonColor: "#DD6B55",   confirmButtonText: "Confirm!",
		 showCancelButton: true },
		 function(){
		 Parse.initialize("XEPryFHrd5Tztu45du5Z3kpqxDsweaP1Q0lt8JOb", "MDhb1hBngr2tx2v9TjyzoUhMcOFeWGJ56TWvChqi");
		 Parse.Cloud.run('tConfirmation', { reservationId: reservationId}, {
		 success: function() {
		 location.reload();
					   },
	     error: function() {
					    }
					  });
					 });
			 	  	  }
					  
					  
//Trip Already Confirmed
function ConfirmedC(reservationId){
	swal({title: "Confirmation",   
		 text: "Trip already confirmed!",
		 confirmButtonColor: "#DD6B55",   confirmButtonText: "Ok!",
	showCancelButton: false });
}
	  
	  
//Trip Canceled, please reactivate to confirm
function CancelledC(reservationId){
	swal({title: "Cancelled!",   
		 text: "Please reschedule to confirm!",
		 confirmButtonColor: "#DD6B55",   confirmButtonText: "Ok!",
	showCancelButton: false });
}


	  
	  