/*
 * One item
 */
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
