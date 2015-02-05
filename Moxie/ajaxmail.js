 /*
Created 09/27/09										
Questions/Comments: jorenrapini@gmail.com						
COPYRIGHT NOTICE		
Copyright 2009 Joren Rapini
*/
$(document).ready(function(){
	// Place ID's of all required fields here.
	required = ["name", "email", "subject"];
	// If using an ID other than #email or #error then replace it here
	email = $("#email");
	errornotice = $("#error");
	// The text to show up within a field when it is incorrect
	emptyerror = "Please fill out this field.";
	emailerror = "Please enter a valid e-mail.";

	$("#myform").submit(function(){	
		//Validate required fields
		for (i=0;i<required.length;i++) {
			var input = $('#'+required[i]);
			if ((input.val() == "") || (input.val() == emptyerror)) {
				input.addClass("needsfilled");
				input.val(emptyerror);
				errornotice.fadeIn(750);
			} else {
				input.removeClass("needsfilled");
			}
		}
		// Validate the e-mail.
		if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
			email.addClass("needsfilled");
			email.val(emailerror);
		}

		//if any inputs on the page have the class 'needsfilled' the form will not submit
		if ($(":input").hasClass("needsfilled")) {
			return false;
		} else {
			errornotice.hide();
    		var name = $("#name").val();
    		var mail = $("#email").val();
    		var subject = $("#subject").val();
    		var text = $("#message").val();
			var datastr ='name=' + name + '&mail=' + mail + '&subject=' + subject + '&text=' + text;
			$("#response").css("display", "block");
			$("#response").html("Sending message .... ");
			$("#response").fadeIn("slow");
			setTimeout("send('"+datastr+"')",2000);
			return true;
		}
	});
	
	//send form thank u
	    $("#myform").submit(function() {
		      $("#thankyou").append()
      return false;
    });

	
	// Clears any fields in the form when the user clicks on them
	$(":input").focus(function(){		
	   if ($(this).hasClass("needsfilled") ) {
			$(this).val("");
			$(this).removeClass("needsfilled");
	   }
	});
});	




 
 
/* $(document).ready(function(){
	$("#sendmail").click(function(){
		var valid = '';
		var isr = ' is required.';
		var name = $("#name").val();
		var mail = $("#email").val();
		var subject = $("#subject").val();
		var text = $("#message").val();
		if (name.length<1) {
			valid += '<br />Name'+isr;
		}
		if (!mail.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
			valid += '<br />A valid Email'+isr;
		}
		if (subject.length<1) {
			valid += '<br />Subject'+isr;
		}
		if (text.length<1) {
			valid += '<br />Text'+isr;
		}
		if (valid!='') {
			$("#response").fadeIn("slow");
			$("#response").html("Error:"+valid);
		}
		else {
			var datastr ='name=' + name + '&mail=' + mail + '&subject=' + subject + '&text=' + text;
			$("#response").css("display", "block");
			$("#response").html("Sending message .... ");
			$("#response").fadeIn("slow");
			setTimeout("send('"+datastr+"')",2000);
		}
		return false;
	});
});*/
function send(datastr){
	$.ajax({	
		type: "POST",
		url: "mail.php",
		data: datastr,
		cache: false,
		success: function(html){
		$("#response").fadeIn("slow");
		$("#response").html(html);
		setTimeout('$("#response").fadeOut("slow")',15000);
	}
	});
}
