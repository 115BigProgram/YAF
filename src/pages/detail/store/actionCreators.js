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

const getRecommendArticlesAction = (data) => ({
  type: constants.GET_RECOMMEND_LIST,
  data
})

const getBrowserArticlesAction = (data) => ({
  type: constants.GET_BROWSER_LIST,
  data
})

const changePageAction = (data) => ({
  type: constants.CHANGE_PAGE_ACTION,
  data
})

const changePageTotAction = (data) => ({
  type: constants.CHANGE_PAGE_TOT_NUM,
  data
})

export const changeBrowserListPage = (isNext) => {
  return (dispatch, getState) => {
    let {
      articlesToBrowserPage,
      articlesToBrowserTotPage,
      articlesToBrowserKeyword,
      articlesCurrentTopicID
    } = getState().toJS().detail
    let nextPage = articlesToBrowserPage
    if (isNext) {
      if (articlesToBrowserPage + 1 >= articlesToBrowserTotPage) {
        return
      }
      nextPage++
    } else {
      if (articlesToBrowserPage <= 0) {
        return
      }
      nextPage--
    }
    let url = `/articleList?size=3&page=${nextPage}&topicID=${articlesCurrentTopicID}`
    let urlkw = articlesToBrowserKeyword == "" ? "&kw" : `&kw=${articlesToBrowserKeyword}`
    console.log(url + urlkw)
    console.log(getState().toJS().detail)
    dispatch(changePageAction({ nextPage: nextPage }))
    getArticle(dispatch, url + urlkw)
  }
}

export const searchBrowserList = () => {
  return (dispatch, getState) => {
    let {
      articlesToBrowserKeyword,
      articlesCurrentTopicID
    } = getState().toJS().detail

    let url = `/articleList?size=3&page=${0}&topicID=${articlesCurrentTopicID}`
    let urlkw = articlesToBrowserKeyword == "" ? "&kw" : `&kw=${articlesToBrowserKeyword}`
    dispatch(changePageAction({ nextPage: 0 }))
    console.log(url+urlkw)
    getArticle(dispatch, url + urlkw)
  }
}

const getArticle = (dispatch, url) => {
  client
    .get(url)
    .then(res => {
      let resData = handleResponse(res)
      console.log(resData)
      dispatch(getBrowserArticlesAction({ browserList: resData.articles }))
      dispatch(changePageTotAction({ totPage: resData.totalPagesNum }))
    })
    .catch(err => {
      handleErr(err)
    })
}

const changeCurrentTopic = (data) => ({
  type: constants.CHANGE_CURRENT_TOPIC,
  data: data
})

const getNodeArticles = (dispatch, getState, targetID) => {
  const {
    articlesToBrowserPage,
    topicGraph
  } = getState().toJS().detail

  let recommendUrl = "/getPreTopics?topicID=" + targetID
  let browserUrl = `/articleList?page=${articlesToBrowserPage}&size=3&kw&topicID=${targetID}`

  let newTopic = topicGraph.getNode(targetID)
  console.log(newTopic)
  dispatch(changeCurrentTopic({ topic: newTopic.name, topicID: newTopic.id }))
  dispatch(changePageAction({ nextPage: 0 }))

  client
    .get(recommendUrl)
    .then(res => {
      let resData = handleResponse(res)
      let data = {}
      data.recommendList = resData.recommendArticles
      dispatch(getRecommendArticlesAction(data))
    })
    .catch(err => {
      handleErr(err)
    })

  client
    .get(browserUrl)
    .then(res => {
      let resData = handleResponse(res)
      dispatch(getBrowserArticlesAction({ browserList: resData.articles }))
      dispatch(changePageTotAction({ totPage: resData.totalPagesNum }))
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
        return
      case 1:
        getNodeArticles(dispatch, getState, nodeID)
        return
      default:
        return
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

const changeDetailPageArticleAction = (data) => ({
  type: constants.CHANGE_DETAIL_PAGE_ARTICLE_WITH_EXPLORER,
  data
})

const addReadHistory = (data) => ({
  type: constants.ADD_READ_HISTORY,
  data
})

export const changeDetailPageArticle = (aid) => {
  return (dispatch, getState) => {
    const {
      articlesCurrentTopic,
      readHistory
    } = getState().toJS().detail

    let url = '/article?aid=' + aid
    client
      .get(url)
      .then(res => {
        let resData = handleResponse(res)
        let data = {}
        data.content = resData
        data.idx = 0
        dispatch(changeDetailPageArticleAction(data));


        let targetID = -1
        let has = readHistory.some((e, idx) => {
          if (e.aid == resData.id) {
            targetID = idx
            return true
          }
          return false
        })

        if (!has) {
          readHistory.unshift({ topic: articlesCurrentTopic, aid: resData.id, title: resData.title })
          targetID = 0
        }
        dispatch(addReadHistory({ readHistory: readHistory, current: targetID }))
      })
      .catch(err => {
        handleErr(err)
      })
  }
}

const updateKeywordAction = (data) => ({
  type: constants.UPDATE_KEY_WORD,
  data
})

export const updateKeyword = (kw) => {
  return (dispatch) => {
    dispatch(updateKeywordAction({ keyword: kw }))
  }
}