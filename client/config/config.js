Accounts.ui.config ({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    extraSignupFields: [{
        fieldName: 'last_name',
        fieldLabel: function(){ return i18n('AccountUI.lastname')},
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
            if (!value) {
                errorFunction("Please write your name");
                return false;
            } else {
                return true;
            }
        }
    }, {
        fieldName: 'first_name',
        fieldLabel: function(){ return i18n('AccountUI.firstname')},
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
            if (!value) {
                errorFunction("Please write your name");
                return false;
            } else {
                return true;
            }
        }
    }]
})

