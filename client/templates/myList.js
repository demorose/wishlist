Template.myList.helpers({
    myList : function() {
        return List.find({
            'owner' : Meteor.userId()
        })
    }
});

Template.myList.events({
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
    'submit form.addItem': function(e) {
        e.preventDefault();
    },
});
