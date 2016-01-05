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
        bootbox.prompt('Please enter the name of the list', function(name) {
            if(name) {
                Meteor.call('createList', name);
            }
        })
    },
});

Template.ownList.helpers({
    items : function() {
        var list = this;
        return Item.find({
            'list' : list._id,
            'owner': Meteor.userId()
        })
    }
});

Template.ownList.events({
    'click .delete': function(e) {
        e.preventDefault();
        var list = this;
        bootbox.confirm("Delete this list?", function(result) {
            console.log(result);
            if (result) {
                Meteor.call('deleteList', list._id);
            }
        })
    },
    'submit form.addItem': function(e) {
        var list = this;
        e.preventDefault();
        var text = event.target.name.value;
        Meteor.call('createItem', text, list._id);
        // Clear form
        event.target.name.value = "";
    },
});

Template.ownItem.events({
    'click .delete': function(e) {
        var item = this;
        e.preventDefault();
        Meteor.call('deleteItem', item._id);
    },
})
