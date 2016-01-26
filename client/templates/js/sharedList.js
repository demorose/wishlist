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
