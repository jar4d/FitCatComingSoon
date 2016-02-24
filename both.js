EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Github account usernames of admin users
var ADMIN_USERS = ['jar4d'];
function isAdmin() {
  try {
    return ADMIN_USERS.indexOf(Meteor.user().services.github.username) !== -1;
  } catch(e) {
    return false;
  }
}