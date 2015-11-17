List = new Mongo.Collection('list');

Meteor.methods({
    createList: function(name) {
        if(typeof(Meteor.userId()) == "string") {
            var user = Meteor.user();
            var listId = List.insert({
                'name': name,
                'owner': user._id
            });
        }
    },
    deleteList: function(id) {
        if(typeof(Meteor.userId()) == "string") {
            var user = Meteor.user();
            var list = List.findOne({
                '_id': id,
                'owner': user._id
            });
            if (list) {
                List.remove(id);
            }
        }
    }
});
