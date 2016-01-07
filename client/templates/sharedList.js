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
    }
})
