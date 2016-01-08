Template.sharedLists.helpers({
    sharedLists : function() {
        return List.find({
            'sharedWith' : Meteor.userId()
        })
    }
});

Template.sharedList.helpers({
    items : function() {
        var list = this;
        return Item.find({
            'list' : list._id,
        })
    },
    owner : function() {
        var list = this;
        return Meteor.users.findOne(list.owner);
    }
})
