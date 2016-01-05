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
        bootbox.prompt(TAPi18n.__('list_name_prompt'), function(name) {
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
        bootbox.confirm(TAPi18n.__("delete_list_confirmation"), function(result) {
            console.log(result);
            if (result) {
                Meteor.call('deleteList', list._id);
            }
        })
    },
    'click .share': function(e) {
        e.preventDefault;
        var list = this;
        bootbox.dialog({
            title: "Share this list with:" + list.name,
            message: '<div class="row">  ' +
                '<div class="col-md-12"> ' +
                '<form class="form-horizontal"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-4 control-label" for="name">Name</label> ' +
                '<div class="col-md-4"> ' +
                '<input id="name" name="name" type="text" placeholder="Your name" class="form-control input-md"> ' +
                '<span class="help-block">Here goes your name</span> </div> ' +
                '</div> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-4 control-label" for="awesomeness">How awesome is this?</label> ' +
                '<div class="col-md-4"> <div class="radio"> <label for="awesomeness-0"> ' +
                '<input type="radio" name="awesomeness" id="awesomeness-0" value="Really awesome" checked="checked"> ' +
                'Really awesome </label> ' +
                '</div><div class="radio"> <label for="awesomeness-1"> ' +
                '<input type="radio" name="awesomeness" id="awesomeness-1" value="Super awesome"> Super awesome </label> ' +
                '</div> ' +
                '</div> </div>' +
                '</form> </div>  </div>',
            buttons: {
                success: {
                    label: "Save",
                    className: "btn-success",
                    callback: function () {
                        var name = $('#name').val();
                        var answer = $("input[name='awesomeness']:checked").val()
                        Example.show("Hello " + name + ". You've chosen <b>" + answer + "</b>");
                    }
                }
            }
        });
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
