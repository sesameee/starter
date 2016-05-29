var React = require('react');
if (!window.Intl) {
    require('intl');
    require('../../../utils/zh');
}

var _ = require('underscore');

const DropDownMenu = require('material-ui/lib/drop-down-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const FormAction = require('../../../actions/for_view/FormActionCreators');
const MyRawTheme = require('../../../constants/Color');


// 為了可多編輯做的
const SelectDown = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ value: nextProps.value });
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
        };
    },
    _handelClick(e, index, value) {
        // let value = e.target.value;
        console.log('value', value);
        FormAction.changeEditInput(
            this.props.changekeys,
            this.props.indexs,
            value
        );
        this.setState({
            value: value
        });
        FormAction.blurInput();
    },

    render: function() {
        var self = this;
        let Item = [];
        let selctedData = this.props.selctedData;
        let options = this.props.options;
        if (_.size(options) > 0) {
            _.map(options, function(data) {
                if (_.indexOf(selctedData, data.community_group_id) == -1) {
                    //代表找得到
                    Item.push(
                        <MenuItem value={data.community_group_id} primaryText={data.title}/>
                    );
                } else {
                    Item.push(
                        <MenuItem value={data.community_group_id} primaryText={data.title} disabled={true}/>
                    );
                }
            });
        }

        return (
            <DropDownMenu
                primary={true}
                onChange={this._handelClick}
                style={{width:"100%",top:"-4px"}}
                menuStyle={{width:"100%"}}
                autoWidth={false}
                underlineStyle={{margin: "-1px 0px"}}
                labelStyle={{paddingLeft: "0px"}}
                iconStyle={{right:"10px"}}
                value={self.state.value}
            >
                {Item}
            </DropDownMenu>
        );
    }
});


const FormType = React.createClass({
    render: function() {
        var a = 1;
        var value = this.props.value;
        var keys = this.props.keys;
        var fieldType = this.props.fieldType;
        var setting = this.props.setting;
        var text = this.props.text;
        var formContent = this.props.formContent;
        var placeholder = this.props.placeholder;
        var indexs = this.props.indexs;
        var changekeys = this.props.changekeys;
        var datas = this.props.datas;

        var InputItem = [];
        var className = " ";

        switch (fieldType) {


            case 'SelectDown':
                //下拉選單
                InputItem.push(
                    <span key={a}>
                            <SelectDown
                                valueSelect={keys}
                                changekeys={changekeys}
                                keys={keys} value={value}
                                indexs={indexs}
                                options={formContent[setting]}
                                selctedData={datas}
                            />
                        </span>

                );
                break;

        }
        return (<div className={className}>{InputItem}</div>);

    }

});


module.exports = FormType;
