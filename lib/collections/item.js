Item = new Mongo.Collection('item');


Meteor.methods({
    createItem: function(name, listId) {
        if(typeof(Meteor.userId()) == "string") {
            var user = Meteor.user();
            var list = List.findOne({
                '_id': listId,
                'owner': user._id
            });
            if (list) {
                var itemId = Item.insert({
                    'name': name,
                    'list': list._id,
                    'owner': user._id
                });
            }
        }
    },
    deleteItem: function(id) {
        if(typeof(Meteor.userId()) == "string") {
            var user = Meteor.user();
            var item = Item.findOne({
                '_id': id,
                'owner': user._id
            });
            if (item) {
                Item.remove(id);
            }
        }
    }
});
