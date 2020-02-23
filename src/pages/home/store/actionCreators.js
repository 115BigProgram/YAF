import axios from "axios";
import * as constants from "./constants";
import { fromJS } from "immutable";

const changHomeData = result => ({
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList
});

const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list),
  nextPage
});

const changeTags = (data) => ({
    type: constants.CHANGE_TAGS,
    data: data
})

export const getHomeInfo = () => {
  return dispatch => {
    axios.get("/api/home.json").then(res => {
      const result = res.data.data;
      dispatch(changHomeData(result));
    });
  };
};

export const getMoreList = page => {
  return dispatch => {
    axios.get("/api/homeList.json?page=" + page).then(res => {
      const result = res.data.data;
      dispatch(addHomeList(result, page + 1));
    });
  };
};

export const toggleTopShow = show => ({
  type: constants.TOGGLE_SCROLL_TOP,
  show
});

export const getTags= (idx) => {
  return (dispatch,getState) => {
    axios
        .get("/api/tags.json")
        .then(res => {
          const topic_tags = res.data.data
          const {topics} = getState().toJS().header
          const topic=topics[idx]
          let data=topic_tags[topic]

          dispatch(changeTags(data))
        })
        .catch(()=>{
          console.log("error")
        })
  }
}
