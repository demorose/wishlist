Template.ownList.helpers({
    items : function() {
        var list = this;
        return Item.find({
            'list' : list._id,
            'owner': Meteor.userId()
        }, {sort: {creation_date: 1}})
    }
});

Template.ownList.events({
    'click .delete': function(e) {
        e.preventDefault();
        var list = this;
        bootbox.confirm(i18n("delete_list_confirmation"), function(result) {
            console.log(result);
            if (result) {
                Meteor.call('deleteList', list._id);
            }
        })
    },
    'click .share': function(e) {
        e.preventDefault;
        var list = this;
        var message = '<div class="row">  ' +
                '<div class="col-md-12"> ' +
                '<form class="form-horizontal"> ' +
                '<div class="form-group"> ' +
                '<select name="users" class="selectpicker" multiple data-live-search="true">';
        ;

        var users =  Meteor.users.find({_id : {$ne : Meteor.userId()}})
        users.forEach(function(user) {
            message += '<option '+ (list.sharedWith.indexOf(user._id) != -1 ? 'selected="true"' : '') +' value="' + user._id + '" data-content="<span class=\'label label-default\'>' + user.profile.name + '</span>">' +
                         user.profile.name +
                    '</option>';
        });

        message += '</select></div> ' +
                '</div> </div>' +
                '</form> </div>  </div>';

        bootbox.dialog({
            title: list.name,
            message: message,
            buttons: {
                success: {
                    label: i18n("share"),
                    className: "btn-success",
                    callback: function () {
                        var users = $('select[name="users"]').val();
                        Meteor.call('shareList', list._id, users);
                    }
                }
            }
        });
        $('.selectpicker').selectpicker({});
    },

    'submit form.addItem': function(e) {
        var list = this;
        e.preventDefault();
        var text = e.target.name.value;
        Meteor.call('createItem', text, list._id);
        // Clear form
        e.target.name.value = "";
    },
});
