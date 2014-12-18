//Content:::::::::::::::::::::
  var container = {};
  Session.set('createStory', null);
  var storyHeight = 86*3;
  var storyWidth = 86*3.5;


  // Meteor.startup(function() {
  //    $('head').append('<script src="/isotope.pkgd.min.js"></script>');
  //    $('head').append('<script src="/masonry-horizontal.js"></script>');
  // });

  
  
//content template details
Session.set('textType', true);

Template.storyOverview.events({
    "click .storyOverviewC .discover": function(event, template){
        console.log('Im here click');
        
        if(! this.link){
          console.log('non link');
          return; 
        }

        Router.go('/story/'+ this.link); //redirect to storys//  
        
        

    },

    "click .storyOverviewC .watch": function(event, template){
        
        //add story to the watch user profile
        
        console.log(this)
        Meteor.call("updateUserWatches", this._id, function(error, docs){
            
            if(error){
                console.log("error "+ error.message);
            }
            //chage icon          
        });

    },

    "click .storyOverviewC .like": function(event, template){
        console.log('Im here click');
        
        //add story to the watch user profile
        //chage icon
         Meteor.call("updateUserLikes", this._id, function(error, docs){
            
            if(error){
                console.log("error "+ error.message);
            }
            //chage icon      
        });

    },


    // "mouseenter .storyOverviewC": function(){

    //     console.log('Im here')
        

    // }  
});


function fitToScreen(element, widthTo, heightTo, limitWith, limitHeight){

    var cssToChange = {};

    
    element.css({
      width: widthTo<limitWith ?   limitWith :widthTo,
      height: heightTo<limitHeight ? limitHeight : heightTo 
    });

}

//TODO: this could be move to the home resize function
Template.storyDetails.rendered = function(){

  var container = $('#container');
  var _window = $( window );
  //

  function updateStory(){
    container.find('#containerSub').css({
      height: _window.outerHeight()
    })

    container.find('#container_sub').css({
      height: _window.outerHeight()
    })
  
  };

   _window.resize(function() {
      updateStory();
   }); 

  updateStory();

};  

//TODO: this could be move to the home resize function
Template.storyOverview.rendered = function(){

    // var storyNumber = Session.get('StoriesDisplayed');

    var container = $('#container');
    var items = $('.storyOverviewC');
    var margin = 86;
    var minimunWidthContainer = 250;
    var minimunHeightContainer = 200;
    var unitGrid = 3;

    var _window = $( window );
    // console.log(_window.width() - margin);

    // console.log('_window.height() ===  '   + _window.outerHeight(true) )

    fitToScreen(container, _window.width()-margin, _window.outerHeight(), minimunWidthContainer* unitGrid, minimunHeightContainer * unitGrid );

   // console.log('_window.height()/3  '   + Math.round(_window.height()) )
    //height items
     items.css({
      height: _window.height()/2<minimunHeightContainer ? minimunHeightContainer : _window.height()/2
    });

    _window.resize(function() {
        console.log('Im resize')
        console.log('_window.height() ===  '   + _window.outerHeight(true) )
       fitToScreen(container, _window.width()-margin, _window.height()+300 , minimunWidthContainer* unitGrid, minimunHeightContainer * unitGrid)
        items.css({
        height: _window.height()/2<minimunHeightContainer ? minimunHeightContainer : _window.height()/2 
      });
     });  

 
};  

// function renderTemplate(obj){
//   console.log('renderTemplate  ')
//     return '<p>' + "hola" + '</p>';
// };

// Template.storyOverview.rendered = function(){
//     console.log('Im here')
    
//     var el = this.find('#cast');
//     console.log(window)
//     var mycast = cast(el, renderTemplate);
//     mycast.draw();

//     this.handle = Meteor.autorun(function(){
//         //storiesGeneral = Meteor.subscribe('storiesGeneral');
//         var _storiesGeneral = storiesGeneral.find().fetch();
//         console.log("videos")
//         console.log(_storiesGeneral)
//         mycast
//             .data([_storiesGeneral[1]], function(attr){
//               console.log("attr")
//               var id = attr['_id']
//               console.log(id)
//               return id;

//             })
//             console.log('im here')
//             mycast.dynamic(150, 150, 10, 10);
//     });
// }



