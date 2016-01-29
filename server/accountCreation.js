Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        if (options.profile.first_name && options.profile.last_name) {
            options.profile.name = options.profile.first_name.charAt(0).toUpperCase() + options.profile.first_name.slice(1) + ' ' + options.profile.last_name.toUpperCase();
        }
        user.profile = options.profile;
    }
    return user;
});
