/*
 *  List of shared lists
 */
ownerSelected = new ReactiveVar('');
Template.sharedLists.helpers({
    sharedLists : function() {
        return List.find({
            'sharedWith' : Meteor.userId(),
            'owner' : ownerSelected.get()
        })
    },
    sharingUser : function() {
        var lists = List.find({
            'sharedWith' : Meteor.userId()
        }).fetch();
        var userIds = new Array();
        for (x in lists) {
            userIds.push(lists[x].owner);
        }
        return Meteor.users.find({_id: {$in: userIds}}, {$sort: {'profile.name': 1}});
    }
});

Template.sharedLists.events({
    'change #select_owner': function(event){
        event.preventDefault();
        ownerSelected.set(event.target.value);
    }
})
