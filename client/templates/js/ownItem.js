Template.ownItem.events({
    'click .delete': function(e) {
        var item = this;
        e.preventDefault();
        Meteor.call('deleteItem', item._id);
    },
})

Template.ownItem.helpers({
    name_urlify : function() {
        var item = this;
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return item.name.replace(urlRegex, '<a target="_blank" href="$1">$1</a>')
    }
});
