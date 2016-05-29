var React = require('react');
const FormAction = require('../../../actions/for_view/FormActionCreators');
const MyRawTheme = require('../../../constants/Color');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
var _ = require('underscore');
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




module.exports = SelectDown;
