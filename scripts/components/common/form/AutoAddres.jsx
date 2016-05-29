var React = require('react');
var i18n = require('i18next-client');
var _ = require('underscore');
const Tool = require('../../../utils/ToolsUtils');
const TextField = require('material-ui/lib/text-field');
const FormAction = require('../../../actions/for_view/FormActionCreators');

const AutoAddres = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value
        };
    },
    _addressPush: function(addresses) {
        FormAction.changeInput(
            "new_address",
            addresses
        );
    },
    _departmentPush: function(department_id) {
        console.log('department_id', department_id);
        FormAction.changeInput(
            "department_id",
            department_id
        );
    },
    _handelBlur: function() {
        let self = this;
        let string = this.state.value;
        let addressList = JSON.parse(Tool.decode(sessionStorage._addressList));
        let addressAll = _.filter(addressList, function(data) {
            return (data.address.indexOf(string) != -1);
        });
        let addresses = _.map(addressAll, function(data) {
            return data;
        });
        let check = false;
        let error2Text = "";
        if (_.size(addresses) == 1) {
            check = true;
            error2Text = "";
            self._addressPush(addresses);

        } else {
            error2Text = "无法新增，请先确认有无此住址";
            self._addressPush("");
        }
        if (string == "") {
            error2Text = "";
            check = "";
            self._addressPush("");
        }

        this.setState({
            error2Text: error2Text
        });

        if (this.props.haveNoAddres) {
            // 無帶入地址時
            if (check === true) {
                let department_id = addresses[0].department_id;
                this._departmentPush(department_id);
            } else {
                this._departmentPush("");
            }
        }


        this.props.handelcheck(check, addresses);
        FormAction.blurInput();
    },
    _handleInputChange(e) {
        let value = e.target.value;
        this.setState({
            value: value
        });
        FormAction.changeInput(
            "addressString",
            value
        );
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
        let hintText = "請輸入地址";
        return (
            <TextField
                style={fieldStyle}
                underlineStyle={underlineStyle}
                underlineFocusStyle={underlineFocusStyle}
                placeholder={this.props.placeholder}
                hintText={hintText}
                hintStyle={{top: '5px'}}
                value={value}
                onChange={this._handleInputChange}
                onBlur={this._handelBlur}
                errorText={this.state.error2Text}
                errorStyle={{color:'#eb5767',bottom:"-3px"}}
            />
        );
    }
});




module.exports = AutoAddres;
