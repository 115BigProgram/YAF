import axios from "axios";
import * as constants from "./constants";
import { fromJS } from "immutable";


const changHomeData = result => ({
  type: constants.CHANGE_HOME_DATA,
  articleList: result.articleList
});

const setTopics = data =>({
  type:constants.CHANGE_TOPICS,
  data:data
})

const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list),
  nextPage
});

const changeTags = (data) => ({
    type: constants.CHANGE_TAGS,
    data: data,
})

const setTagAction =(data) => ({
  type:constants.SET_TAG,
  data:data,
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


export const setTopic= (idx) => {
  return (dispatch,getState) => {
    axios
        .get("/api/tags.json")
        .then(res => {
          const topic_tags = res.data.data
          const {topics} = getState().toJS().home
          const topic=topics[idx]
          let data={
            tags:topic_tags[topic.name],
            topic:topic
          }


          dispatch(changeTags(data))
        })
        .catch((err)=>{
          console.log(err)
        })
  }
}

export const setTag = (idx) => {
  return (dispatch,getState) => {
    const {tags} = getState().toJS().home
    let data={}
    data.tag=tags[idx]
    dispatch(setTagAction(data))
  }
}

export const getTopics = () => {
    return dispatch => {
        axios
            .get("/api/topics.json")
            .then(res => {
                const raw = res.data.data;
                let data={
                  topics:raw
                }
                dispatch(setTopics(data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}