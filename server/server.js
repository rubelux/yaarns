 storiesGeneral = new Mongo.Collection("Stories");

 S3.config = {
    key: 'AKIAJ4KMQDLHMHU6RDSA',
    secret: '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',
    bucket: 'yaarns'
};

Meteor.startup(function () {

    
    Meteor.publish("storiesGeneral", function () {
      return storiesGeneral.find({});
    });
    process.env.MAIL_URL = 'smtp://yaarnsnews:yaarnsemail14@smtp.gmail.com:25';
    

});

    // Meteor.publish('storiesGeneral', function(){
    //   return  storiesGeneral.find();
    // });


    Meteor.methods({
      addSubjectToStory: function(currentStoryTitle, testSubject){
        console.log(currentStoryTitle)
        storiesGeneral.update(
          {"title" : currentStoryTitle}, 
          {$addToSet:  {"content": testSubject} }, //update array just when value is not in it

          function(error, id){
             if(error){
                throw new Meteor.Error(500, error.message);
              }else{
                console.log('its updated' )
                return "Update Successful";
              }
          });

      },
      createStory: function(storyData){
        //note: need to return a value from insert to home
        var result = storiesGeneral.insert(storyData, function(error, story){
             console.log("story from server")
            console.log(story)

            if(error){
              throw new Meteor.Error(500, error.message);
            }else{
              return story;
            }

        });

        return result;
      },

      userFeed:function(nothing){
        var currentUserId = this.userId;

        console.log(this.userId)

        var storiesfromCurrentUserData = storiesGeneral.find(
          { creator: currentUserId},
          { sort: { name: 1}}
          ).fetch();
        
        return storiesfromCurrentUserData;
      },

      getStoryContent:function(id){
        var currentStory = storiesGeneral.find({ _id : id }).fetch();
        
        return currentStory[0].content;
      },

      //check if the author is active user or collaborator to allow add more subjects
      checkAuthorLogged:function(storyTitle){
        console.log(storyTitle);
        //Meteor.userId()
        story = storiesGeneral.findOne({ "title" : storyTitle })
        if(story){
          //check creator with current logged user
          return story.creator === Meteor.userId();
          //TODO check user against collaborators 
        }
        
      },

      //USER

      updateUserStories:function(storyId){
          
          Meteor.users.update(
           
            {_id: Meteor.userId() },
            {$addToSet:  {"profile.stories": storyId} },

            function(error, id){
             if(error){
              throw new Meteor.Error(500, error.message);
            }else{
              console.log(id  +' user stories updated ' )
              return "Update Successful";
            }
          })
      },

      updateUserWatches:function(storyId){
          console.log(storyId)
          Meteor.users.update(
           
            {_id: Meteor.userId() },
            {$addToSet:  {"profile.watches": storyId} },

            function(error, id){
             if(error){
              throw new Meteor.Error(500, error.message);
            }else{
              console.log(id  +' user watches updated ' )
              return "Update Successful";
            }
          })
      },

      updateUserLikes:function(storyId){
          console.log(storyId)
          Meteor.users.update(
           
            {_id: Meteor.userId() },
            {$addToSet:  {"profile.likes": storyId} },

            function(error, id){
             if(error){
              throw new Meteor.Error(500, error.message);
            }else{
              console.log(id  +'  user likes updated ' )
              return "Update Successful";
            }
          })
      },

      getUserDetails:function(userId){
        return Meteor.users.findOne({_id :userId });
      } 

    })  


