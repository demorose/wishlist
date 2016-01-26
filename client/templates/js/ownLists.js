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
                '<div class="form-group"> ';

        var users =  Meteor.users.find({_id : {$ne : Meteor.userId()}})
        users.forEach(function(user) {
            message += '<div class="checkbox-inline"> \
                <label> \
                    <input name="users[]" type="checkbox" ' + (list.sharedWith.indexOf(user._id) != -1 ? 'checked="checked"' : '') +' id="" value="' + user._id + '" aria-label=""> \
                    ' + user.profile.name + ' \
                </label> \
            </div>'
        });

        message += '</div> ' +
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
                        var users = [];
                        var checkboxes = $('input[name="users[]"');
                        checkboxes.each(function() {
                            if (this.checked) {
                                users.push(this.value);
                            }
                        });
                        Meteor.call('shareList', list._id, users);
                    }
                }
            }
        });
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