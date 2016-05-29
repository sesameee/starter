var React = require('react');
var i18n = require('i18next-client');
var _ = require('underscore');
const Tool = require('../../../utils/ToolsUtils');
const FormAction = require('../../../actions/for_view/FormActionCreators');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const DatePickerField = React.createClass({
    formatDate(date) {
        if (date.getFullYear() === undefined) {
            return;
        } else {
            return date.getFullYear() + "/" + Tool.padLeft((date.getMonth() + 1), 2) + "/" + Tool.padLeft(date.getDate(), 2);
        }
    },
    getInitialState: function() {
        return {
            value: this.props.value
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ value: nextProps.value });
    },
    _handleChange: function(event, date) {
        FormAction.changeInput(
            this.props.keys,
            date
        );
        this.setState({
            value: date
        });
    },
    _handelBlur: function() {
        FormAction.blurInput();
    },
    render: function() {
        let DatePickerSyle = {
            width: "100%",
            fontSize: "14px"
        };
        let time = this.state.value;
        if (time !== undefined) {
            if (time == "0000-00-00 00:00:00" || time == "") {
                time = null;
            } else {
                time = new Date(this.state.value);
            }
        }
        return (
            <DatePicker
                hintText="請填寫日期"
                style={{bottom:"0px", position: "relative"}}
                textFieldStyle={DatePickerSyle}
                formatDate={this.formatDate}
                DateTimeFormat={Intl.DateTimeFormat}
                wordings={{ok: '確認', cancel: '取消'}}
                onChange={this._handleChange}
                onBlur={this._handelBlur}
                value={time}
                locale="zh-Hant-TW" />
        );
    }
});



module.exports = DatePickerField;
