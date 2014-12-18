//APP:::::::::::::::::::::  
Session.set('showLogin', false);
Session.set('writeStory', false);

  Template.createStory.helpers({
    writeStory: function(){
      return Session.get('writeStory')
    }

  })

  Template.createStory.events({

        'submit #addStoryForm' : function(event, t){

        event.preventDefault();

          var currentUserId = Meteor.userId();
          var addStoryForm = $(event.currentTarget);
          var title = addStoryForm.find('#title').val().toLowerCase();
          var gender = addStoryForm.find('#gender').val();
          var restricted = addStoryForm.find('#restricted').val();

          var story = {
              title : title,
              gender : gender,
              restricted : restricted,
              content : [],
              creator : currentUserId,
              date: new Date()
          };
          
          console.log("story");
          console.log(story);



          // var currentStoryId = storiesGeneral.insert(story);

          Meteor.call('createStory', story, function(error, _story){

              if(error){
                return
              };

              Session.set('writeStory', false);
              

              Meteor.call("updateUserStories", _story, function(error, docs){
                if(error){
                    console.log("error "+ error.message);
                }
                console.log("Meteor.user.profile")
                console.log(Meteor.user().profile)
                Router.go('/story/'+ story.title.replace(/ /g,"-")); //redirect to storys//
      
              });
              //activate content view createStory
              

              
          });

        return false;   
    }

  });

  Template.appArea.events({
    //create story//
    'click #createStoryBt' : function(event, t){
        
        Session.set('writeStory', true);
        return false;
    },
    'click #createStoryCloseBt': function(event, t){
        
        console.log('click close story');
        Session.set('writeStory', false);
    
        return false;
    },

    //login//
    'click #loginbt': function(event, t){
      var loginBt = $(event.currentTarget);
      loginDivIcon = loginBt.find('.icon');

      console.log('Im loginbt and selected ')

      var showLogin = Session.get('showLogin');
      

      if(loginDivIcon.hasClass('icon-right')){
        loginDivIcon.removeClass('icon-right')
               .addClass('icon-close')
      }else{
        loginDivIcon.removeClass('icon-close')
               .addClass('icon-right')
      }


      Session.set('showLogin', showLogin ? false : true);

      
      




      return false;
    }  

  })  