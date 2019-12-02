jQuery(document).ready(function() {

	jQuery(".submit_contact_btn").click(function() {

		//on focus
		jQuery("#contact_form .isrequired, #contact_form .isrequired").focus(function(){
			jQuery(this).removeClass('error');
		});
		
		//on blur
		jQuery("#contact_form .isrequired, #contact_form .isrequired").blur(function()
		{
			if(jQuery(this).val().trim() == '')
			{
				jQuery(this).addClass('error');
			} else {
				jQuery(this).removeClass('error');
			}
		});	
		
		if(jQuery("#firstname").val().trim() == '' || jQuery("#lastname").val().trim() == '' || jQuery("#phonenumber").val().trim() == '' || jQuery("#email").val().trim() == '' || jQuery("#message").val().trim() == '' )
		{
	
				jQuery("#notic_contact.alert").show();
				jQuery("#notic_contact.alert").addClass("alert-danger");
				jQuery("#notic_contact.alert").html("Please fill all mandatory fields"); 
			
				
			jQuery("#contact_form .isrequired" ).each(function() {	
					filedValue = jQuery(this).val().trim();
					if(filedValue == '')
					{
						jQuery(this).addClass('error');
					} else {
						jQuery(this).removeClass('error');
					}
				});
			jQuery("#phonenumber").on("keypress",function (event) {    
                    jQuery(this).val($(this).val().replace(/[^\d].+/, ""));
                    if ((event.which < 48 || event.which > 57)) {
                        event.preventDefault();
                    }
                    jQuery(this).addClass('error');
                });
		
		} else if (!ValidateEmail(jQuery("#email").val())) {
			
				jQuery("#notic_contact.alert").show();
				jQuery("#notic_contact.alert").addClass("alert-danger");
				jQuery("#notic_contact.alert").html("Please enter valid email address");
				jQuery("#email").addClass('error');

		
		} else {
			
			jQuery("#buy_book_form_loding").show();
			var formData = jQuery("#contact_form").serialize();

			
			jQuery.ajax({
					type:"POST",
					url: "contact_mail.php",
					 data: 		formData,
					
					 success:function(data) {
					 	//console.log(data);
						jQuery("#buy_book_form_loding").hide();
						jQuery("#contact_form")[0].reset();
					
						jQuery("#notic_contact.alert").show();
						jQuery("#notic_contact.alert").removeClass("alert-danger");
						jQuery("#notic_contact.alert").addClass("alert-success");
						jQuery("#notic_contact.alert").html("Thank You! Your message has been sent.");
						jQuery("#notic_contact.alert").fadeOut(5000);
			},
			error: function(errorThrown){
				console.log(errorThrown);
			}
			}); 
		}		
	});
});

function ValidateEmail(email) {
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return expr.test(email);
};