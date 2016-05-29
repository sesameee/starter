var React = require('react');
var Router = require('react-router');
var ReactPropTypes = React.PropTypes;



var Header = React.createClass({
    mixins: [Router.State],
    propTypes: {
        isLoggedIn: ReactPropTypes.bool,
        email: ReactPropTypes.string
    },

    render: function() {
        if (this.props.isLoggedIn) {
            return (
                <div>
					login in
				</div>
            );

        } else {
            return (
                <div></div>
            );

        }
    }
});

module.exports = Header;
