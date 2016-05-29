var React = require('react');
var i18n = require('i18next-client');
var _ = require('underscore');
var ReactBootstrap = require('react-bootstrap')
  , Input = ReactBootstrap.Input;

require('./_style');


var SearchBar = React.createClass({
        getInitialState: function() {
            return {
                value:''
            };
        },
        _focus: function() {

        },
        _handelSubmit:function(){
            let value = this.state.value;
            this.props.submit(value);
        },
        _handelKeyup:function(event){
            if(event.keyCode == 13){
                this._handelSubmit();
            }
        },
        _handleChange : function (e){
            this.setState(
            {
                value: e.target.value
            });

            if(this.props.searchType != 'notice_account_search'){
                this.props.onChange( e.target.value);
            }
        },
        _clear : function(){
            this.setState(
            {
                value:""
            });
            if(this.props.searchType != 'notice_account_search'){
                this.props.onChange("");
            }
        },
        render: function() {
            var _t=i18n.t;
            const __search = _t('common.searchString'); //請輸入搜尋內容
            const __send   = _t('common.send'); //請輸入搜尋內容
            let haveButton= false;
            if(this.props.searchType == 'notice_account_search'){
                haveButton= true;
            }

            let buttonStyle = "input_btn";
            let DelBtn = [];
            if(!_.isEmpty(this.state.value)){
                DelBtn.push(
                    <span className="delBtn" onClick={this._clear}> <span className="ic_icon_delete_content"></span> </span>
                );
                buttonStyle +=" active";
            }

            let Button = [];

            if(haveButton){
                Button.push(
                    <Input
                        type="button"
                        value ={__send}
                        groupClassName={buttonStyle}
                        onClick={this._handelSubmit}  />
                );
            }
            return (
                <div className="SearchBar" >
                    <span className="ic_search ic_icon_search"></span>
                    <Input
                        type="search"
                        value={this.state.value}
                        placeholder={__search}
                        hasFeedback
                        ref="search"
                        groupClassName="group-class"
                        wrapperClassName="wrapper-class"
                        labelClassName="label-class"
                        autoFocus={this.props.focus}
                        onChange={this._handleChange}
                        onKeyDown={this._handelKeyup}
                    />
                    {DelBtn}
                    {Button}
                </div>
            );
        }
});


module.exports = SearchBar;
