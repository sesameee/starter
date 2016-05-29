var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _searchAddress = {};
var _keyword ="";

var SearchStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getSearchAddress: function(){
        return _searchAddress;
    },
    getKeyword: function(){
        return _keyword;
    }

});


SearchStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;
//    console.log("BadgeStore=>payload="+JSON.stringify(payload));

    switch(action.type) {

        case ActionTypes.RECEIVE_SEARCH:

            if(action.json){
                _searchAddress = action.json['result'];
                _keyword = action.keyword;
                SearchStore.emitChange();
            }



        case ActionTypes.CLEAR_ALL:
                _searchAddress = {};

            break;


        default:


            // do nothing
    }

});

module.exports = SearchStore;
