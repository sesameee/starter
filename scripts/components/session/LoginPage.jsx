var React = require('react');
var ReactDOM = require('react-dom');
var i18n = require('i18next-client');
var SessionActionCreators = require('../../actions/for_view/SessionActionCreators.jsx');
var SessionStore = require('../../stores/SessionStore.jsx');
var RouteActionCreators = require('../../actions/for_view/RouteActionCreators.jsx');
var Constants = require('../../constants/Constants');
var APIEndpoints = Constants.APIEndpoints;
// var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var Padding = require('../common/PaddingHeight.jsx');
var sha256 = require('js-sha256');

var LoginPage = React.createClass({

    getInitialState: function() {
        return {
            errors: [],
            Login: SessionStore.isLoggedIn(),
            checked: true
        };
    },
    componentWillMount: function() {
        SessionActionCreators.logout();
    },

    componentDidMount: function() {

        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({
            errors: SessionStore.getErrors(),
            Login: SessionStore.isLoggedIn()
        });
    },

    _onSubmit: function(e) {
        e.preventDefault();
        this.setState({ errors: [] });
        var email = ReactDOM.findDOMNode(this.refs.email).value;
        var password = ReactDOM.findDOMNode(this.refs.password).value;
        var auto = ReactDOM.findDOMNode(this.refs.persistent).checked;
        var Enpassword = sha256(password + "2Qw!aS4b");
        SessionActionCreators.login(email, Enpassword, auto);
    },
    handleLoading: function() {
        setTimeout(function() {
            if (SessionStore.isLoggedIn()) {
                RouteActionCreators.redirect("main");
            }
        }, 2000);
    },
    _handleCheck: function() {
        var checked;
        if (this.state.checked) {
            checked = false;
        } else {
            checked = true;
        }
        this.setState({
            checked: checked
        });
    },

    render: function() {
        var __account = i18n.t('login.account'); //帳號
        var __password = i18n.t('login.password'); //密碼
        var __keep = i18n.t('login.keep'); //保持登入
        var __login = i18n.t('login.login'); //登入
        var __title = i18n.t('login.title'); //後台管理系統

        var img = "./dist/images/login_logo.jpg";
        var main_img = "./dist/images/login_image.jpg";
        return (

            <div className="login" onLoad={this.handleLoading}>
            <div className="header">
                <img src={img} width="150px" height="auto" className="img_Login" />
            </div>
            <div className="main_image">
                    <img src={main_img} width="695px" height="auto"  />
            </div>

            <div className="body">

                <div className="form">
                    <div className ="title">{__title}</div>
                    <form onSubmit={this._onSubmit}>
                        <div >
                            <input
                                type ="text"
                                name ="email"
                                ref  ="email"
                                className ="form-control"
                                placeholder ={__account}
                            />
                        </div>
                        <Padding height="10" />
                        <div >
                            <input
                                type="password"
                                name="password"
                                ref="password"
                                className="form-control"
                                placeholder ={__password}
                            />
                        </div>
                        <Padding height="10" />
                        <div>
                            <span className="primary_checkbox" >
                                <input
                                    type="checkbox"
                                    id="persistent"
                                    name="persistent"
                                    ref="persistent" defaultChecked
                                    checked={this.state.checked}
                                    onChange={this._handleCheck}
                                />
                                <label className="auto" htmlFor="persistent"><span className="label"></span>{__keep}</label>
                            </span>
                        </div>
                        <Padding height="10" />
                        <div >
                            <button type="submit" name="login_submit" className="btn btn-primary btn-block">{__login}</button>
                        </div>
                    </form>

                    <div  className="form_footer" align="center">
                        <span className="text">
                            <a href={APIEndpoints.PRIVACY} target="_blank" > 隱私權政策 </a>
                        </span>
                        <span className="line"> ｜ </span>
                        <span className="text">
                            <a href={APIEndpoints.SERVICE} target="_blank" >服務條款 </a>
                        </span>
                    </div>
                </div>


            </div>

        </div>
        );
    }
});






module.exports = LoginPage;
