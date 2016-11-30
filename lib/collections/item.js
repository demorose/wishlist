Item = new Mongo.Collection('item');


Meteor.methods({
    createItemForSharedList: function(name, listId) {
        check(name, String);
        check(listId, String);
        if(typeof(Meteor.userId()) == "string") {
            var user = Meteor.user();
            var list = List.findOne({
                '_id': listId,
            });
            if (list) {
                var itemId = Item.insert({
                    'name': name,
                    'list': list._id,
                    'checked': true,
                    'checker': user._id,
                    'creation_date': new Date(),
                    'owner': user._id
                });
            }
        }
    },

    createItem: function(name, listId) {
        check(name, String);
        check(listId, String);
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
                    'checked': false,
                    'checker': null,
                    'creation_date': new Date(),
                    'owner': user._id
                });
            }
        }
    },
    deleteItem: function(id) {
        check(id, String);
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
    },
    checkItem: function(id, checked) {
        check(id, String);
        check(checked, Boolean);
        if(typeof(Meteor.userId()) == "string") {
            var sharedList = [];
            // List of lists shared with current user
            List.find({'sharedWith' : this.userId},{fields: {_id:1, }}).forEach(function(list) {
                sharedList.push(list._id);
            });
            var item = Item.findOne({
                '_id' : id,
                'list' : {$in : sharedList}
            });
            if(item) {
                if(item.checked && !checked) {
                    if (item.checker == Meteor.userId()) {
                        if (item.owner == Meteor.userId()) {
                            Item.remove(id);
                        } else {
                            Item.update(id, {$set: {'checked': checked, 'checker': null}})
                        }
                    }
                } else if (!item.checked && checked){
                    Item.update(id, {$set: {'checked': checked, 'checker': Meteor.userId()}})
                }
            }
        }
    }
});
