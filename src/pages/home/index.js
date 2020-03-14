import React, { Component } from "react";
import { connect } from "react-redux";
import List from "./components/List";
import Recommend from "./components/Recommend";
import Writer from "./components/Writer";
import { actionCreators } from "./store";
import {actionCreators as detailActionCreator } from "../detail/store"
import {BackTop } from "./style";
import {toJS} from "immutable";

import { HomeWrapper, HomeLeft, HomeRight,TagWrapper,TagItem } from "./style";

class Home extends Component {
  handleScrollTop() {
    window.scrollTo(0, 0);
  }


  getTags() {
    const {
      tags,
      handleSetTag
    }=  this.props

    const tagsItem = []
    tags.toJS().map((tag, idx) => {
      tagsItem.push(
          <TagItem  key={tag.id} onClick={()=>handleSetTag(idx)}>
            {tag.topic}
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
    this.props.showTopic();
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
    dispatch(actionCreators.setHomeList());
  },
  changeScrollTopShow() {
    dispatch(
      actionCreators.toggleTopShow(document.documentElement.scrollTop > 100)
    );
  },
  handleSetTag(idx){
    dispatch(actionCreators.setTag(idx))
  },
  showTopic(){
    dispatch(detailActionCreator.switchToolBar(false))
  }
});

export default connect(
  mapState,
  mapDispatch
)(Home);
