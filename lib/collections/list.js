List = new Mongo.Collection('list');

Meteor.methods({
    createList: function(name) {
        if(typeof(Meteor.userId()) == "string") {
            var user = Meteor.user();
            var listId = List.insert({
                'name': name,
                'owner': user._id,
                'sharedWith': []
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
    },
    shareList: function(id, userIds) {
        if(typeof(Meteor.userId()) == "string") {
            var user = Meteor.user();
            var list = List.findOne({
                '_id': id,
                'owner': user._id
            });
            if (list) {
                if (userIds instanceof Array) {
                    List.update(id, {$set: {sharedWith: userIds}});
                }
            }
        }
    }
});