Template.storyDetails.helpers({
  
  currentStorySubjects: function(){
    console.log('from currentStorySubjects')
    console.log(Session.get('currentStorySubjectsItems'))
    return Session.get('currentStorySubjectsItems');
  },

  totalWidth:function(){
    //calculate width from the number of items inside,
      var storyContent = Session.get('currentStorySubjectsItems');
      var number = 0;  
      var size = 250+40;

      for(var i=0; i<storyContent.length; i++){
        number = i+2;
      };
      
      return size*number + "px";
    
  },

  isAuthorLogged: function(){
     
     //check if user is logged
     if(! Meteor.user()){
      return false; 
     
     };

    var currentStoryTitle = Router.current().params.title.replace(/-/g," ");
    
    console.log("currentStoryTitle")
    var story = storiesGeneral.findOne({'title': currentStoryTitle});
   
    if(story.creator === Meteor.userId()){
      console.log('Im going here')
      return true;
    }else{
      return false;  
    }

    
    //TODO move this to server 
    //http://stackoverflow.com/questions/22147813/how-to-use-meteor-methods-inside-of-a-template-helper

    // return Meteor.call("checkAuthorLogged", currentStoryTitle, function(error, isUser){
    //   //this user is author
    //  //or if collaborater 
      
    //   console.log("isUser  "+isUser);
    //   return isUser;
    // });

  }
 
});


  Session.set('textType', true);
  Session.set('videoType', false);
  Session.set('imgType', false);

  Template.addSubject.helpers({



     textType: function(){
      return Session.get('textType');
    },
    videoType: function(){
      return Session.get('videoType');
    },
    imgType: function(){
      return Session.get('imgType');
    }
  });

 Template.addImg.events({
    "click button.upload": function(){
      console.log('button is clicked');
        var files = $("input.file_bag")[0].files;
        console.log("files")
        console.log(files)
        S3.upload(files,"/subfolder",function(e,r){
          if(e){
            console.log("error en uploader");
            console.log(e);
            return;
          }
            console.log("r");
            console.log(r);
            console.log("r");
        });

        return false;
    }
  });

  Template.addImg.helpers({
    "files": function(){
        return S3.collection.find();
    }

  });

Template.addSubject.events({

  'click #left-column':function(event, t){
      var buttonSelected = $(event.target);

      if(buttonSelected.hasClass('icon-text')){
        
        Session.set('textType', true);
        Session.set('videoType', false);
        Session.set('imgType', false);

      }else if(buttonSelected.hasClass('icon-img')){
        
        Session.set('imgType', true);
        Session.set('textType', false);
        Session.set('videoType', false);
      }

      /*
           Session.set('videoType', true);
      Session.set('textType', false);
      Session.set('imgType', false);
      */
      
  },  



  'submit #addSubjectForm': function(event, t){
    console.log('Im here')
    event.preventDefault();
    
    //TODO: possible problems with words with spaces
    //it should save the id in a Session
    var currentStoryTitle = Router.current().params.title.replace(/-/g," ");
    console.log(currentStoryTitle)

    var addSubjectForm = $(event.currentTarget);
    var type = addSubjectForm.find('#type').val();
    var subjectContent = ""
    var subjectToAdd = {};
    
    console.log("addSubjectForm");
    console.log(addSubjectForm);
    if( Session.get('textType') ){
      subjectToAdd.textType = true;
      subjectContent = addSubjectForm.find('#subjectContent').val();
    }else if(Session.get('videoType')){
      subjectToAdd.videoType = true;
    }else if(Session.get('imgType')){
      subjectToAdd.imgType = true;
      subjectContent = addSubjectForm.find('#subjectContent').attr('src');
    }  

    
    subjectToAdd.createBy = Meteor.user().profile.name;
    subjectToAdd.content = subjectContent;
    

    console.log("subjectToAdd")
    console.log(type)
    console.log(subjectToAdd)
    
     Meteor.call("addSubjectToStory", currentStoryTitle, subjectToAdd, function(error, docs){
        if(error){
          console.log("error "+ error.message);
        }

        console.log("docs adSubjectToStory")
        console.log(docs)
        
        //reset form//
        addSubjectForm[0].reset();
      });
    

      return false;   
    
  }

 

})