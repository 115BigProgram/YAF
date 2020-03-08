import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DetailWrapper, Header, Content, ArticleWrapper, StepBarWrapper,  FixedInStepBarWrapper } from "./style";
import MarkdownRenderer from "../../markdown/index"
import { actionCreators } from "./store";
import ReadList from "./components/stepbar";

class Detail extends PureComponent {
  componentWillUnmount() {
    const {
      resetStore
    } = this.props
    resetStore()
  }

  render() {
    return (
      <div>
        <DetailWrapper>
        <StepBarWrapper show={this.props.showReadList}>
          <ReadList/>
        </StepBarWrapper>
        <ArticleWrapper>
          <MarkdownRenderer source={this.props.content}></MarkdownRenderer>
        </ArticleWrapper>
      </DetailWrapper>
      </div>
    );
  }

  componentDidMount() {
    this.props.getDetail(this.props.match.params.id);
    this.props.getReadList()
    this.props.showToolBar()
  }
}

const mapState = state => ({
  title: state.getIn(["detail", "title"]),
  content: state.getIn(["detail", "content"]),
  showReadList: state.getIn(["detail","showReadList"]),
  readList: state.getIn(["detail","readList"])
});

const mapDispatch = dispatch => ({
  getDetail(id) {
    dispatch(actionCreators.getDetail(id));
  },
  showToolBar(){
    dispatch(actionCreators.switchToolBar(true))
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
