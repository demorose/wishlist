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
