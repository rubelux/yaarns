trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
  };

  isNotEmpty = function(value) {
      if (value && value !== ''){
          return true;
      }
      Session.set('alert', 'Please fill in all required fields.');
      return false;
  };

  isEmail = function(value) {
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test(value)) {
          return true;
      }
      Session.set('alert', 'Please enter a valid email address.');
      return false;
  };

  isValidPassword = function(password) {
      if (password.length < 6) {
          Session.set('alert', 'Your password should be 6 characters or longer.');
          return false;
      }
      return true;
  };

  areValidPasswords = function(password, confirm) {
      if (!isValidPassword(password)) {
          return false;
      }
      if (password !== confirm) {
          Session.set('alert', 'Your two passwords are not equivalent.');
          return false;
      }
      return true;
  };

  //helpers login

  //helper to allow get the session get alert value
  Template.alert.helpers({
    alert: function() {
      return Session.get('alert');
    }
  });

  if (Accounts._resetPasswordToken) {
      Session.set('resetPassword', Accounts._resetPasswordToken);
  };
  //Template.registerHelper(name, function)
  //global template with users
  // Template.registerHelper(

  //   "activeUser",  function(){
  //     return Session.get('activeUse');
  //   }
  // )



  Template.userArea.helpers({
    
    activeUser:  function(){
      if(Meteor.userId() && Meteor.user()){
        console.log("Meteor.user().profile.mail");
        
        return Meteor.userId() && Meteor.user() && Meteor.user().profile ? Meteor.user().profile.name : "";
      }
     
    },
    showForgotPassword: function() {
        return Session.get('showForgotPassword');
    },

    showSignIn: function(){
      return Session.get('showSignIn');
    },

    userStoriesN: function(){
      console.log("from userStoriesN:::::::::::::: ")
      return Meteor.user() && Meteor.user().profile && Meteor.user().profile.stories && Meteor.user().profile.stories.length;

    },

    userWatchN:function(){
      return Meteor.user() && Meteor.user().profile && Meteor.user().profile.watches && Meteor.user().profile.watches.length;
    },

    userLikedN:function(){
      return Meteor.user() && Meteor.user().profile && Meteor.user().profile.likes && Meteor.user().profile.likes.length;
    },

    showLoginSelected:function(){
      return Session.get('showLogin');
    },

    currentHeight:function(){
      return Session.get('currentHeightWindow');  
    }
    
    
  });

  Template.userArea.events({
    // 'mouseenter #userMenuInnerCont': function(e, t){
    //     console.log('itm rolover');
    //     var _this = $(e.currentTarget);
    //     var formContainer = _this.find('#formsContainer');
    //     if(formContainer.hasClass('fadeOut')){
    //       formContainer.removeClass('fadeOut')
    //     };
    //     formContainer.addClass('fadeIn')
    //     return false;
    // },
    // 'mouseleave #userMenuInnerCont': function(e, t){
    //     console.log('itm rolover');
    //     var _this = $(e.currentTarget);
    //     var formContainer = _this.find('#formsContainer');
    //     if(formContainer.hasClass('fadeIn')){
    //       formContainer.removeClass('fadeIn')
    //     };  
    //     formContainer.addClass('fadeOut')
    //     return false;
    // }
  });  

  
  //TODO; need to understand why this helper only works in a standalong definition
  Template.userArea.helpers({
    resetPassword: function(){
      return Session.get('resetPassword');
    }
  });



  //Sign up helper
  Template.signUp.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            username = trimInput(signUpForm.find('#signUpName').val().toLowerCase()),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),
            password = signUpForm.find('#signUpPassword').val(),
            passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {
            Accounts.createUser({username: username, email: email, password: password, profile: { name: username }}, function(err) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                        Session.set('alert', 'We\'re sorry but this email is already used.');
                    } else {
                        Session.set('alert', 'We\'re sorry but something went wrong.');
                    }
                } else {
                    //Session.set('alert', 'Congrats! You\'re now a new Meteorite!');
                    Session.set('activeUse', email);
                }
            });
        }
        return false;
    },
    'click #showSignInBt': function(e, t) {
          console.log('its clicked');
          console.log(Session.get('showSignIn'));
          Session.set('showSignIn', true);
          return false;
    }
    
  });

  //AddpaddingG
Template.userArea.events({
  'click #userTitle': function(e, t){
    e.preventDefault();
    console.log(Meteor.user())
    Meteor.logout(function() {
        Session.set('alert', "bye bye " + Meteor.user());
    });
    return false;

  }
});  
  //sign out
  Template.signOut.events({
    'click #signOut': function(e, t) {
        Meteor.logout(function() {
            Session.set('alert', 'Bye Meteorite! Come back whenever you want!');
        });
        return false;
    }
  });

  //sign out
  Template.signIn.events({
    'submit #signInForm': function(e, t) {
        e.preventDefault();

        var signInForm = $(e.currentTarget),
            email = trimInput(signInForm.find('.email').val().toLowerCase()),
            password = signInForm.find('.password').val();

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                    Session.set('alert', 'We\'re sorry but these credentials are not valid.');
                } else {
                    //Sesson.set('alert', 'Welcome back New Meteorite!');
                    Session.set('activeUse', email);
                    console.log('yeaa')
                }
            });
        }
        return false;
    },
    'click #showForgotPassword': function(e, t) {
          Session.set('showForgotPassword', true);
          return false;
    },

    'click #showSignUpBt': function(e, t) {
          console.log('its clicked');
          console.log(Session.get('showSignIn'));
          Session.set('showSignIn', false);
          return false;
    }
  });


  //forgot password
  Template.forgotPassword.events({
    'submit #forgotPasswordForm': function(e, t) {
        e.preventDefault();

        var forgotPasswordForm = $(e.currentTarget),
            email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

        if (isNotEmpty(email) && isEmail(email)) {
            Accounts.forgotPassword({email: email}, function(err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        Session.set('alert', 'This email does not exist.');
                    } else {
                        Session.set('alert', 'We\'re sorry but something went wrong.');
                    }
                } else {
                    Session.set('alert', 'Email Sent. Please check your mailbox to reset your password.');
                }
            });
        }
        return false;
    },

    'click #returnToSignIn': function(e, t) {
        Session.set('showForgotPassword', null);
        return false;
    },
  });

  //reset password
  Template.resetPasswordTemplate.events({
    'submit #resetPasswordForm': function(e, t) {
        e.preventDefault();
        
        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

        if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
            Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
                if (err) {
                    Session.set('alert', {type: 'error', message: 'We\'re sorry but something went wrong.'});
                }
                else {
                    Session.set('alert', 'Your password has been changed. Welcome back!');
                    Session.set('resetPassword', null);
                    //Session.set('activeUse', email);
                }
            });
        }
        return false;
    }
  });