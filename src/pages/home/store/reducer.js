import { fromJS } from "immutable";
import * as constants from "./constants";
import { setTopic } from "./actionCreators";

const defaultState = fromJS({
  articleList: [],
  recommendList: [],
  articlePage: 1,
  showScroll: false,
  tags:[],
  topics:[],
  tag:{idx:"all"},
  topic:Object
});

const changeHomeData = (state, action) => {
  return state.merge({
    articleList: fromJS(action.articleList),
  });
};

const addArticleList = (state, action) => {
  return state.merge({
    articleList: state.get("articleList").concat(action.list),
    articlePage: action.nextPage
  });
};

const changeTopic = (state,action) =>{
  let tag={}
  if (action.data.tags.length==0){
    tag=undefined
  }else{
    tag=action.data.tags[0]
  }
  return state.merge({
    tags:fromJS(action.data.tags),
    topic:fromJS(action.data.topic),
    tag:fromJS(tag)
  })
}

const setTopics = (state,action) => {
  let topic={};
  if (action.data.topics.length==0){
    topic=undefined
  }else{
    topic=action.data.topics[0]
  }
  return state.merge({
    topics:fromJS(action.data.topics),
    topic:fromJS(topic)
  })
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_HOME_DATA:
      return changeHomeData(state, action);
    case constants.ADD_ARTICLE_LIST:
      return addArticleList(state, action);
    case constants.TOGGLE_SCROLL_TOP:
      return state.set("showScroll", action.show);
    case constants.CHANGE_TAGS:
      return changeTopic(state,action)
    case constants.CHANGE_TOPICS:
      return setTopics(state,action)
    case constants.SET_TAG:
      return state.set("tag",fromJS(action.data.tag))
    default:
      return state;
  }
};
