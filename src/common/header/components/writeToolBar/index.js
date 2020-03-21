import React, { Component } from "react"
import { connect } from "react-redux"
import { ToolBarWrapper, LineWrapper } from "./style"
import { actionCreators } from "../../../../pages/write/store"

class WriteToolBar extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <ToolBarWrapper>
                <div>提交</div>
            </ToolBarWrapper>
        )

    }
}

const mapState = state => ({
    domains: state.getIn(["write", "domains"]),
    topics: state.getIn(["write", "topics"])
})

const mapDispatch = dispatch => ({
    getDomain() {
        dispatch(actionCreators.getDomains())
    }
})

export default connect(
    mapState,
    mapDispatch
)(WriteToolBar)