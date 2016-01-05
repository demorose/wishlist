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
        var name = prompt('Please enter the name of the list')
        if(name) {
            Meteor.call('createList', name);
        }
    },
});

Template.ownList.helpers({
    items : function() {
        return Item.find({
            'list' : this._id,
            'owner': Meteor.userId()
        })
    }
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
        var text = event.target.name.value;
        Meteor.call('createItem', text, this._id);
        // Clear form
        event.target.name.value = "";
    },
});

Template.ownItem.events({
    'click .delete': function(e) {
        e.preventDefault();
        Meteor.call('deleteItem', this._id);
    },
})
