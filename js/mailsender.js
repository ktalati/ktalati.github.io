$(document).ready(function() {
	$('#contact-form').submit(function() {
		var buttonWidth=$('#contact-form button').width();
		
		var buttonCopy = $('#contact-form button').html(),
			errorMessage = $('#contact-form button').data('error-message'),
			sendingMessage = $('#contact-form button').data('sending-message'),
			okMessage = $('#contact-form button').data('ok-message'),
			hasError = false;
		
		$('#contact-form button').width(buttonWidth);
		$('#contact-form .error-message').remove();
		
		$('.requiredField').each(function() {
			if($.trim($(this).val()) == '') {
				var errorText = $(this).data('error-empty');
				$(this).parent().append('<span class="error-message">'+errorText+'.</span>');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).is("input[type='email']") || $(this).attr('name')==='email') {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					var invalidEmail = $(this).data('error-invalid');
					$(this).parent().append('<span class="error-message">'+invalidEmail+'.</span>');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});
		
		if(hasError) {
			$('#contact-form button').html('<i class="icon-remove"></i>'+errorMessage);
			setTimeout(function(){
				$('#contact-form button').html(buttonCopy);
				$('#contact-form button').width('auto');
			},2000);
		}
		else {
			$('#contact-form button').html('<i class="icon-refresh icon-spin"></i>'+sendingMessage);
			
			var formInput = $(this).serialize();
			
			
			$.ajax({
			  type: "POST",
			  url: "https://mandrillapp.com/api/1.0/messages/send.json",
			  data: {
				'key': '_QlDRoLJBIoooCjkWs-0Kw',
				'message': {
				  'from_email': 'talati004@gmail.com',
				  'to': [
					  {
						'email': 'talati004@gmail.com',
						'name': $('#contact-name').val(),
						'type': 'to'
					  }
					],
				  'autotext': 'true',
				  'subject': 'Website : Sender : '+$('#contact-mail').val(),
				  'html': $('#contact-message').val()
				}
				}
			}).done(function(response) {
			   $('#contact-form button').html('<i class="icon-ok"></i>'+okMessage);
				setTimeout(function(){
					$('#contact-form button').html(buttonCopy);
					$('#contact-form button').width('auto');
				},2000);
			 });
		}
		
		return false;	
	});
});