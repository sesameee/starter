import React from 'react';
import { render } from 'react-dom';
var i18n = require('i18next-client');
var router = require('./stores/RouteStore.jsx').getRouter();

require('../styles/style.scss');

window.React = React;

// var content = document.getElementById("content");
// content.ontouchmove = function(event){
//     event.preventDefault();
// };

var option = { resGetPath: './dist/data/__lng__.json', lng: 'zh-TW' };
i18n.init(option, function(err, t) {
    router.run(function(Handler, state) {
        render(<Handler/>, document.getElementById('content'));
    });
});
