var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var Constants = require('../../constants/Constants.js');

var ActionTypes = Constants.ActionTypes;

module.exports = {

    redirect: function(route) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REDIRECT,
            route: route
        });
    },
    logout: function() {

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLEAR_ALL
        });
    }

};
