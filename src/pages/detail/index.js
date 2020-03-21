import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DetailWrapper, Header, Content, ArticleWrapper, StepBarWrapper,  FixedInStepBarWrapper, NavBarWrapper } from "./style";
import MarkdownRenderer from "../../markdown/index"
import { actionCreators } from "./store";
import {actionCreators as headerActionCreator} from "../../common/header/store"
import {ARTICLE_TOOL_BAR}from "../../common/header/store/constants"
import ReadList from "./components/stepbar";
import MdNavBar from "./components/navbar"

class Detail extends PureComponent {
  componentWillUnmount() {
    const {
      resetStore
    } = this.props
    resetStore()
  }

  render() {
    const {content}=this.props
    return (
      <div>
        <DetailWrapper>
        <StepBarWrapper show={this.props.showReadList}>
          <ReadList/>
        </StepBarWrapper>
        <ArticleWrapper>
          <Header>{this.props.title}</Header>
          <MarkdownRenderer source={this.props.content}></MarkdownRenderer>
        </ArticleWrapper>
        <NavBarWrapper show={this.props.showArticleIndex}>
          <MdNavBar source={content}/>
        </NavBarWrapper>
      </DetailWrapper>
      </div>
    );
  }

  componentDidMount() {
    this.props.getDetail(this.props.match.params.id);
    //this.props.getReadList()
    this.props.showToolBar()
  }
}

const mapState = state => ({
  title: state.getIn(["detail", "title"]),
  content: state.getIn(["detail", "content"]),
  showReadList: state.getIn(["detail","showReadList"]),
  showArticleIndex: state.getIn(["detail","showArticleIndex"]),
  readList: state.getIn(["detail","readList"])
});

const mapDispatch = dispatch => ({
  getDetail(id) {
    dispatch(actionCreators.getDetail(id));
  },
  showToolBar(){
    dispatch(headerActionCreator.changeToolBar(ARTICLE_TOOL_BAR))
  },
  getReadList(){
    dispatch(actionCreators.getReadList(1))
  },
  resetStore(){
    console.log('invoked')
    dispatch(actionCreators.resetStore())
  }
});

export default connect(
  mapState,
  mapDispatch
)(withRouter(Detail));
