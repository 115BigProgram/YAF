import React, { Component } from "react"
import { connect } from "react-redux"
import { TabGroupWrapper, TabWrapper, ListAreaWrapper, CurrentTopicWrapper, RecommendListWrapper, BrowserListWrapper } from "./style"
import ListItem from "./components/item"
import { BlankWrapper, BrowserToolBar, PageNumWrapper, ToolBarButton } from "../articlebrowser/style"
import { Button, Input } from "antd"
import { actionCreators } from "../../store"

class BrowserList extends Component {
    constructor(props) {
        super(props)
        this.state = { showRecommend: true, browserSearchKeyword: "" }
        this.getRecommendList = this.getRecommendList.bind(this)
        this.getBrowserList = this.getBrowserList.bind(this)
        this.handleClickTab = this.handleClickTab.bind(this)
    }

    handleClickTab(show) {
        this.setState({ showRecommend: show })
    }

    getRecommendList() {
        const {
            recommendList
        } = this.props

        if (recommendList !== undefined && recommendList.length !== undefined && recommendList.length != 0) {
            return recommendList.map((e, idx) => {
                return (
                    <ListItem id={e.id} content={e.content} title={e.title} key={idx}></ListItem>
                )
            })
        } else {
            return (
                <BlankWrapper>无推荐内容</BlankWrapper>
            )
        }
    }

    getBrowserList() {
        const {
            browserList,
            browserTotPage,
            browserCurPage,
            browserKw,
            changePage,
            updateKw,
            search
        } = this.props

        let browserItems = [(<BlankWrapper>内容为空</BlankWrapper>)]
        if (browserList.length !== undefined && browserList.length != 0) {
            browserItems = browserList.map((e, idx) => {
                return (
                    <ListItem id={e.id} content={e.content} title={e.title} key={idx}></ListItem>
                )
            })
        }
        return (
            <div>
                <BrowserToolBar>
                    <Input
                        placeholder={"请输入关键字"}
                        value={browserKw}
                        onChange={(e) => { updateKw(e.target.value) }}
                    ></Input>
                    <ToolBarButton
                        onClick={() => { search() }}
                    >搜索</ToolBarButton>
                    <Button onClick={() => { changePage(false) }}>上一页</Button>
                    <PageNumWrapper>
                        {(browserCurPage + 1) + "/" + (browserTotPage)}
                    </PageNumWrapper>
                    <Button onClick={() => { changePage(true) }}>下一页</Button>
                </BrowserToolBar>
                <div>
                    {
                        browserItems
                    }
                </div>
            </div>)

    }

    render() {
        const {
            currentTopic
        } = this.props

        const {
            showRecommend
        } = this.state

        return (
            <div>
                <CurrentTopicWrapper>{" " + currentTopic}</CurrentTopicWrapper>
                <TabGroupWrapper>
                    <TabWrapper active={showRecommend} className="first" onClick={() => { this.handleClickTab(true) }}>推荐文章</TabWrapper>
                    <TabWrapper active={!showRecommend} className="last" onClick={() => { this.handleClickTab(false) }}>浏览文章</TabWrapper>
                </TabGroupWrapper>
                <ListAreaWrapper>
                    <RecommendListWrapper show={showRecommend}>
                        {
                            this.getRecommendList()
                        }
                    </RecommendListWrapper>
                    <BrowserListWrapper show={!showRecommend}>
                        {
                            this.getBrowserList()
                        }
                    </BrowserListWrapper>
                </ListAreaWrapper>
            </div>
        )
    }
}

const mapState = state => ({
    recommendList: state.getIn(["detail", "articlesToRecommend"]),
    browserList: state.getIn(["detail", "articlesToBrowser"]),
    currentTopic: state.getIn(['detail', "articlesCurrentTopic"]),
    browserTotPage: state.getIn(['detail', "articlesToBrowserTotPage"]),
    browserCurPage: state.getIn(['detail', "articlesToBrowserPage"]),
    browserKw: state.getIn(['detail', "articlesToBrowserKeyword"]),
})

const mapDispatch = dispatch => ({
    changePage(next) {
        dispatch(actionCreators.changeBrowserListPage(next))
    },
    updateKw(kw) {
        dispatch(actionCreators.updateKeyword(kw))
    },
    search() {
        dispatch(actionCreators.searchBrowserList())
    }
})

export default connect(
    mapState,
    mapDispatch
)(BrowserList)