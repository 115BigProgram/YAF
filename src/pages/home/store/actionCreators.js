import axios from "axios";
import * as constants from "./constants";
import { fromJS } from "immutable";
import {client,handleResponse,handleErr} from "../../../client"


const setHomeListAction = data => ({
  type: constants.SET_HOME_LIST,
  data: data
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

export const getMoreList = page => {
  return (dispatch,getState) => {
    const {tag} = getState().toJS().home
    console.log(tag)
    client.get(`/articleList?topic=${tag.id}&size=4&page=${page}`).then(res => {
      const result = handleResponse(res);
      console.log(result)
      dispatch(addHomeList(result, page + 1));
    })
    .catch(err=>{
      console.log(err)
    });
  };
};

export const setHomeList =()=>{
  return (dispatch,getState) =>{
    const {tag}=getState().toJS().home
    client.get(`/articleList?topic=${tag.id}&size=4&page=${0}`)
    .then(res => {
      const result=handleResponse(res)
      let data={}
      data.list=result
      dispatch(setHomeListAction(data))
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

export const toggleTopShow = show => ({
  type: constants.TOGGLE_SCROLL_TOP,
  show
});

const onChangeTag=(dispatch,tag)=>{
  client.get(`/articleList?topic=${tag.id}&size=4&page=${0}`)
  .then(res=>{
      const result=handleResponse(res)
      console.log(res)
      let data={}
      data.list=result
      dispatch(setHomeListAction(data))

  })
  .catch(err=>{
      console.log(err)
  })

}


export const setTopic= (idx) => {
  return (dispatch,getState) => {
    
   const {topics} = getState().toJS().home
   const topic=topics[idx]
   client 
        .get("/topics?domain="+topic.id)
        .then(res => {
          let tags=handleResponse(res)
          let data={
            tags:tags,
            topic:topic
          }
          dispatch(changeTags(data))
          onChangeTag(dispatch,tags[0])
        })
        .catch((err)=>{
          let tags=[]
          if (idx!=0){
            tags=[{id:"all",topic:"敬请期待!请浏览其他文章."}]
          }

          let data={
            topic:topic,
            tags:tags
          }
          dispatch(changeTags(data))
          onChangeTag(dispatch,{id:"all"})
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
    onChangeTag(dispatch,tags[idx])
  }
}

export const getTopics = () => {
    return dispatch => {
       client 
            .get("/domains")
            .then(res => {
                const raw = handleResponse(res)
                let topics=[{domain:"全部"}].concat(raw)
                let data={
                  topics:topics
                }
                dispatch(setTopics(data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}