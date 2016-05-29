var React = require('react');
var _ = require('underscore');
var i18n = require('i18next-client');
var _t = i18n.t;
const FormType = require('./FormTypeForEditFrame');
const FormAction = require('../../../actions/for_view/FormActionCreators');
const DeleteButton = React.createClass({
    render: function() {
        let delClassName = "DeleteButton";
        if (this.props.disable) {
            delClassName += " disable";
        }
        return (
            <span className={delClassName} onClick={this.props.onClick} >
                <span className="ic_delete ic_form_delete"></span>
            </span>
        );
    }
});

const AddButton = React.createClass({
    render: function() {
        return (
            <span className="AddButton" onClick={this.props.onClick} >
                <span className="ic_add ic_form_add"></span>
            </span>
        );
    }
});

const EditFrame = React.createClass({
    getInitialState: function() {
        return {
            datas: this.props.value
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            datas: nextProps.value
        });
    },
    _handelClick: function(value, allIds) {
        let datas = this.state.datas;
        let notBeSelectedIds = _.difference(allIds, datas);
        if (value == 'new_click') {
            var newArray = notBeSelectedIds[0];
            if (datas.length > 0) {
                datas.push(notBeSelectedIds[0]);
            } else {
                datas = [newArray];
            }
        } else {
            datas = _.filter(datas, function(data) {
                return (data != value);
            });
        }
        this.setState({
            datas: datas
        });

        FormAction.changeInput(
            this.props.keys,
            datas
        );
        FormAction.blurInput();
    },
    render: function() {

        let __add = _t('common.add');
        let Items = [];
        let Field;
        let datas = this.state.datas;
        let set = this.props.setting;
        let formContent = this.props.formContent;
        let key_S = this.props.keys;
        let group = formContent['group'];
        let group_ids = [];
        if (group !== undefined) {
            group_ids = _.map(group, function(data) {
                return data.community_group_id;
            });
        }
        let value = this.props.value;

        let self = this;
        if (!_.isEmpty(datas)) {
            _.map(datas, function(value, index) {
                if (set) {
                    let type = set['type'];
                    let text = set['text'];
                    let setting = set['setting'];
                    let keys = set['key_s'];
                    /* beautify preserve:start */
                    Field = <FormType
                                changekeys = { key_S } //該被更改的地方
                                keys = { keys } //選單要用的
                                value = { value }
                                fieldType = { type }
                                text = { _t(text) }
                                formContent = { formContent }
                                setting = { setting }
                                indexs = { index } //讓他知道array中第幾個
                                datas = { datas } //已選擇的資料
                            />;
                    /* beautify preserve:end */
                }
                let delAction = self._handelClick.bind(self, value, group_ids);
                let disable = false;
                if (datas.length == 1) {
                    // 只剩一個群組的時候不能刪除
                    delAction = "";
                    disable = true;
                }

                Items.push(
                    <div className="div_table w100" key={index}>
                        <div className="div_tbody">
                            <div className="div_tr tr_frame">
                                <div className="div_td bttn" >
                                    <DeleteButton  onClick={delAction} disable={disable} />
                                </div>
                                <div className="div_td btn_text" >
                                   {self.props.text}
                                </div>
                                <div className="div_td btn_field">
                                    {Field}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        if (group_ids.length > datas.length) {
            // 總群組數目 大於 已選擇的群組數目 == > 還可以新增群組
            Items.push(
                <div className="div_table w100" key={999}>
                    <div className="div_tbody">
                        <div className="div_tr tr_rame"  onClick={this._handelClick.bind(this,'new_click',group_ids)} >
                            <div className="div_td bttn" >
                                <AddButton />
                            </div>
                            <div className="div_td btn_field_add ">
                                <div className="field_button">
                                    {__add + this.props.text}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <span>
                {Items}
            </span>
        );
    }
});



module.exports = EditFrame;
