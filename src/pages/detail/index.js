import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DetailWrapper, Header, Content, ArticleWrapper, StepBarWrapper, ToolBarWrapper, EmptyDiv, FixedInStepBarWrapper } from "./style";
import MarkdownRenderer from "../../markdown/index"
import { actionCreators } from "./store";
import ArticleStepBar from "./components/stepbar";

class Detail extends PureComponent {
  render() {
    return (
      <div>
        <DetailWrapper>
        <StepBarWrapper>
          <FixedInStepBarWrapper>
          <ArticleStepBar/>
          </FixedInStepBarWrapper>
        </StepBarWrapper>
        <ArticleWrapper>
          <Header>{this.props.title}</Header>
          <MarkdownRenderer source={this.props.content}></MarkdownRenderer>
        </ArticleWrapper>
      </DetailWrapper>
      </div>
    );
  }

  componentDidMount() {
    this.props.getDetail(this.props.match.params.id);
  }
}

const mapState = state => ({
  title: state.getIn(["detail", "title"]),
  content: state.getIn(["detail", "content"])
});

const mapDispatch = dispatch => ({
  getDetail(id) {
    dispatch(actionCreators.getDetail(id));
  }
});

export default connect(
  mapState,
  mapDispatch
)(withRouter(Detail));
