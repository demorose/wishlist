Meteor.publish('myList', function() {
    return List.find({
        'owner' : this.userId
    })
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
