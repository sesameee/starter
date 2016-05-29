var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var Constants = require('../../constants/Constants.js');
var WebAPIUtils = require('../../utils/CommonAPIUtils.js');

var ActionTypes = Constants.ActionTypes;

module.exports = {


    login: function(email, password, auto) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOGIN_REQUEST,
            email: email,
            password: password
        });
        WebAPIUtils.login(email, password, auto);
    },

    logout: function() {
        WebAPIUtils.loginOut();

        AppDispatcher.handleViewAction({
            type: ActionTypes.CLEAR_ALL
        });
    },

    checkError: function() {

        AppDispatcher.handleViewAction({
            type: ActionTypes.READ_ERROR
        });

    }
};
