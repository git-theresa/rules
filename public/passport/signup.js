$(document).ready(function () {
    // Getting references to our form and input
    const signUpForm = $('form.signup');
    const emailInput = $('input#email-input');
    const passwordInput = $('input#password-input');

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on('submit', function (event) {
        event.preventDefault();
       let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.email, userData.password);
        emailInput.val('');
        passwordInput.val('');
    });

    // Does a post to the signup route
    function signUpUser(email, password) {
        $.post('/api/signup', {
            email: email,
            password: password
        })
            .then(function (data) {
                window.location.replace('/member');
                console.log('signedup');
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $('#alert .msg').text(err.responseJSON);
        $('#alert').fadeIn(500);
    }
});
