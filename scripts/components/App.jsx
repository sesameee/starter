var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./Header.jsx');
var _ = require('underscore');
var SessionActionCreators = require('../actions/for_view/SessionActionCreators.jsx');
var RouteActionCreators = require('../actions/for_view/RouteActionCreators.jsx');
var SessionStore = require('../stores/SessionStore.jsx');

function getStateFromStores() {
    return {
        isLoggedIn: SessionStore.isLoggedIn()
    };
}

var App = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },
    componentWillMount: function() {

        SessionActionCreators.getSession();
    },

    componentDidMount: function() {

        SessionStore.addChangeListener(this._onChange);
        window.onbeforeunload = function() {
            localStorage.setItem("date", Date.now());
        };
        this.handleLoading();
    },

    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {

        this.setState(getStateFromStores());
    },
    handleLoading: function() {
        setTimeout(function() {
            if (!SessionStore.isLoggedIn()) {
                RouteActionCreators.redirect("login");
            }
        }, 1000);

    },
    render: function() {

        var headerItem;
        if (this.state.isLoggedIn) {
            headerItem = <Header isLoggedIn={this.state.isLoggedIn}/>;
        }


        return (
            <div className="app">
                {headerItem}
            </div>
        );

    }

});

module.exports = App;
