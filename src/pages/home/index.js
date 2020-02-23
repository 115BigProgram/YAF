import React, { Component } from "react";
import { connect } from "react-redux";
import Topic from "./components/Topic";
import List from "./components/List";
import Recommend from "./components/Recommend";
import Writer from "./components/Writer";
import { actionCreators } from "./store";
import {BackTop } from "./style";

import { HomeWrapper, HomeLeft, HomeRight,TagWrapper,TagItem } from "./style";

class Home extends Component {
  handleScrollTop() {
    window.scrollTo(0, 0);
  }


  getTags() {
    const {tags}=  this.props

    const tagsItem = []
    tags.map((tag, idx) => {
      tagsItem.push(
          <TagItem  key={idx}>
            {tag}
          </TagItem>
      )
    })

    return tagsItem
  }

  render() {
    return (
        <div>
          <TagWrapper>
            { this.getTags() }
          </TagWrapper>
          <HomeWrapper>
            <HomeLeft>
              <Topic />
              <List />
            </HomeLeft>
            <HomeRight>
              <Recommend />
              <Writer />
            </HomeRight>
            {this.props.showScroll ? (
              <BackTop onClick={this.handleScrollTop}>顶部</BackTop>
            ) : null}
          </HomeWrapper>
        </div>
    );
  }

  componentDidMount() {
    this.props.changeHomeData();
    this.bindEvents();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.props.changeScrollTopShow);
  }

  bindEvents() {
    window.addEventListener("scroll", this.props.changeScrollTopShow);
  }
}

const mapState = state => ({
  showScroll: state.getIn(["home", "showScroll"]),
  tags:state.getIn(["home","tags"])
});

const mapDispatch = dispatch => ({
  changeHomeData() {
    dispatch(actionCreators.getHomeInfo());
  },
  changeScrollTopShow() {
    dispatch(
      actionCreators.toggleTopShow(document.documentElement.scrollTop > 100)
    );
  },
  handleChangeTags(idx){
    dispatch(actionCreators.getTags(idx))
  }
});

export default connect(
  mapState,
  mapDispatch
)(Home);
