Accounts.ui.config ({
    passwordSignupFields: 'USERNAME_ONLY',
    extraSignupFields: [{
        fieldName: 'name',
        fieldLabel: 'Full name',
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

