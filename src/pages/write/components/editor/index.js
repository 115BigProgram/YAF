import React, { Component } from 'react'
import Editor from 'for-editor'
import { connect } from 'react-redux'
import { actionCreators as headerActionCreators } from "../../../../common/header/store"
import { WRITE_TOOL_BAR } from "../../../../common/header/store/constants"
import Toolbar from "../toolbar"

class WebSiteEditor extends Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
    }

    handleChange(value) {
        console.log(value)
        this.setState({
            value
        })
    }

    componentDidMount() {
        this.props.showToolBar()
    }

    render() {
        let toolbar = {
            img: true, // 图片
            link: true, // 链接
            code: true, // 代码块
            preview: true, // 预览
            expand: true, // 全屏
            /* v0.0.9 */
            undo: true, // 撤销
            redo: true, // 重做
            save: true, // 保存
            /* v0.2.3 */
            subfield: true, // 单双栏模式
        }
        const { value } = this.state
        return (
            <div>
                <Toolbar/>
                <Editor value={value} onChange={(value) => this.handleChange(value)} toolbar={toolbar} />
            </div>
        )
    }
}

const mapState = state => ({

})

const mapDispatch = dispatch => ({
    showToolBar() {
        dispatch(headerActionCreators.changeToolBar(WRITE_TOOL_BAR))
    }
})

export default connect(
    mapState,
    mapDispatch
)(WebSiteEditor)