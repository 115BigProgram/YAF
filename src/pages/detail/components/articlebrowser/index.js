import React, { Component } from "react"
import { connect } from "react-redux"
import { MainWrapper, ButtonsWrapper, GraphWrapper, HistoryWrapper, ButtonWrapper, TitleWrapper } from "./style"
import Graph from './graph'
import { actionCreators } from "../../store"

class ArticleBrowser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttons: ["获得前驱", "浏览文章", "关闭节点"],
            curButton: 0
        }
    }
    componentDidMount() {
        console.log(this.props)
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

    render() {
        const {
            topicGraph
        } = this.props
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
                    <div>历史记录：</div>
                    <div>ARTICLE_1</div>
                    <div>ARTICLE_2</div>
                </HistoryWrapper>
            </div>
        )
    }
}

const mapState = state => ({
    topicGraph: state.getIn(["detail", "topicGraph"]),
    buttons: state.getIn(["detail", "articleBrowserButtons"]),
    curButton: state.getIn(["detail", "articleBrowserActiveButton"])
})

const mapDispatch = dispatch => ({
    handleChangeButton(idx) {
        dispatch(actionCreators.changeArticleBrowserActiveButton(idx))
    }
})

export default connect(
    mapState,
    mapDispatch
)(ArticleBrowser)


