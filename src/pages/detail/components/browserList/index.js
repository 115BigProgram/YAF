import React, { Component } from "react"
import { connect } from "react-redux"
import { TabGroupWrapper, TabWrapper, ListAreaWrapper, CurrentTopicWrapper } from "./style"

class BrowserList extends Component {
    constructor(props) {
        super(props)
        this.getRecommendList = this.getRecommendList.bind(this)
        this.getBrowserList = this.getBrowserList.bind(this)
    }

    getRecommendList() {
        const {
            recommendList
        } = this.props
    }

    getBrowserList() {
        const {
            browserList
        } = this.props
    }

    render() {
        const {
            currentTopic
        } = this.props

        return (
            <div>
                <CurrentTopicWrapper>{currentTopic}</CurrentTopicWrapper>
                <TabGroupWrapper>
                    <TabWrapper className="first">推荐文章</TabWrapper>
                    <TabWrapper className="last">浏览文章</TabWrapper>
                </TabGroupWrapper>
                <ListAreaWrapper
                ></ListAreaWrapper>
            </div>
        )
    }
}

const mapState = state => ({
    recommendList: state.getIn(["detail", "articlesToRecommend"]),
    browserList: state.getIn(["detail", "articlesToBrowser"]),
    currentTopic: state.getIn(['detail',"articlesCurrentTopic"])
})

const mapDispatch = dispatch => ({
})

export default connect(
    mapState,
    mapDispatch
)(BrowserList)