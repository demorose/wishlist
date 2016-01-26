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
        bootbox.prompt(i18n('list_name_prompt'), function(name) {
            if(name) {
                Meteor.call('createList', name);
            }
        })
    },
});
