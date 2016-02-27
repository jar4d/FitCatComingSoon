/*
var clientId = Meteor.settings.InstagramKeys.clientId
var clientSecret = Meteor.settings.InstagramKeys.clientSecret
var instagram = new Instagram.createClient( clientId , clientSecret );


var getImages = function() {
    // Tag search
    instagram.tags.media('catsofinstagram', {max_id: 1}, Meteor.bindEnvironment(function (tags, error) {
        console.log(tags);

        tags.forEach(function(tag) {
            Instagrams.upsert(
                { id : tag.id },
                tag
            );
        });
    }));
}

// Retrieve some images on startup
Meteor.startup(function() {
    getImages();
});

// Check for new images every 5 seconds
var cron = Meteor.setInterval(function(t) {
    getImages();
}, 10000);


Meteor.publish("images", function () {
    return Instagrams.find( {}, { sort: { created_time: -1 } } );
});

Meteor.methods({
    deleteGram : function(id) {
        Instagrams.remove({ _id: id });
    }
});
*/