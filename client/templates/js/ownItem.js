Template.ownItem.events({
    'click .delete': function(e) {
        var item = this;
        e.preventDefault();
        Meteor.call('deleteItem', item._id);
    },
})
