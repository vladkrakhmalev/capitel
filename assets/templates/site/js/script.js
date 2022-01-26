function validEmail(el) {
    var re = /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/;
    var valid = re.test(el);
    return valid;
}

function validate(target) {
	var form = target.closest('form');
    var submit = true;

    if (form.length) {
        form.find('.required').each(function() {
            var input = $(this),
                name = input.attr('name');

            if (!input.val().replace(/\s/g, '') || input.val() === 'undefined') {
                submit = false;
                input.addClass('uk-form-danger');
            } else {
                switch (name) {
                    case 'email':
                        var check = validEmail(input.val());

                        if (check === false) {
                            submit = false;
                            input.addClass('uk-form-danger');
                        }
                        break;
                    case 'agree':
                        if(!input.prop('checked') === true) {
                            submit = false;

                            input.addClass('uk-form-danger');
                        }
                    break;
                }
            }
        });
    }

    return submit;
}

function clearForm(form) {
    $('.uk-input', form).val('');
	$('.uk-textarea', form).val('').text('');
	$('.uk-select', form).prop('selectedIndex', 0);
}


$(document).ready(function() {

	/*
	mask
	*/

	$('.mask-phone').mask('+7 (999) 999-99-99');

	/*
	submit
	*/

	$('body').on('click', '.btn-submit', function(e) {
        e.preventDefault();

        var target = $(e.target);
		var form   = target.closest('form');
		btn  = $(this);

		//
		if(!btn.attr('data-value'))
		{
			btn.attr('data-value', btn.text());
		}


        $('.uk-input, .uk-textarea', form).removeClass('uk-form-danger');

        var submit = validate(target);

        if (submit === true) {
            var data = form.serialize();

			//debug
			alert(data);
			clearForm(form);
        }
    });

	//
	$('body').on('focus', '.uk-form-danger', function() {
	  $(this).removeClass('uk-form-danger');
	});

	/*
	nav
	*/

	$('.nav ul').before('<a href="#" class="burger"></a>');

	$('.nav .burger').click(function(){
		if($(this).hasClass('active'))
		{
			$(this).removeClass('active');
			$('.nav ul').hide();
		}
		else
		{
			$(this).addClass('active');
			$('.nav ul').show();
		}

		return false;
	});




    $('.product_slider img').click(function(){
        let src = $(this).attr('src');
        $('.main-photo img').attr('src', src)
    });
});
