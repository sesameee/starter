var React = require('react');
const FormAction = require('../../../actions/for_view/FormActionCreators');
const TextPlace = React.createClass({

    getInitialState: function() {
        return {
            value: this.props.value
        };
    },
    _handleChange: function(e) {
        this.setState({
            value: e.target.value
        });
        var value = e.target.value;
        FormAction.changeInput(
            this.props.keys,
            value
        );
    },
    _handleBlur: function() {
        FormAction.blurInput();
    },
    render: function() {
        return (
            <textarea rows="5"
                placeholder={this.props.placeholder}
                className="input_text textarea_style"
                onChange={this._handleChange}
                onBlur={this._handleBlur}
                defaultValue={this.state.value} >
           </textarea>

        );
    }
});



module.exports = TextPlace;
