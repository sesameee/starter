var React = require('react');
var i18n = require('i18next-client');
if (!window.Intl) {
    require('intl');
    require('../../../utils/zh');
}
var _ = require('underscore');
import { Dialog, RaisedButton } from 'material-ui';
const ChangeUserImage = require('../../common/changeImage/ChangeUserImage');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const FormAction = require('../../../actions/for_view/FormActionCreators');
const FormeStore = require('../../../stores/FormStore');
const MyRawTheme = require('../../../constants/Color');
const FormType = require('./FormType');
const CropImage = require('../CropImage.jsx');

const SubmitBtn = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
        };
    },

    render: function() {

        let BtnTitle = this.props.text;
        if (this.props.isDisable) {
            if (this.props.type == "edit") {
                BtnTitle = "儲存變更";
            } else {
                BtnTitle = "請確認完所有必填資訊";
                if (this.props.error) {
                    BtnTitle = this.props.text;
                }
            }
        }
        if (this.props.error) {
            BtnTitle = this.props.errorButton;
        }

        return (
            <RaisedButton
                primary={true}
                disabled={this.props.isDisable}
                onClick={this.props.onClick}
                label={BtnTitle} />
        );
    }
});

const DeleteBtn = React.createClass({
    getInitialState: function() {
        return {
            doubleClick: false
        };
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
        };
    },
    _handelClick: function() {
        if (this.state.doubleClick === false) {
            this.setState({
                doubleClick: true
            });
        } else {
            let formValue = this.props.formValue;
            FormAction.delAccount(formValue);
        }
    },
    render: function() {
        var _t = i18n.t;
        let BtnTitle = 'common.delAccount';
        let doubleClick = this.state.doubleClick;
        if (doubleClick) {
            BtnTitle = 'common.clickDelAccount';
        }
        return (
            <span style={{paddingRight:"10px"}}>
                <RaisedButton
                    secondary={true}
                    onClick={this._handelClick}
                    label={_t(BtnTitle)} />
            </span>
        );
    }
});

const PopupFrame = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext: function() {
        return {
            muiTheme: this.state.muiTheme
        };
    },
    componentWillMount: function() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            primary1Color: "#565a5c",
            primary2Color: "#fdc057",
            alternateTextColor: "#fff",
            textColor: "#58595b",
            desktopKeylineIncrement: "40px"
        });

        this.setState({ muiTheme: newMuiTheme });
    },
    getInitialState: function() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
            modal: false
        };
    },
    _handleRequestClose() {
        // if (!buttonClicked && this.state.modal) return;
        FormAction.closePopFrom();
    },
    render: function() {
        let Title = this.props.header;
        Title.push(
            <div className="closeDialog" onClick={this._handleRequestClose}>
                <div className="icon">
                    <span className="ic_form_close item"></span>
                </div>
            </div>
        );
        console.log('Title', Title);
        let bodystyle = {
            padding: "15px",
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "474px"
        };

        return (
            <span className="Popup_frame">
                <Dialog
                    contentClassName="dialog_frame"
                    ref="scrollableContentDialog"
                    bodyStyle ={bodystyle}
                    title={Title}
                    modal={this.state.modal}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    open={this.props.openDialog}
                    onRequestClose={this._handleRequestClose}>

                    {this.props.children}

                </Dialog>
            </span>
        );
    }

});

const getStateFromStores = function() {
    return {
        openDialog: FormeStore.getFormOpen(),
        formType: FormeStore.getFormType(),
        formValue: FormeStore.getFormValue(),
        formBtnDisable: FormeStore.getFormBtnDisable(),
        form: FormeStore.getFormStructure()
    };
};


