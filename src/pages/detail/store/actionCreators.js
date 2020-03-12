import axios from "axios";
import * as constants from "./constants";
import {toJS} from "immutable";
import {client,handleResponse,handleErr} from "../../../client"

const changeDetail = (data) => ({
  type: constants.CHANGE_DETAIL,
  data:data
});

const switchToolBarAction = (data) =>({
  type:constants.SHOW_TOOL_BAR,
  data:data
})

const switchReadListAction = (data) =>({
  type:constants.SHOW_READ_LIST,
  data:data
})

const getReadListAction = (data) => ({
  type:constants.GET_READ_LIST,
  data:data
})

const resetStoreAction = () => ({
  type:constants.RESET_STORE,
})

export const resetStore = () => {
  return (dispatch) => {
    dispatch(resetStoreAction())
  }
}

export const getDetail = id => {
  return (dispatch,getState) => {
    //the logic here is just for demo 
    //if backend presendted, url+id is enough
   client 
      .get("/article?aid="+id)
      .then(res => {
        let content=handleResponse(res)
        let data={}
        data.content=content
        data.idx=0
        dispatch(changeDetail(data));
      })
      .catch(() => {});
  };
};

export const getContent = (aid,idx,dispatch) => {
    console.log("/api/articles/"+aid)
    axios
    .get("/api/articles/"+aid)
    .then(res => {
      let result = handleResponse(res)
      console.log(res.content)
      let data={}
      data.content=result.content
      data.idx=idx
      dispatch(changeDetail(data))
    })
    .catch(err => {
      console.log(err)
    })
}

export const switchToolBar=(show)=>{
  return (dispatch) =>{
    let data={}
    data.show=show
    dispatch(switchToolBarAction(data))
  }
}

export const switchReadList=()=>{
  return (dispatch,getState) => {
    let data={}
    const {
      showReadList
    } = getState().toJS().detail
    data.show=!showReadList
    console.log(data)
    dispatch(switchReadListAction(data))
  }
}

export const getReadList = (lid) => {
  return (dispatch) =>{
    axios
    .get("/api/readList.json")
    .then(res => {
      let readList=res.data.data.articles
      let data={}
      data.readList=readList
      getContent(readList[0].aid,0,dispatch)
      dispatch(getReadListAction(data))
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}

export const changeArticleIdx = (idx) => {
  return (dispatch,getState) => {
    const {
      readList
    } = getState().toJS().detail
    let aid=readList[idx].aid
    getContent(aid,idx,dispatch)
  }
}