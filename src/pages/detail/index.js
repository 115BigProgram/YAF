import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DetailWrapper, Header, Content, ArticleWrapper,  GraphWrapper,  NavBarWrapper } from "./style";
import MarkdownRenderer from "../../markdown/index"
import { actionCreators } from "./store";
import { actionCreators as headerActionCreator } from "../../common/header/store"
import { ARTICLE_TOOL_BAR } from "../../common/header/store/constants"
import ReadList from "./components/stepbar";
import MdNavBar from "./components/navbar"
import TopicGraph from "./components/articlebrowser"

class Detail extends PureComponent {
  constructor(props){
    super(props)
  }

  componentWillUnmount() {
    const {
      resetStore
    } = this.props
    resetStore()
  }

  render() {
    const { content } = this.props
    return (
      <div>
        <GraphWrapper show={this.props.showReadList}>
          <TopicGraph />
        </GraphWrapper>

        <DetailWrapper>
          <ArticleWrapper>
            <Header>{this.props.title}</Header>
            <span style={{color: "#85A8EC",position:"relative",bottom:8}}>本文作者:{this.props.authorName}</span>
            <span style={{color: "#969696",position:"relative",bottom:8,left:20}}>最后发布于:{this.props.publishTime}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;浏览数:{this.props.readNum}</span>
            <span onClick={this.favorArticle.bind(this)} style={{cursor:"pointer",color: "#F08140", position:"relative",bottom:8,left:40}}><img width="20vw" height="20vw" src={this.props.logoSvg}/>收藏</span>
            <MarkdownRenderer source={this.props.content}></MarkdownRenderer>
          </ArticleWrapper>
          <NavBarWrapper show={this.props.showArticleIndex}>
            <MdNavBar source={content} />
          </NavBarWrapper>
        </DetailWrapper>
      </div>
    );
  }
  favorArticle()
  {
    this.props.favorArticle(this.props.match.params.id)
  }
  componentDidMount() {
    this.props.getDetail(this.props.match.params.id);
    //this.props.getReadList()
    this.props.showToolBar()
  }
}

const mapState = state => ({
  authorName:state.getIn(["detail","authorName"]),
  publishTime:state.getIn(["detail","publishTime"]),
  readNum:state.getIn(["detail","readNum"]),
  logoSvg:state.getIn(["detail","logoSvg"]),
  title: state.getIn(["detail", "title"]),
  content: state.getIn(["detail", "content"]),
  showReadList: state.getIn(["detail", "showReadList"]),
  showArticleIndex: state.getIn(["detail", "showArticleIndex"]),
  readList: state.getIn(["detail", "readList"])
});

const mapDispatch = dispatch => ({
  getDetail(id) {
    dispatch(actionCreators.getDetail(id));
  },
  favorArticle(id)
  {
    dispatch(actionCreators.favorArticle(id))
  },
  showToolBar() {
    dispatch(headerActionCreator.changeToolBar(ARTICLE_TOOL_BAR))
  },
  getReadList() {
    dispatch(actionCreators.getReadList(1))
  },
  resetStore() {
    console.log('invoked')
    dispatch(actionCreators.resetStore())
  }
});

export default connect(
  mapState,
  mapDispatch
)(withRouter(Detail));
