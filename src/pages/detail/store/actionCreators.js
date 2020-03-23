import axios from "axios";
import * as constants from "./constants";
import { toJS } from "immutable";
import { client, handleResponse, handleErr } from "../../../client"
import { TreeNode } from "../utils";

const changeDetail = (data) => ({
  type: constants.CHANGE_DETAIL,
  data: data
});

const changeFavor = (data) => ({
  type: constants.CHANGE_FAVOR,
  data:data
});

const switchToolBarAction = (data) => ({
  type: constants.SHOW_TOOL_BAR,
  data: data
})

const switchArticleIndexAction = (data) => ({
  type: constants.SHOW_ARTICLE_IDX,
  data: data
})

const switchReadListAction = (data) => ({
  type: constants.SHOW_READ_LIST,
  data: data
})

const getReadListAction = (data) => ({
  type: constants.GET_READ_LIST,
  data: data
})

const resetStoreAction = () => ({
  type: constants.RESET_STORE,
})

export const resetStore = () => {
  return (dispatch) => {
    dispatch(resetStoreAction())
  }
}

export const getDetail = id => {
  return (dispatch, getState) => {
    //the logic here is just for demo 
    //if backend presendted, url+id is enough
    client
      .get("/article?aid="+id+"&userID=2")
      .then(res => {
        let content = handleResponse(res)
        console.log(res)
        let data = {}
        data.content = content
        data.idx = 0
        dispatch(changeDetail(data));
      })
      .catch(() => { });
  };
};

export const favorArticle = (id) => {
  return (dispatch, getState) => {
      client.get("/favorArticle?userID=2" + "&articleID=" + id).then(function (res) {
      dispatch(changeFavor(data));
      var content = handleResponse(res);
      var data = {};
      data.content = content;
      data.idx = 0;
    }).catch(function () {});
  };
};

export const getContent = (aid, idx, dispatch) => {
  axios
    .get("/api/articles/"+aid+"&userID=2")
    .then(res => {
      let result = handleResponse(res)
      console.log(res.content)
      let data = {}
      data.content = result.content
      data.idx = idx
      dispatch(changeDetail(data))
    })
    .catch(err => {
      console.log(err)
    })
}

export const switchToolBar = (show) => {
  return (dispatch) => {
    let data = {}
    data.show = show
    dispatch(switchToolBarAction(data))
  }
}

export const switchReadList = () => {
  return (dispatch, getState) => {
    let data = {}
    const {
      showReadList
    } = getState().toJS().detail
    data.show = !showReadList
    console.log(data)
    dispatch(switchReadListAction(data))
  }
}

export const switchArticleIndex = () => {
  return (dispatch, getState) => {
    let data = {}
    const {
      showArticleIndex
    } = getState().toJS().detail
    data.show = !showArticleIndex
    dispatch(switchArticleIndexAction(data))
  }
}

export const getReadList = (lid) => {
  return (dispatch) => {
    axios
      .get("/api/readList.json")
      .then(res => {
        let readList = res.data.data.articles
        let data = {}
        data.readList = readList
        getContent(readList[0].aid, 0, dispatch)
        dispatch(getReadListAction(data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const changeArticleIdx = (idx) => {
  return (dispatch, getState) => {
    const {
      readList
    } = getState().toJS().detail
    let aid = readList[idx].aid
    getContent(aid, idx, dispatch)
  }
}

const getTopicTree = (getState) => {
  const {
    topicTree
  } = getState().toJS().detail

  return topicTree
}

const getTopicGraph = (getState) => {
  const {
    topicGraph
  } = getState().toJS().detail

  return topicGraph
}

const presToTreeNodes = (pres) => {
  return pres.preTopics.map(e => ({ id: e.id, name: e.topic }))
}

const patchTopicTreeAction = (data) => ({
  type: constants.PATCH_TOPIC_TREE_NODE,
  data
})

const patchTopicGraphAction = (data) => ({
  type: constants.PATCH_TOPIC_GRAPH,
  data
})

const getPreNodes = (dispatch, getState, targetID) => {
  let topicGraph = getTopicGraph(getState)
  console.log("topicGraph", topicGraph)
  let url = "/getPreTopics?topicID=" + targetID
  console.log(url)
  client
    .get(url)
    .then(res => {
      let pres = handleResponse(res)
      console.log("pres", pres)
      let nodes = presToTreeNodes(pres)
      nodes.forEach(n => {
        topicGraph.addLink(targetID, n.id)
        topicGraph.addNode(n)
      })

      let data = {}
      data.topicGraph = Object.assign({}, topicGraph)
      console.log("data", data)
      dispatch(patchTopicGraphAction(data))
    })
    .catch(err => {
      handleErr(err)
    })
}

export const onClickNode = (nodeID) => {
  return (dispatch, getState) => {
    let curTask = getState().toJS().detail.articleBrowserActiveButton
    switch (curTask) {
      case 0:
        getPreNodes(dispatch, getState, nodeID)
      default:
    }
  }
}

const changeArticleBrowserActiveButtonAction = (data) => ({
  type: constants.CHANGE_ARTICLE_BROWSER_ACTIVE_BUTTON,
  data
})

export const changeArticleBrowserActiveButton = (idx) => {
  return (dispatch) => {
    let data = {}
    data.activeButton = idx
    dispatch(changeArticleBrowserActiveButtonAction(data))
  }
}