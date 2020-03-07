import axios from "axios";
import * as constants from "./constants";
import {toJS} from "immutable";

const changeDetail = (title, content) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content
});

export const getDetail = id => {
  return (dispatch,getState) => {
    //the logic here is just for demo 
    //if backend presendted, url+id is enough
    let urlFormatter=""
    const {topic,tag}=getState().toJS().home
    console.log(tag)
    if(tag.api==undefined || tag.api=="*"){
      urlFormatter=`dm-dt-${id}.md`
    }else{
      if(topic.api=="*"){
        urlFormatter=`dm-${tag.api}-${id}.md`
      }else{
        urlFormatter=`${topic.api}-${tag.api}-${id}.md`
      }
    }
    console.log(urlFormatter)
    axios
      .get("/api/articles/"+urlFormatter)
      .then(res => {
        const result = res.data;
        dispatch(changeDetail("SAMPLE", result));
      })
      .catch(() => {});
  };
};
