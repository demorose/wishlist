List = new Mongo.Collection('list');

Meteor.methods({
    createList: function(name) {
        if(typeof(Meteor.userId()) == "string") {
            var user = Meteor.user();

            var listId = List.insert({
                'name': name,
                'owner': user._id
            });

            return alert('red' + listId);
        }
        return alert(Meteor.userId());
    }
});
