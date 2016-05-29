var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var Constants = require('../../constants/Constants.js');
var ActionTypes = Constants.ActionTypes;


module.exports = {
    receiveLogin: function(json, errors) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.LOGIN_RESPONSE,
            json: json,
            errors: errors
        });
    },
    receiveToken: function(json) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_TOKEN,
            json: json
        });
    },
    receiveError: function(json) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.HAVE_ERROR,
            json: json
        });
    },
    receiveRefresh: function() {
        AppDispatcher.handleServerAction({
            type: ActionTypes.TO_REFRESH
        });
    },
    changeRefreshTrue: function() {
        AppDispatcher.handleServerAction({
            type: ActionTypes.REFRESH_TRUE
        });
    }

};