const PopupForm = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },
    componentDidMount: function() {
        FormeStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        FormeStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(getStateFromStores());
    },
    _handleUploadInput: function() {
        // var el = document.getElementById("inputUserImage");
        // if (el) {
        //     el.click();
        // }
        // 暫時先不要可以換圖
    },
    _handelClick: function() {
        let formType = this.state.formType;
        let formValue = this.state.formValue;
        FormAction.sendForm(formType, formValue);
        FormAction.closePopFrom();
    },
    render: function() {

        var _t = i18n.t;

        // let formType = this.state.formType;
        let formValue = this.state.formValue;
        let formType = this.state.formType;
        let form = this.state.form;
        console.log('form', form, 'formValue', formValue, 'formType', formType);
        let Item = [];
        let Title = [];
        let BtnText = "";
        let formButton;

        if (form) {
            console.log('formValue', formValue);
            let picFrame;
            if (form.havePic) {
                picFrame = <ChangeUserImage />;
                if (formValue.Image !== undefined && formValue.Image != "") {
                    picFrame = <ChangeUserImage UserImage={formValue.Image} />;
                }
            }

            Title.push(
                <div className="header row">
                    <div className="col-md-8 text">
                        {_t(form.title)}
                    </div>
                    <div className="col-md-4 userImage" onClick={this._handleUploadInput}>
                        {picFrame}
                    </div>
                </div>
            );
            formButton = form.type;

            if (form.content) {
                let content = form.content;

                BtnText = form.button;

                _.map(content, function(data, index) {
                    let title = data.title;
                    let field = data.field;
                    let InputItem = [];
                    for (var i = 0; i < field.length; i++) {
                        let input = field[i];
                        let keys = input.key;
                        let type = input.type;
                        let setting = input.setting;
                        let text = input.text;
                        let comment = input.comment;

                        if (type != "EditFrame" && type != "TextPlace" && type != "AddressFrame") {

                            InputItem.push(
                                <div key ={i} className="div_tr tr_frame">
                                    <div className="div_td text" >
                                        {_t(text)}
                                    </div>

                                    <FormType
                                        keys = {keys}
                                        value = {formValue[keys]}
                                        fieldType = {type}
                                        setting = {setting}
                                        text = {text}
                                        formValue = {formValue}
                                        comment = {_t(comment)}
                                    />

                                </div>
                            );
                        } else if (type == "SwitchButtonInput") {

                            InputItem.push(
                                <div key ={i} className="div_tr tr_frame">
                                    <FormType
                                        keys = {keys}
                                        value = {formValue[keys]}
                                        fieldType = {type}
                                        content = {formValue[keys]}
                                        setting = {setting}
                                        text = {_t(text)}
                                        formValue = {formValue}
                                        comment = {_t(comment)}
                                    />
                                </div>
                            );

                        } else {
                            //沒有標題的
                            InputItem.push(
                                <div key ={i} className="div_tr tr_frame">
                                    <FormType
                                        keys = {keys}
                                        value = {formValue[keys]}
                                        fieldType = {type}
                                        content = {formValue[keys]}
                                        setting = {setting}
                                        text = {_t(text)}
                                        formValue = {formValue}
                                        comment = {_t(comment)}
                                    />
                                </div>
                            );
                        }

                    }

                    Item.push(
                        <div key ={index}>
                            <div className = "title">
                                {_t(title)}
                            </div>
                            <div className = "div_table table">
                                <div className = "div_tbody">
                                    {InputItem}
                                </div>
                            </div>
                        </div>
                    );
                });
            }

        }
        let delBtn;
        if (formType == "editAccount" || formType == "haveAccount") {
            // 專門刪除帳號用
            delBtn = <DeleteBtn formValue={formValue} />;
        }


        return (
            <span className="Popup_frame">
                <CropImage shape="circle" />
                <PopupFrame
                    header = {Title}
                    openDialog = {this.state.openDialog}
                    >
                    <div className="form_frame">
                        {Item}
                        <div className="SubmitBtn">
                            {delBtn}
                            <SubmitBtn
                                onClick={this._handelClick}
                                isDisable={this.state.formBtnDisable}
                                text ={_t(BtnText)}
                                type ={formButton}
                                error={formValue.error}
                                errorButton={_t(form.errorButton)}

                            />
                        </div>
                    </div>
                </PopupFrame>
            </span>
        );
    }

});


module.exports = PopupForm;
