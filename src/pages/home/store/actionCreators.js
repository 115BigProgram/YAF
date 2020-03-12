import axios from "axios";
import * as constants from "./constants";
import { fromJS } from "immutable";
import {client,handleResponse,handleErr} from "../../../client"


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
  return (dispatch,getState) => {
    const {tag} = getState().toJS().home
    client.get("/articleList?topic="+tag.idx+"&size=4&page=0").then(res => {
      let result={}
      result.articleList = handleResponse(res);
      console.log(result)
      dispatch(changHomeData(result));
    });
  };
};

export const getMoreList = page => {
  return (dispatch,getState) => {
    const {tag} = getState().toJS().home
    client.get(`/articleList?topic=${tag.idx}&size=4&page=${page}`).then(res => {
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
    
   const {topics} = getState().toJS().home
   const topic=topics[idx]
   console.log(topic)
   client 
        .get("/topics?domain="+topic.id)
        .then(res => {
          let tags=handleResponse(res)
          let data={
            tags:tags,
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
       client 
            .get("/domains")
            .then(res => {
                const raw = handleResponse(res)
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