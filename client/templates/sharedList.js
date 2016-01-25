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


/*
 * One shared list
 */
Template.sharedList.helpers({
    items : function() {
        var list = this;
        return Item.find({
            'list' : list._id,
        }, {sort: {checked: 1, creation_date: 1}})
    },
    owner : function() {
        var list = this;
        return Meteor.users.findOne(list.owner);
    }
})

Template.sharedList.events({
    'click .unsubscribe': function(e) {
        e.preventDefault();
        var list = this;
        bootbox.confirm(i18n("unsubscribe_list_confirmation"), function(result) {
            console.log(result);
            if (result) {
                Meteor.call('unsubscribeList', list._id);
            }
        })
    },
})

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
