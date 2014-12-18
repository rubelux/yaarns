//TODO this resize is called to many times

Session.set('currentHeightWindow', 0);

  function resize(root, _window){
      console.log('resizeeeee called')
      var windowHeight = _window.outerHeight(true);
      var windowWidth = _window.outerWidth(true);
      var appMenu = root.find('#appMenuExterCont');
      var userMenu = root.find('#userMenuInnerCont');
      var storyMenu = root.find('.storyAreaInner');

      if(appMenu){
        $(appMenu).css({'height': windowHeight })
      }

      if(userMenu){
        $(userMenu).css({'height': windowHeight })
      }

      if(storyMenu){
        $(storyMenu).css({'width': windowWidth-86 }) 
      }  



      Session.set('currentHeightWindow', windowHeight);
  }




Session.setDefault("counter", 0);

  
storiesGeneral = new Mongo.Collection("Stories");
Subjects = new Mongo.Collection("Subjects");

 Meteor.subscribe("storiesGeneral");


  //login registration

  Router.configure({
   layoutTemplate: 'home',
    loadingTemplate: 'loading'
    
  });



  Router.map(function(){
   
    this.route('storyOverview', {
        waitOn: function () {
          return Meteor.subscribe('storiesGeneral');
        },
        path: '/',
        data: function(){
          
          if(Meteor.userId()){

            var currentUserId = Meteor.userId();

            console.log("hey")

            var storiesData = storiesGeneral.find(
                { creator: currentUserId},
                { sort: { name: 1}}
              );

          }else{
            var storiesData = storiesGeneral.find(); 
            
          }

          var stories = storiesData.fetch();
          var storiesValidForHome = [];
          var counter= 0;
          for(var i=0; i<stories.length; i++){


             console.log(stories[i]);
             if(stories[i].content.length === 0){
              continue;
             };
             counter++;

             console.log(i)
             if(counter>6){
              break;
             }

             
            //check if it is a valid date
            var date = "";

            if(stories[i].date && Object.prototype.toString.call(stories[i].date) === "[object Date]"){
            
              date +=  stories[i].date.getUTCDate() +'/';
              date += stories[i].date.getUTCMonth() + 1 +'/'; //months from 1-12
              date += stories[i].date.getUTCFullYear();
  
            }
            
            var _tempStory = {
              title: stories[i].title,
              date: date,
              gender : stories[i].gender,
              link: stories[i].title.replace(/ /g,"-"),
              _id: stories[i]._id
             };

             //_tempStory.extraSize = (i=== 3) ? 'doubleHight' : "";

              //check if there a file for cover
              var re = new RegExp("^(http|https)://", "i");
              var match = re.test(stories[i].content[0].content);

             if(match){
              _tempStory.cover = stories[i].content[0].content;

             }else{
              _tempStory.bg_color = "#ff7188";
             }
             
             storiesValidForHome.push(_tempStory);
             
          }
          Session.set('StoriesDisplayed', counter);
          return storiesValidForHome;
         
        }
    });

      this.route('storyDetails', {
         path: '/story/:title',

          waitOn: function () {
            return Meteor.subscribe('storiesGeneral');
         },
         data: function(){
            //stories[i].title.replace(/ /g,"-"),
            var currentStoryTitle = this.params.title.replace(/-/g," ");
            
            var story = {
              storyTitle: currentStoryTitle
              // isAuthorLogged:
            };  

            // Meteor.subscribe("storiesGeneral");
            var currentStory = storiesGeneral.find({ title : currentStoryTitle }).fetch();
          
            if(currentStory[0]){
              Session.set('currentStorySubjectsItems', currentStory[0].content);  

               if(currentStory[0].creator === Meteor.userId()){
                
                story.isAuthorLogged =  true;
              }else{
                console.log('its not the same  ')
              }

              return story;
            }

            

            //
   
           

            

            
            
      }
    });
    
  });

  Router.onBeforeAction('loading');

  Template.home.rendered = function(){
        
        var _window = $( window );
        var root = this;
        
        resize(root, _window);

         _window.resize(function() {
            resize(root, _window);
         
         }) 
  }

  Template.home.helpers({

    addSubjectHelper : function(){
        console.log('from template home')
        console.log(Session.get('addSubjectWindow'))
        return Session.get('addSubjectWindow');
    }

  })

  