var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/Constants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _ = require('underscore');
var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _accessToken = '';
var _token_type = '';
var _user = {};
var _errors = '';
var _userData = [];
var _18inJson = [];
var _i18n = {};
var _refresh = false;
var _userLang = navigator.language || navigator.userLanguage;
var _connect_status = true;
var _alert = false;
var _location_refresh = false;
var _loading = false;
var _drive_abort = [];

var SessionStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    isLoggedIn: function() {
        return _accessToken == '' ? false : true;
    },
    getAccessToken: function() {
        return _accessToken;
    },
    getTokenType: function() {
        return _token_type;
    },
    getUserData: function() {
        return _userData;
    },
    getErrors: function() {
        return _errors;
    },
    getAlert: function() {
        return _alert;
    },
    getI18n: function() {
        return _i18n;
    },
    getRefresh: function() {
        return _refresh;
    },
    getConnectStatus: function() {
        return _connect_status;
    },
    getLocationRefresh: function() {
        return _location_refresh;
    },
    getLoading: function() {
        return _loading;
    },
    getUserInfo: function() {
        return _user;
    }

});

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;
    // console.log('SessionStore',action.type,action);

    switch (action.type) {

        case ActionTypes.LOGIN_RESPONSE:
            if (action.json) {

                _accessToken = action.json.access_token;
                _token_type = action.json.token_type;
                _refresh = false;
                SessionStore.emitChange();

            }
            break;

        case ActionTypes.RECEIVE_TOKEN:
            if (action.json) {

                _accessToken = action.json.access_token;
                _token_type = action.json.token_type;
                _refresh = false;
                SessionStore.emitChange();
            }
            break;


        case ActionTypes.REFRESH_TRUE:

            _refresh = true;
            SessionStore.emitChange();

            break;

        case ActionTypes.LOGOUT:

            _accessToken = '';
            _token_type = '';
            SessionStore.emitChange();

            break;

        case ActionTypes.RECEIVE_INFO:
            if (action.json) {
                _user = action.json;
                SessionStore.emitChange();
            }
            break;


        case ActionTypes.CLEAR_ALL:

            _userData = [];
            _accessToken = '';
            _token_type = '';
            _connect_status = true;
            _alert = false;
            _errors = '';
            _loading = false;
            _location_refresh = false;
            _refresh = false;
            _userLang = navigator.language || navigator.userLanguage;
            _loading = false;
            _user = {};

            SessionStore.emitChange();
            break;


        case ActionTypes.HAVE_ERROR:


            _alert = true;
            _errors = action.json;


            SessionStore.emitChange();
            break;

        case ActionTypes.READ_ERROR:


            _alert = false;
            _errors = '';


            SessionStore.emitChange();
            break;


        case ActionTypes.TO_REFRESH:

            _location_refresh = true;
            SessionStore.emitChange();
            break;

        case ActionTypes.TO_LOADING:
            console.log('TO_LOADING');
            _loading = true;
            SessionStore.emitChange();
            break;

        case ActionTypes.STOP_LOADING:
            console.log('STOP_LOADING');
            _loading = false;
            SessionStore.emitChange();
            break;






        default:
    }

    return true;
});

module.exports = SessionStore;
