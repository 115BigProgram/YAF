import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DetailWrapper, Header, Content } from "./style";
import MarkdownRenderer from "../../markdown/index"
import { actionCreators } from "./store";
import ReactMarkdown from "react-markdown"

class Detail extends PureComponent {
  render() {
    let input="# test \n [ ] 123 $$ A $$"
    return (
      <DetailWrapper>
        <Header>{this.props.title}</Header>
        <MarkdownRenderer source={this.props.content}></MarkdownRenderer>
      </DetailWrapper>
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
