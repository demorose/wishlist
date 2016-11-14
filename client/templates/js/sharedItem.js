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
    },
    name_urlify : function() {
        var item = this;
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return item.name.replace(urlRegex, '<a target="_blank" href="$1">$1</a>')
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
