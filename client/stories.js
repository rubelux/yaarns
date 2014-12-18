

            


Template.storyArea.events({
	'click #addSubject' : function(event, t){
		//render template
		//icon-close
		//add it
		var addSubjectBt = $(event.currentTarget);
		console.log(addSubjectBt)
		var iconDiv = addSubjectBt.find('.icon');
		console.log(iconDiv)
		if(iconDiv.hasClass('icon-untitled')){
			Session.set('addSubjectWindow', true);
			iconDiv.removeClass('icon-untitled');
			iconDiv.addClass('icon-close');
			
		}else{

			Session.set('addSubjectWindow', false);
				iconDiv.removeClass('icon-close');	
			iconDiv.addClass('icon-untitled');
			
		}

	}	
});


Template.storyArea.helpers({
	isOverview: function(){
		console.log("Router.current()")
		console.log(Router.current().params.title )
		return  Router.current().params.title !== undefined;
		//return Router.current().params.title.replace(/-/g," ");	
	},
	storytellers: function(){
		console.log()

		var currentStoryTitle = Router.current().params.title.replace(/-/g," ");
		var currentStory = storiesGeneral.find({ title : currentStoryTitle }).fetch();

		console.log("currentStory:::::: 22");
		console.log(currentStory);
		console.log("currentStory");

		var storytellers = [];

		//get user details//
		//first author//
		Meteor.call("getUserDetails", currentStory.creator , function(error, docs){
        if(error){
          console.log("error "+ error.message);
        }

        console.log("docs getUserDetails")
        console.log(docs)
        
        
   
      });


		return currentStory;
	}	
});

