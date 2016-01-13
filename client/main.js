Meteor.subscribe('myList');
Meteor.subscribe('myItems');
Meteor.subscribe('users');

Meteor.subscribe('sharedList');
Meteor.subscribe('sharedItem');


TAPi18n._afterUILanguageChange =function () {
    accountsUIBootstrap3.setLanguage(TAPi18n.getLanguage());
};

accountsUIBootstrap3.setLanguage(TAPi18next.detectLanguage());
