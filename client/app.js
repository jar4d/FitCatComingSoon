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
    }
  });

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








