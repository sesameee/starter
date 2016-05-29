var keyMirror = require('keymirror');
var env = require('env');
var APIRoot = env.APIRoot;
var INFORoot = env.INFORoot;
var TOKENRoot = env.TOKENRoot;
var COWABUNGARoot = env.COWABUNGARoot;

module.exports = {
    /* beautify preserve:start */
    APIEndpoints: {

        API_URL:                APIRoot,

        //GetToken
        SERVER_API:             TOKENRoot + "/api/login",

        //getComunityInfo
        INFO:                   APIRoot + "/login/",
    },
    /* beautify preserve:end */

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null,
        SOCKET_ACTION: null
    }),

    ActionTypes: keyMirror({
        //all
        CLEAR_ALL: null,
        TO_LOADING: null,
        STOP_LOADING: null,

        // Session
        LOGOUT: null,
        LOGIN_REQUEST: null,
        LOGIN_RESPONSE: null,
        RECEIVE_TOKEN: null,
        RECEIVE_USER_ALL_DATA: null,
        RECEIVE_I18N: null,
        REFRESH_TRUE: null,
        HAVE_ERROR: null,
        READ_ERROR: null,
        TO_REFRESH: null,
        RECEIVE_INFO: null,

    })

};
