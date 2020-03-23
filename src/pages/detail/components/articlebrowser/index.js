import React, { Component } from "react"
import { connect } from "react-redux"
import { MainWrapper, ButtonsWrapper, GraphWrapper, HistoryWrapper, ButtonWrapper, TitleWrapper, ListWrapper, ShowListButton, HistoryItemWrapper,HistoryTitleWrapper } from "./style"
import Graph from './graph'
import { actionCreators } from "../../store"
import List from "../browserList"

class ArticleBrowser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            browserListState: true
        }

        this.onClickBrowserListShowButton = this.onClickBrowserListShowButton.bind(this)
        this.getReadHistory = this.getReadHistory.bind(this)
    }
    componentDidMount() {
    }

    onClickBrowserListShowButton() {
        const {
            browserListState
        } = this.state

        this.setState({ browserListState: !browserListState })
    }

    getButtons() {
        const {
            buttons,
            curButton,
            handleChangeButton
        } = this.props

        return buttons.map((b, idx) => {
            return (
                <ButtonWrapper
                    active={idx == curButton}
                    key={idx}
                    onClick={() => { handleChangeButton(idx) }}
                >{b}
                </ButtonWrapper>
            )
        })
    }

    getReadHistory() {
        const {
            readHistory,
            currentHistory,
            handleClickHistory
        } = this.props

        let obj = readHistory.toJS()

        return obj.map((e, idx) => {
            return (
                <HistoryItemWrapper key={e.aid} active={currentHistory==idx}
                onClick={()=>{handleClickHistory(e.aid)}}>
                    {e.topic + ':' + e.title}
                </HistoryItemWrapper>
            )
        })
    }

    render() {
        const {
            topicGraph,
        } = this.props

        const {
            browserListState
        } = this.state
        let g = {}
        console.log(topicGraph)
        g.nodes = topicGraph.getNodes()
        g.links = topicGraph.getLinks()

        return (
            <div>
                <MainWrapper>
                    <ButtonsWrapper>
                        <TitleWrapper>工具栏</TitleWrapper>
                        {
                            this.getButtons()
                        }
                    </ButtonsWrapper>
                    <GraphWrapper>
                        <div>
                            <Graph graph={g}></Graph>
                        </div>
                    </GraphWrapper>
                </MainWrapper>
                <HistoryWrapper>
                    <HistoryTitleWrapper>历史记录:</HistoryTitleWrapper>
                    {
                        this.getReadHistory()
                    }
                </HistoryWrapper>
                <ShowListButton
                    onClick={this.onClickBrowserListShowButton}
                >
                    {browserListState ? "关闭" : "展开"}
                </ShowListButton>
                <ListWrapper show={browserListState}>
                    <List />
                </ListWrapper>
            </div>
        )
    }
}

const mapState = state => ({
    topicGraph: state.getIn(["detail", "topicGraph"]),
    buttons: state.getIn(["detail", "articleBrowserButtons"]),
    curButton: state.getIn(["detail", "articleBrowserActiveButton"]),
    readHistory: state.getIn(["detail", "readHistory"]),
    currentHistory: state.getIn(["detail", "currentHistory"])
})

const mapDispatch = dispatch => ({
    handleChangeButton(idx) {
        dispatch(actionCreators.changeArticleBrowserActiveButton(idx))
    },
    handleClickHistory(id){
        dispatch(actionCreators.changeDetailPageArticle(id))
    }
})

export default connect(
    mapState,
    mapDispatch
)(ArticleBrowser)


