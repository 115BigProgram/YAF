import axios from "axios";
import * as constants from "./constants";
import { fromJS } from "immutable";
import {client,handleResponse,handleErr} from "../../../client"

const changeKeyWordAction = data =>({
  type: constants.CHANGE_KEY_WORD,
  data: data
})

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

function generateArticleListQueryApi(params){
  let kw=params.kw===undefined?"":params.kw
  let domainID=params.domainID===undefined?null:params.domainID
  let topicID=params.topicID===undefined?null:params.topicID
  let page=params.page===undefined?0:params.page

  let endpoint=`/articleList?size=4&page=${page}&${kw==""?"kw":"kw="+kw}`
  if(domainID==null && topicID==null){
    return endpoint
  }
  if(domainID!=null){
    return endpoint+`&domainID=${domainID}`
  }
  return endpoint+`&topicID=${topicID}`
}

export const getMoreList = page => {
  return (dispatch,getState) => {
    const {tag,topic,keyword} = getState().toJS().home
    let api=""
    if(tag===undefined || tag.id==null){
      api=generateArticleListQueryApi({page:page,domainID:topic.id,kw:keyword})
    }else{
      api=generateArticleListQueryApi({page:page,topicID:tag.id,kw:keyword})
    }
    console.log(api)
    client.get(api).then(res => {
      const result = handleResponse(res);
      console.log(result)
      dispatch(addHomeList(result.articles, page + 1));
    })
    .catch(err=>{
      console.log(err)
    });
  };
};

export const setHomeList =()=>{
  return (dispatch,getState) =>{
    const {tag,topic,keyword}=getState().toJS().home
    let api=generateArticleListQueryApi({domainID:topic.id,topicID:tag.id,kw:keyword})
    client.get(api)
    .then(res => {
      const result=handleResponse(res)
      let data={}
      data.list=result.articles
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

const onChangeTag=(dispatch,topic,tag,keyword)=>{
  if(tag==undefined){
    tag={id:null}
  }
  console.log(topic)
  let api=generateArticleListQueryApi({domainID:topic.id,topicID:tag.id,kw:keyword})
  console.log(api)
  client.get(api)
  .then(res=>{
      const result=handleResponse(res)
      console.log(res)
      let data={}
      data.list=result.articles
      dispatch(setHomeListAction(data))

  })
  .catch(err=>{
      console.log(err)
  })

}


export const setTopic= (idx) => {
  return (dispatch,getState) => {
    
   const {topics,keyword} = getState().toJS().home
   console.log(keyword)
   const topic=topics[idx]
   client 
        .get("/topics?domain="+topic.id)
        .then(res => {
          let tags=handleResponse(res)
          tags.unshift({id:null,topic:"全部"})
          let data={
            tags:tags,
            topic:topic
          }
          dispatch(changeTags(data))
          onChangeTag(dispatch,topic,tags[0],keyword)
        })
        .catch((err)=>{
          let tags=[]
          if (idx!=0){
            tags=[]
          }

          let data={
            topic:topic,
            tags:tags
          }
          dispatch(changeTags(data))
          onChangeTag(dispatch,topic,{id:null},keyword)
          console.log(err)
        })
  }
}

export const setTag = (idx) => {
  return (dispatch,getState) => {
    const {tags,keyword,topic} = getState().toJS().home
    console.log(keyword)
    let data={}
    data.tag=tags[idx]
    dispatch(setTagAction(data))
    if(tags[idx].id==null){
      onChangeTag(dispatch,topic,tags[idx],keyword)
    }else{
      onChangeTag(dispatch,{id:null},tags[idx],keyword)
    }
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

export const changeKeyword=(keyword)=>{
  return (dispatch,getState) =>{
    console.log('hit')
    console.log(keyword)
    dispatch(changeKeyWordAction({keyword}))
    const {tag,topic}=getState().toJS().home
    let api=generateArticleListQueryApi({domainID:topic.id,topicID:tag.id,kw:keyword})
    console.log(api)
    client.get(api)
    .then(res => {
      const result=handleResponse(res)
      let data={}
      data.list=result.articles
      dispatch(setHomeListAction(data))
    })
    .catch(err=>{
      console.log(err)
    })
  }
}