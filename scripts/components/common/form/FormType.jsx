var React = require('react');
if (!window.Intl) {
    require('intl');
    require('../../../utils/zh');
}
var i18n = require('i18next-client');
var _ = require('underscore');
const Tool = require('../../../utils/ToolsUtils');
const TextField = require('material-ui/lib/text-field');
const FormAction = require('../../../actions/for_view/FormActionCreators');
//const FormAction = require('../../../actions/for_view/FormActionCreators');
/* beautify preserve:start */
const SwitchButton        = require('../../common/SwitchButton');
const SwitchButtonInput   = require('../SwitchButtonInput');
const EditFrame           = require('./EditFrame'); // 多個新增刪除
const InputField          = require('./InputField'); // 輸入框
const AddressFrame        = require('./AddressFrame'); // 地址
const DatePickerField     = require('./DatePickerField'); // 日期
const TextPlace           = require('./TextPlace'); // 文字區域 textarea
const SelectDown          = require('./SelectDown'); // 下拉式選單
/* beautify preserve:end */



const InputUnit = React.createClass({
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
        var _t = i18n.t;
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
        let unit = this.props.comment;



        return (
            <span className="div_table" style={{width:"100%"}}>
                <span className="div_tr">
                    <span className="div_td">
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
                    </span>
                    <span className="div_td"> {_t(unit)} </span>
                </span>
            </span>
        );
    }
});

const FormType = React.createClass({

    render: function() {

        console.log('FormType all props', this.props);
        var a = 1;
        /* beautify preserve:start */
        var value         = this.props.value;
        var keys          = this.props.keys;
        var fieldType     = this.props.fieldType;
        var setting       = this.props.setting;
        var text          = this.props.text;
        var formValue     = this.props.formValue;
        var comment       = this.props.comment;
        /* beautify preserve:end */
        var InputItem = [];
        var className = "div_td ";

        switch (fieldType) {

            case 'ShowString':
                //只顯示字串
                className += "field_text";
                InputItem.push(
                    <span key={a}>{value}</span>
                );

                break;

            case 'InputField':
                //輸入框
                className += "field";
                InputItem.push(
                    <span key={a}>
                        <InputField keys={keys}  value={value} placeholder={comment}/>
                    </span>
                );

                break;

            case 'SwitchButton':
                //單選按鈕
                className += "field";
                InputItem.push(
                    <div key={a} className="field_line">
                        <SwitchButton
                            setting={setting}
                            keys={keys}
                            value={value}
                            formContent={formValue}
                        />

                    </div>
                );
                break;

            case 'DatePickerField':
                //日期選單
                className += "field";
                InputItem.push(
                    <span key={a}>
                        <DatePickerField
                            keys={keys} value={value}
                        />
                    </span>
                );
                break;

            case 'EditFrame':
                //增減表單
                InputItem.push(
                    <span key={a}>
                        <EditFrame
                            text={text}
                            keys={keys}
                            value={value}
                            setting={setting}
                            formContent={formValue}
                        />
                    </span>
                );
                break;

            case 'SelectDown':
                //下拉選單
                InputItem.push(
                    <span key={a}>
                        <SelectDown
                            valueSelect={keys}
                            keys={keys} value={value}
                            datas={formValue[setting]}
                        />
                    </span>

                );
                break;

            case 'TextPlace':
                //文字區塊
                InputItem.push(
                    <span key={a}>
                        <TextPlace
                            valueSelect={keys}
                            keys={keys}
                            value={value}
                            placeholder={comment}
                        />
                    </span>

                );
                break;

            case 'AddressFrame':
                // 地址資訊
                InputItem.push(
                    <span key={a}>
                        <AddressFrame
                            value={value}
                            setting={setting}
                            formValue ={formValue}
                        />
                    </span>
                );
                break;

            case 'SwitchButtonInput':
                //單選有單位
                InputItem.push(
                    <span key={a}>
                        <SwitchButtonInput
                            value={value}
                            comment={comment}
                            keys = {keys}
                            formValue ={formValue}
                        />
                    </span>
                );
                break;
            case 'InputUnit':
                // 有單位的輸入框
                className += "field";
                InputItem.push(
                    <span key={a}>
                        <InputUnit
                            value={value}
                            comment={comment}
                            formValue ={formValue}
                        />
                    </span>
                );
                break;
        }
        return (<div className={className}>{InputItem}</div>);
    }
});


module.exports = FormType;
