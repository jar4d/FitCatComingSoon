  Meteor.subscribe('userData');
  Meteor.subscribe('emails');
  Template.admin.events({
    'click .login' : function(evt, tmpl){
      Meteor.loginWithGithub();
      return false;
    },
    /* Since we're now using a separate admin page, we can remove the "toggle admin" feature used in the original tutorial
    'click .admin' : function(evt, tmpl){
      Session.set("showAdmin", !Session.get("showAdmin"));
    }
    */
  });

  Template.signup.events({
    'submit form' : function (evt, tmpl) {
      console.log("Form Input Button Clicked");
      var email = tmpl.find('#email-for-mailchimp').value;
      var doc = {email: email, referrer: document.referrer, timestamp: new Date()};

      if (EMAIL_REGEX.test(email)){
        Session.set("showBadEmail", false);
        console.log("REGEX Test Passed");

        Meteor.call('fetchFromService', email, function(err, respJson) {
        if(err) {
          window.alert("Error: " + err.reason);
          console.log("error occured on receiving data on server. ", err );
          Session.set("showBadEmail", true);
        } else {
          console.log("respJson: ", respJson);
        }
      });

        Emails.insert(doc);
        console.log("Posted to db");
        Session.set("emailSubmitted", true);

      } else {
        Session.set("showBadEmail", true);
        console.log("REGEX Test Failed");
      }
      return false;

    }
  });

  Template.signup.helpers({
    showBadEmail: function () {
      return Session.get("showBadEmail");
    },
    emailSubmitted: function () {
      return Session.get("emailSubmitted");
    },











  });

  Template.landing.onRendered(function() { 
    initSlider();
  });


initSlider = function() {
    var time = 7; // time in seconds

    var $progressBar,
        $bar, 
        $elem, 
        isPause, 
        tick,
        percentTime;


      var owl = $("#main-slider").find('.owl-carousel');

      owl.owlCarousel({
    items:1,
    loop:true,
    autoplay:true,
    margin: 10,
    //nav: true,
    dots: false,
    autoplayTimeout:7000,
    onInitialized: progressBar,
    onTranslated: moved,
    onDrag: pauseOnDragging


  }); 
        console.log("initSlider");


      //Init progressBar where elem is $("#owl-demo")
      function progressBar(elem){
        $elem = elem;//build progress bar elements
        buildProgressBar();
        start();//start counting
      }
   
      //create div#progressBar and div#bar then append to $(".owl-carousel")
      function buildProgressBar(){
          $progressBar = $("<div>",{
              id:"progressBar"
          });
          $bar = $("<div>",{
              id:"bar"
          });
          $progressBar.append($bar).appendTo($("#main-slider"));
      }
   
      function start() {
        //reset timer
        percentTime = 0;
        isPause = false;
        //run interval every 0.01 second
        tick = Meteor.setInterval(interval, 10);
      };
   
function interval() {
    if(isPause === false){
        percentTime += 1 / time;
        
        $bar.css({
            width: percentTime+"%"
        });
        
        // if percentTime is equal or greater than 100
        if(percentTime >= 100){
            // slide to next item 
            $("#main-slider").trigger("next.owl.carousel");
            percentTime = 0; // give the carousel at least the animation time ;)
        }
    }
}
   
      //pause while dragging 
      function pauseOnDragging(){
        isPause = true;
      }
   
      //moved callback
      function moved(){
        //clear interval
        clearTimeout(tick);
        //start again
        start();
      }

}


Template.signup.events({
  onclick
})


  Template.admin.helpers({
    showAdmin: function() {
      return Session.get("showAdmin");
    },
    emails: function() {
      return Emails.find().fetch();
    },
    isAdmin: function() {
      return isAdmin;
    }
  });

//social wall stuff

/*

// Remove items from the DOM when they are no longer on screen
// Will stop the tab from crashing
function removeInvisible() {
    $("li").each(function() {
        var el      = $(this);
        var offset  = el.offset();
        var wHeight = $(window).innerHeight();
        if( offset.top > wHeight ) {
            el.remove();
            Meteor.call( 'deleteGram', el.data('id') );
        }
    });
}

Meteor.setInterval(function() {
    removeInvisible();
}, 1000);



Template.image.rendered = function() {

    this.$("li img").load(function() {
        $(this).css({
            opacity : 1
        }).parent().css({
            width : '8%'
        });
    });

}

*/






