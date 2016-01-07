Meteor.publish('myList', function() {
    return List.find({
        'owner' : this.userId
    })
})

Meteor.publish('sharedList', function() {
    return List.find({
        'sharedWith' : this.userId
    })
})

Meteor.publish('sharedItem', function() {
    var sharedList = [];
    List.find({'sharedWith' : this.userId},{fields: {_id:1, }}).forEach(function(list) {
        sharedList.push(list._id);
    });
    return Item.find({'list' : {$in : sharedList}});
})

Meteor.publish('myItems', function() {
    return Item.find({
        'owner' : this.userId
    },
    {fields: {checked: false, checker: false}})
})

Meteor.publish('users', function(){
    return Meteor.users.find({},{fields: {_id: true, username: true}});
})
