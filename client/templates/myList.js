Template.myList.helpers({
    myList : function() {
        return List.find({
            'owner' : Meteor.userId()
        })
    }
});

Template.myList.events({
    'submit form': function(e) {
        e.preventDefault();
    },
    'click #addList': function(e) {
        e.preventDefault();
        Meteor.call('createList');
    },
});

Template.ownList.events({
    'click .delete': function(e) {
        e.preventDefault();
        if (confirm("Delete this list?")) {
            Meteor.call('deleteList', this._id);
        }
    },
});
