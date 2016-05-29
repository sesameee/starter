var React = require('react');
var i18n = require('i18next-client');
var _ = require('underscore');
const Tool = require('../../../utils/ToolsUtils');
const TextField = require('material-ui/lib/text-field');
const FormAction = require('../../../actions/for_view/FormActionCreators');

const InputField = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ value: nextProps.value });
    },
    _handleError(value) {
        let detection = true;
        let error2Text = '';
        switch (this.props.keys) {
            case "email":
                detection = Tool.isEmail(value);
                error2Text = "格式有誤";
                break;
            case "mobile":
                detection = Tool.isMobile(value);
                error2Text = "格式有誤";
                break;
        }

        if (value == "" || value === undefined) {
            detection = true;
        }

        this.setState({
            error2Text: detection ? '' : error2Text
        });

        if (!detection) {
            FormAction.haveError(this.props.keys);
        } else {
            FormAction.noError(this.props.keys);
        }

    },
    _handleInputChange(e) {
        let value = e.target.value;
        FormAction.changeInput(
            this.props.keys,
            value
        );
        this.setState({
            value: value
        });

    },
    _handelBlur: function() {
        this._handleError(this.state.value);
        FormAction.blurInput();
    },
    render: function() {
        let fieldStyle = {
            width: "100%",
            height: "36px",
            fontSize: "14px"
        };

        let underlineStyle = {
            bottom: "2px"
        };

        let underlineFocusStyle = {
            borderColor: "#fdc057"
        };
        let value = this.state.value;
        let hintText = this.props.hintText;

        return (
            <TextField
                style={fieldStyle}
                underlineStyle={underlineStyle}
                underlineFocusStyle={underlineFocusStyle}
                placeholder={this.props.placeholder}
                hintText={hintText}
                hintStyle={{top: '0px'}}
                value={value}
                onChange={this._handleInputChange}
                onBlur={this._handelBlur}
                errorText={this.state.error2Text}
                errorStyle={{color:'#eb5767',bottom:"-3px"}}
            />
        );
    }
});





module.exports = InputField;
