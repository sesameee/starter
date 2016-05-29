var React = require('react');
if (!window.Intl) {
    require('intl');
    require('../../utils/zh');
}
var i18n = require('i18next-client');
var _ = require('underscore');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;

const TextField = require('material-ui/lib/text-field');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const SwitchButton = require('../common/SwitchButton');
const FormAction = require('../../actions/for_view/FormActionCreators');

const MyRawTheme = require('../../constants/Color');
const Tool = require('../../utils/ToolsUtils');
const EditFrame = require('./EditFrame');

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

const AddressFrame = React.createClass({
    //為了新增地址資訊 特製
    mixins: [Navigation, State],
    getInitialState: function() {
        return {
            check: ""
        };
    },
    _chnageCheck: function(check, addresses) {
        this.setState({
            check: check,
            addresses: addresses
        });
    },
    render: function() {
        var _t = i18n.t;
        let infoItem = [];
        let departments = this.props.value;
        let formValue = this.props.formValue;
        let addresses = this.state.addresses;
        let check = this.state.check;

        let Route = this.getPathname();
        let isDetailPage = Route.indexOf('detail') != -1;

        if (departments !== undefined) {
            if (departments.length > 0) {
                // 地址列表
                _.map(departments, function(data, i) {
                    infoItem.push(
                        <div key ={i} className="div_tr tr_frame">
                        <div className="div_td text" >
                            {_t("common.address")}
                        </div>
                        <div className="div_td field_text_address">
                            {data.address}
                            <span className="allow_btn">
                                <span className="icons ic_next_page"> </span>
                            </span>
                        </div>
                    </div>
                    );
                });
            }
        } else {
            infoItem.push(
                <div key ={0} className="div_tr tr_frame">
                    <div className="div_td text" >
                        {_t("common.name")}
                    </div>
                    <div className="div_td field_text">
                        <InputField
                            keys="account_name"
                            value={formValue['account_name']}
                        />
                    </div>
                </div>
            );
        }

        if (isDetailPage && formValue.account_id == "") {
            // 在地址詳細頁面使用新增帳號（所以account_id是空），會帶入地址
            infoItem.push(
                <div key ={formValue.department_id} className="div_tr tr_frame">
                    <div className="div_td text" >
                        {_t("Householder.addAddress")}
                    </div>
                    <div className="div_td field_text_address">
                        <div style={{width:"275px"}}>
                            {formValue.address}
                        </div>
                        <span className="allow_btn">
                            <span className="icons ic_checked" style={{fontSize: "24px"}}> </span>
                        </span>
                    </div>
                </div>
            );
            infoItem.push(
                <div key ="999" className="div_tr tr_frame">
                    <div className="div_td text" >
                        {_t("common.identity")}
                    </div>
                    <div className="div_td field_text_address">
                       <SwitchButton
                            setting="holder_name"
                            keys="owner"
                            value={formValue.owner}
                            formContent={formValue}
                        />
                    </div>
                </div>
            );
        } else {
            let style = { fontSize: "24px" };


            let checkBtn = <span className="icons ic_icon_delete_content" style={style}> </span>;
            if (check === true) {
                checkBtn = <span className="icons ic_checked" style={style}> </span>;
            } else if (check === "") {
                checkBtn = <span className="icons ic_form_add" style={style}> </span>;
            }

            infoItem.push(
                <div key ={formValue.department_id} className="div_tr tr_frame">
                    <div className="div_td text" >
                        {_t("Householder.addAddress")}
                    </div>
                    <div className="div_td field_text_auto">
                        <div >
                            <AutoAddres
                                value = {formValue.addressString}
                                handelcheck={this._chnageCheck}
                                haveNoAddres={departments === undefined}  />
                            <span className="allow_btn">
                                {checkBtn}
                            </span>
                        </div>
                    </div>
                </div>
            );
            if (check === true) {
                let owner = addresses[0].account_name == "" ? "true" : "false";
                let formValue = {
                    address: addresses[0].address,
                    department_id: addresses[0].department_id,
                    owner: owner,
                    holder_name: addresses[0].account_name
                };
                infoItem.push(
                    <div key ="999" className="div_tr tr_frame">
                        <div className="div_td text" >
                            {_t("common.identity")}
                        </div>
                        <div className="div_td field_text_address">
                           <SwitchButton
                                setting="holder_name"
                                keys="owner"
                                value={owner}
                                formContent={formValue}
                            />
                        </div>
                    </div>
                );
            }

        }

        return (<span>{infoItem}</span>);
    }
});

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

const TextPlace = React.createClass({

    getInitialState: function() {
        return {
            value: this.props.value
        };
    },
    handleChange: function(e) {
        this.setState({
            value: e.target.value
        });
        var value = e.target.value;
        FormAction.changeInput(
            this.props.keys,
            value
        );

    },
    render: function() {
        return (
            <textarea rows="5"
                placeholder={this.props.placeholder}
                className="input_text textarea_style"
                onChange={this.handleChange}
                defaultValue={this.state.value} >
           </textarea>

        );
    }
});

const SelectDown = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value
        };
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ value: nextProps.value });
    },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
        };
    },
    _handelClick(e, index, value) {
        FormAction.changeInput(
            this.props.keys,
            value
        );
        this.setState({
            value: value
        });
        FormAction.blurInput();
    },

    render: function() {
        let Item = [];
        let datas = this.props.datas;
        let value = this.state.value;


        _.map(datas, function(data, index) {
            Item.push(
                <MenuItem key={index} value={data.community_group_id} primaryText={data.title}/>
            );
        });
        if (value == '') {
            value = datas[0].community_group_id;
        }

        console.log('SelectDown', value);
        return (

            <DropDownMenu
                primary={true}
                onChange={this._handelClick}
                style={{width:"100%"}}
                menuStyle={{width:"100%"}}
                autoWidth={false}
                underlineStyle={{margin: "4px 0px"}}
                labelStyle={{paddingLeft: "0px",top:"-3px"}}
                iconStyle={{right:"10px"}}
                value={value}
            >
                {Item}
            </DropDownMenu>
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
        var placeholder   = this.props.placeholder;
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
                        <InputField keys={keys}  value={value} placeholder={placeholder}/>
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
                                placeholder={placeholder}
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

        }
        return (<div className={className}>{InputItem}</div>);

    }

});


module.exports = FormType;
