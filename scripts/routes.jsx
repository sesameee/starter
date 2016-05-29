var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App.jsx');
var LoginPage = require('./components/session/LoginPage.jsx');
var MainPage = require('./components/session/LoginPage.jsx');


module.exports = (
    <Route name="app" path="/" handler={App} >
        <DefaultRoute handler={MainPage} />
        <Route name="main"  handler={MainPage}/>
        <Route name="login" path="/login" handler={LoginPage}/>
    </Route>
);
