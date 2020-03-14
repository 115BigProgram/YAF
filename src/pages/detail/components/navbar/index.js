import React,{ Component } from "react"
import {connect} from "react-redux"
import { Anchor } from 'antd';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import {TopNavBarHeight} from "../../../../constvars"

class MdNavBar extends Component{
    render(){
        return (
        <Anchor>
            <MarkNav 
            source={this.props.source}
            headingTopOffset={TopNavBarHeight}></MarkNav>
        </Anchor>
        )
    }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(
    mapState,
    mapDispatch
)(MdNavBar)