var React = require('react');
var i18n = require('i18next-client');
var _ = require('underscore');

const Router = require('react-router');
const Navigation = Router.Navigation;
const State = Router.State;
const SwitchButton = require('../../common/SwitchButton');
const AutoAddres = require('./AutoAddres');
const InputField = require('./InputField'); // 輸入框
const FormAction = require('../../../actions/for_view/FormActionCreators');
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
    _goAddressDetail: function(id) {
        var params = {
            addressId: id
        };
        this.transitionTo('account');
        let transTo = this.transitionTo;
        setTimeout(function() {
            transTo('addressdetail', params);
        }, 100);

        FormAction.closePopFrom();

    },
    render: function() {
        var _t = i18n.t;
        let infoItem = [];
        let departments = this.props.value;
        let formValue = this.props.formValue;
        let addresses = this.state.addresses;
        let check = this.state.check;
        let self = this;
        let Route = this.getPathname();
        let isDetailPage = Route.indexOf('detail') != -1;

        if (departments !== undefined) {
            if (departments.length > 0) {
                // 地址列表
                _.map(departments, function(data, i) {
                    let addressClick = self._goAddressDetail.bind(null, data.department_id);
                    infoItem.push(
                        <div key ={i} className="div_tr tr_frame">
                        <div className="div_td text" >
                            {_t("common.address")}
                        </div>
                        <div className="div_td field_text_address">
                            {data.address}
                            <span className="allow_btn" onClick={addressClick}>
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
        console.log('formValue', JSON.stringify(formValue));
        if (isDetailPage && formValue.takeAddressToInput) {
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




module.exports = AddressFrame;
