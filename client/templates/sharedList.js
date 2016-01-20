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
        }, {sort: {checked: 1, creation_date: 1}})
    },
    owner : function() {
        var list = this;
        return Meteor.users.findOne(list.owner);
    }
})

Template.sharedItem.helpers({
    checkerUser : function() {
        var item = this;
        return Meteor.users.findOne(item.checker);
    },
    canUncheck : function() {
        return (this.checker == Meteor.userId());
    }
})

Template.sharedItem.events({
    'click .shared_item input[type="checkbox"]': function(event) {
        event.preventDefault();
        var item = this;
        var checked = event.target.checked;
        if(item.checker == Meteor.userId() || checked ) {
            Meteor.call('checkItem', item._id, checked );
        }
    }
})
