jQuery(document).ready(function($) {
  $(document).on('input','input',function(){
      validate($(this));
  });
  let btn = document.getElementById('btn');
  function validate(that) {
    if (that.attr('type') == 'text') {
      console.log(222);
      if (that.val()) {
        that.removeClass('error').addClass('valid');
      } else {
        that.removeClass('valid').addClass('error');
      }
    } else if (that.attr('type') == 'email') {
      if (validateEmail(that.val()) === false) {
        that.removeClass('valid').addClass('error');
      } else {
        that.removeClass('error').addClass('valid');
      }
    } else if (that.attr('type') == 'tel') {
      if (that.intlTelInput("isValidNumber")) {
        that.removeClass('error').addClass('valid');
        btn.disabled = false;
      } else {
        that.removeClass('valid').addClass('error');
        btn.disabled = true;
      }
    }
  }

  function validateEmail(email) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(String(email).toLowerCase());
  }
  $('input[type="tel"]').each(function() {
      $( this ).intlTelInput({
          nationalMode: true,
          separateDialCode: true,
          initialCountry: "auto",
          autoPlaceholder: "aggressive",
          hiddenInput:"realPhone",
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
          geoIpLookup: function(success, failure) {
            $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
              countryCode = (resp && resp.country) ? resp.country : "CA";
              success(countryCode);
            });
          }
        });
    });

 
  $('.register-btn').on('click', function(e) {
    e.preventDefault();
    
    var form = $(this).parents('form');
    
    form.find('input').each(function() {
      validate($(this));
    })
    
   
    if (!form.find('.error').length) {
      let phone = $(form).find('input[type="tel"]').intlTelInput("getNumber");
      $(form).find('input[name ="realPhone"]').val(phone);
      form.submit();
    }
  })
  // }
});
