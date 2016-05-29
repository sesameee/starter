var ServerActionCreators = require('../actions/for_server/ServerActionCreators.jsx');
var RouteActionCreators = require('../actions/for_view/RouteActionCreators.jsx');
var SessionStore = require('../stores/SessionStore.jsx');
var Constants = require('../constants/Constants.js');
var request = require('superagent');
var nocache = require('./NoCache.js');
var _ = require('underscore');
var APIEndpoints = Constants.APIEndpoints;

module.exports = {
    storageAvailable() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null && window['localStorage'] !== undefined;
        } catch (e) {
            return false;
        }
    },
    login: function(_email, _password, _persistent) {
        var self = this;
        request
            .post(APIEndpoints.SERVER_API)
            .send({
                account: _email.trim(),
                password: _password,
                persistent: _persistent
            })
            .set('Accept', 'application/json')
            .end(function(error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsgs = self._getErrors(res);
                        RouteActionCreators.logout();
                        // console.log('errorMsgs',errorMsgs)
                        if (errorMsgs == 'invalid_request') {
                            errorMsgs = '請輸入帳號密碼';
                        } else {
                            errorMsgs = '您的帳號密碼錯誤，請確認帳號是否開通或輸入正確資訊';
                        }
                        ServerActionCreators.receiveError(errorMsgs);

                    } else {
                        var json = JSON.parse(res.text);
                        ServerActionCreators.receiveLogin(json, null);
                        RouteActionCreators.redirect("app");
                        self.getInfo();
                    }
                }
            });
    },
    loginOut: function() {
        request.del(APIEndpoints.SERVER_API)
            .set('Accept', 'application/json')
            .end(function(error, res) {
                if (res) {
                    RouteActionCreators.redirect("login");

                    // setTimeout(function(){
                    //    RouteActionCreators.logout();
                    // }, 500);

                }
            });
    },
    getInfo: function(callback) {
        var self = this;
        let selffunction = self.getInfo.bind(self, callback);
        let user_info = SessionStore.getUserInfo();
        if (_.isEmpty(user_info)) {
            self.postApi(
                APIEndpoints.INFO, {},
                selffunction,
                function(error) {
                    console.log('error', error);
                },
                function(json) {
                    console.log(json);
                    ServerActionCreators.receiveInfo(json, null);
                    if (callback) {
                        callback(json);
                    }
                }
            );
        } else {
            callback(user_info);
        }
    },
    _getErrors: function(res) {
        var json;
        var errorMsgs = ["Something went wrong, please try again"];
        if ((json = JSON.parse(res.text))) {
            if (json['errors']) {
                errorMsgs = json['errors'];
            } else if (json['error']) {
                errorMsgs = [json['error']];
            }
        }
        return errorMsgs;
    },
    _Errors: function(err, res, callback, reset, _token) {
        var self = this;
        var refresh = SessionStore.getRefresh();

        if (res) {
            // console.log('res.status',res.status)
            if (refresh) {
                setTimeout(function() {
                    var NowToken = SessionStore.getAccessToken();
                    // console.log('NowToken',NowToken)
                    if (NowToken == _token) {
                        setTimeout(function() {

                            var NowToken2 = SessionStore.getAccessToken();
                            // console.log('NowToken2', NowToken2);
                            if (NowToken2 != _token) {
                                reset && reset();
                            }
                        }, 2000);

                    } else {
                        reset && reset();
                    }
                }, 2000);
            } else if (res.status == 401) {
                console.log('401');
                ServerActionCreators.changeRefreshTrue();
                request
                    .post(APIEndpoints.SERVER_API_RENEW)
                    .end(function(error, res) {

                        var json = JSON.parse(res.text);
                        if (res.status == 200 || res.status == 201) {
                            // console.log('200',json);
                            ServerActionCreators.receiveToken(json);
                            setTimeout(function() { reset && reset(); }, 10);

                        } else {
                            // console.log('!200',res);
                            self.loginOut();
                        }

                    });
            } else if (res.status == 400 || res.status == 304 || res.status == 204 || res.statusType == 2 || res.status == 0) {
                callback && callback(err, res);

            } else if (res.status == 403 || res.status == 404) {
                ServerActionCreators.receiveError('您無此權限，即將為您導入首頁');
                setTimeout(function() {
                    RouteActionCreators.redirect("main");
                }, 2000);

            } else {
                //server error refresh res.status==500
                ServerActionCreators.receiveRefresh();
            }

        }
    },

    _getToken: function(callback) {
        var self = this;
        var token = [];
        let storageAvailable = this.storageAvailable();
        token.access_token = SessionStore.getAccessToken();
        token.token_type = SessionStore.getTokenType();
        if (_.isEmpty(token.access_token)) {
            request
                .get(APIEndpoints.SERVER_API)
                .use(nocache)
                .set("lasttime", localStorage.date)
                .end(function(error, res) {
                    // console.log('res',res)
                    self._Errors(error, res, function() {
                        // console.log('res.error',res.error)
                        if (res.status == 204) {
                            // console.log('204')
                            self.loginOut();
                        } else {
                            var json = JSON.parse(res.text);
                            ServerActionCreators.receiveToken(json);
                            // RouteActionCreators.redirect( "app" );
                            callback && callback(json);
                        }
                    });
                });
        } else {
            var refresh = SessionStore.getRefresh();
            if (!refresh) {
                callback && callback(token);

            } else {
                setTimeout(function() {
                    var token2 = [];
                    token2.access_token = SessionStore.getAccessToken();
                    token2.token_type = SessionStore.getTokenType();
                    callback && callback(token2);

                }, 2000);
            }

        }
    },
    postApi: function(_api, _json, _selffunction, errorback, callback) {
        let self = this;
        this._getToken(function(_token) {
            request
                .post(_api)
                .send(_json)
                .use(nocache)
                .set('Accept', 'application/json')
                .set('Authorization', _token.token_type + " " + _token.access_token)
                .end(function(error, res) {
                    self._Errors(error, res, function() {
                        if (res.error) {
                            let errorMsgs = self._getErrors(res);
                            errorback && errorback(errorMsgs);
                        } else {
                            let json = JSON.parse(res.text);
                            callback && callback(json);
                        }
                    }, _selffunction, _token.access_token);
                });
        });
    },
    getApi: function(_api, _json, _selffunction, errorback, callback, ddd) {
        let self = this;
        this._getToken(function(_token) {
            request
                .get(_api)
                .use(nocache)
                .set('Accept', 'application/json')
                .set('Authorization', _token.token_type + " " + _token.access_token)
                .end(function(error, res) {
                    console.log('error', error, 'res', res);
                    self._Errors(error, res, function() {
                        if (res.error) {
                            let errorMsgs = self._getErrors(res);
                            console.log('errorMsgsAAA', errorMsgs);
                            errorback && errorback(errorMsgs);
                        } else {
                            let json = JSON.parse(res.text);
                            callback && callback(json);
                        }
                    }, _selffunction, _token.access_token);
                });
        });
    },
    putApi: function(_api, _json, _selffunction, errorback, callback) {
        let self = this;
        this._getToken(function(_token) {
            request
                .put(_api)
                .send(_json)
                .set('Accept', 'application/json')
                .set('Authorization', _token.token_type + " " + _token.access_token)
                .end(function(error, res) {
                    self._Errors(error, res, function() {
                        if (res.error) {
                            let errorMsgs = self._getErrors(res);
                            errorback && errorback(errorMsgs);
                        } else {
                            let json = JSON.parse(res.text);
                            callback && callback(json);
                        }
                    }, _selffunction, _token.access_token);
                });
        });
    },
    delApi: function(_api, _json, _selffunction, errorback, callback) {
        let self = this;
        this._getToken(function(_token) {
            request
                .del(_api)
                .set('Accept', 'application/json')
                .set('Authorization', _token.token_type + " " + _token.access_token)
                .end(function(error, res) {
                    self._Errors(error, res, function() {
                        if (res.error) {
                            let errorMsgs = self._getErrors(res);
                            errorback && errorback(errorMsgs);
                        } else {
                            let json = JSON.parse(res.text);
                            callback && callback(json);
                        }
                    }, _selffunction, _token.access_token);
                });
        });
    },
    patchApi: function(_api, _json, _selffunction, errorback, callback) {
        let self = this;
        this._getToken(function(_token) {
            request
                .patch(_api)
                .send(_json)
                .set('Accept', 'application/json')
                .set('Authorization', _token.token_type + " " + _token.access_token)
                .end(function(error, res) {
                    self._Errors(error, res, function() {
                        if (res.error) {
                            let errorMsgs = self._getErrors(res);
                            errorback && errorback(errorMsgs);
                        } else {
                            let json = JSON.parse(res.text);
                            callback && callback(json);
                        }
                    }, _selffunction, _token.access_token);
                });
        });
    }
};
