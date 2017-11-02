$(document).ready(function() {
	$('#newsletter-form').submit(function() {
		var buttonCopy = $('#newsletter-form button').html(),
		errorMessage = $('#newsletter-form button').data('error-message'),
		
		hasError = false;
		$('#newsletter-form .error-message').remove();
		$('#newsletter-form .requiredField').each(function() {
			$(this).removeClass('inputError');
			if($.trim($(this).val()) == '') {
				var errorText = $(this).data('error-empty');
				$(this).parents('.myform').prepend('<span class="error-message" style="display:none;">'+errorText+'.</span>').find('.error-message').fadeIn('fast');
				$(this).addClass('inputError');
				hasError = true;
			} 			
		});
		
		if(hasError) {
			$('#newsletter-form button').html(errorMessage).addClass('btn-error');
			
			setTimeout(function(){
				$('#newsletter-form button').removeClass('btn-error').html(buttonCopy);
				
			},2000);
		}else {
			
		}
		return false;	
	});

	highScore=localStorage.getItem('highScore')||0;
	console.log('Scorre'+highScore);
	document.getElementById('highScoreValue').innerText=parseInt(highScore);
	
});
	
	document.getElementById("playButton").onclick=function(){	
		var name=document.getElementById("newsletter-mail").value;	
		if(name!= ""){
			$('body').css('display', 'none');
			$('body').fadeIn(1000);
			localStorage.setItem('userName',document.getElementById('newsletter-mail').value);
			window.location.href="html/index.html";
}
	
	};
	

	