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
        }, {sort: {name: 1}})
    },
    owner : function() {
        var list = this;
        return Meteor.users.findOne(list.owner);
    }
})

Template.sharedItem.events({
    'click .shared_item input[type="checkbox"]': function(event) {
        var item = this;
        var checked = event.target.checked;
        console.log(checked);
        Meteor.call('checkItem', item._id, checked );
    }
})
