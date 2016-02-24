         apiKey = Meteor.settings.mailchimpApiKey;
       listId = Meteor.settings.mailchimpListId; 

  // Mailchimp API Call
  Meteor.methods({
    fetchFromService: function(email) {
//Meteor.settings.mailchimpListId;
       apiEndPoint = apiKey.slice(-4); // Pull appropriate api endpoint datacenter from apiKey http://apidocs.mailchimp.com/api/rtfm/#api-endpoints
       url = "http://"+ apiEndPoint +".api.mailchimp.com/1.3/?method=listSubscribe&apikey="+ apiKey +"&id="+ listId +"&email_address="+ encodeURIComponent(email) +"&output=json";
      //synchronous POST
       result = Meteor.http.post(url, {timeout:30000});
      if(result.statusCode==200) {
         respJson = JSON.parse(result.content);
        console.log("response received.");
        return respJson;
      } else {
        // TODO: Add better error handling
        //if(result.statusCode==502) {
        //  some stuff;
        //} else {
        //  some stuff;
        //}
        console.log("Response issue: ", result.statusCode);
         errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
      }
    }
  });

  // Github Login
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
      {fields: {'services.github.username': 1, 'username':1}});
  });

  // Admin Email Subscriber View
  Meteor.publish("emails", function() {
    if (isAdmin) {
      return Emails.find();
    }
  });