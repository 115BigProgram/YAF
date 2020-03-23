import { fromJS } from "immutable";
import * as constants from "./constants";
import { TreeNode, Graph } from "../utils"

const defaultState = fromJS({
  title: "",
  content: "",
  authorName: "",
  publishTime: "",
  readNum: 0,
  logoSvg: "",
  showToolBar: false,
  showArticleIndex: false,
  readList: new TreeNode("empty", 0),
  topicTree: new TreeNode("cnn", 8),
  topicGraph: new Graph({ id: 8, name: "cnn" }),
  articleBrowserButtons: ["获得前驱", "浏览文章", "关闭节点"],
  articleBrowserActiveButton: 0,
  readHistory: [],
  showReadList: false,
  currentArticle: 0,
});

const changeDetail = (state, action) => {
  return state.merge({
    currentArticle: action.data.idx,
    content: action.data.content.content,
    title: action.data.content.title,
    authorName: action.data.content.authorName,
    publishTime: action.data.content.publishTime,
    readNum: action.data.content.readNum,
    logoSvg: action.data.content.isFavor,
    topicGraph: new Graph({ id: action.data.content.topic, name: action.data.content.topicName })
  });
};

const changeFavor = (state, action) => {
  var full = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg0ODg3MTQwNDgxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExNzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTQwLjcgMTc2LjAzbDg5LjY2IDE4MS42N2EzMi4wMjUgMzIuMDI1IDAgMCAwIDI0LjA5IDE3LjUxbDIwMC40OCAyOS4xM2MyNi4yNSAzLjgxIDM2LjczIDM2LjA3IDE3LjczIDU0LjU4TDcyNy41OSA2MDAuMzNhMzEuOTk2IDMxLjk5NiAwIDAgMC05LjIgMjguMzJsMzQuMjUgMTk5LjY3YzQuNDggMjYuMTQtMjIuOTUgNDYuMDgtNDYuNDMgMzMuNzNsLTE3OS4zMi05NC4yN2MtOS4zMi00LjktMjAuNDYtNC45LTI5Ljc4IDBsLTE3OS4zMiA5NC4yN2MtMjMuNDggMTIuMzQtNTAuOTEtNy41OS00Ni40My0zMy43M2wzNC4yNS0xOTkuNjdhMzEuOTk2IDMxLjk5NiAwIDAgMC05LjItMjguMzJMMTUxLjM0IDQ1OC45MmMtMTguOTktMTguNTEtOC41MS01MC43NyAxNy43My01NC41OGwyMDAuNDgtMjkuMTNhMzEuOTc4IDMxLjk3OCAwIDAgMCAyNC4wOS0xNy41MWw4OS42Ni0xODEuNjdjMTEuNzQtMjMuNzggNDUuNjYtMjMuNzggNTcuNCAweiIgZmlsbD0iI0YwODE0MCIgcC1pZD0iMTE3MSI+PC9wYXRoPjwvc3ZnPg==";
  var notFull = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg0ODg3MTMxMjc5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQxMTciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDI5MS40Mmw0OS40OSAxMDAuMjhhMTA4Ljc2NyAxMDguNzY3IDAgMCAwIDgxLjkxIDU5LjVsMTEwLjY1IDE2LjA4LTgwLjA2IDc4LjA0Yy0yNS42NiAyNS0zNy4zNiA2MS4wMS0zMS4zIDk2LjMxbDE4LjkgMTEwLjIxLTk4Ljk2LTUyLjAzYy0xNS41NS04LjE4LTMzLjA2LTEyLjUtNTAuNjMtMTIuNXMtMzUuMDkgNC4zMi01MC42MyAxMi41bC05OC45NyA1Mi4wMyAxOC45LTExMC4yYzYuMDYtMzUuMzEtNS42NC03MS4zMS0zMS4yOS05Ni4zMWwtODAuMDctNzguMDVMMzgwLjYgNDUxLjJhMTA4Ljc1NyAxMDguNzU3IDAgMCAwIDgxLjkxLTU5LjUyTDUxMiAyOTEuNDJtMC0xMzMuMjNjLTExLjQxIDAtMjIuODIgNS45NS0yOC43IDE3Ljg0TDM5My42NSAzNTcuN2EzMi4wMDIgMzIuMDAyIDAgMCAxLTI0LjA5IDE3LjUxbC0yMDAuNDggMjkuMTNjLTI2LjI1IDMuODEtMzYuNzMgMzYuMDctMTcuNzQgNTQuNThMMjk2LjQgNjAwLjMzYTMyLjAwNSAzMi4wMDUgMCAwIDEgOS4yIDI4LjMybC0zNC4yNSAxOTkuNjdjLTMuNTUgMjAuNjggMTIuODkgMzcuNDggMzEuNTQgMzcuNDggNC45MiAwIDEwLTEuMTcgMTQuOS0zLjc1bDE3OS4zMi05NC4yN2M0LjY2LTIuNDUgOS43Ny0zLjY4IDE0Ljg5LTMuNjggNS4xMSAwIDEwLjIzIDEuMjMgMTQuODkgMy42OGwxNzkuMzIgOTQuMjdjNC45IDIuNTggOS45OCAzLjc1IDE0LjkgMy43NSAxOC42NCAwIDM1LjA4LTE2LjggMzEuNTMtMzcuNDhsLTM0LjI1LTE5OS42N2EzMS45OTYgMzEuOTk2IDAgMCAxIDkuMi0yOC4zMmwxNDUuMDctMTQxLjQxYzE4Ljk5LTE4LjUxIDguNTEtNTAuNzctMTcuNzMtNTQuNThsLTIwMC40OC0yOS4xM2EzMi4wMDIgMzIuMDAyIDAgMCAxLTI0LjA5LTE3LjUxTDU0MC43IDE3Ni4wM2MtNS44Ny0xMS44OS0xNy4yOC0xNy44NC0yOC43LTE3Ljg0eiIgZmlsbD0iI0YwODE0MCIgcC1pZD0iNDExOCI+PC9wYXRoPjwvc3ZnPg==";
  return state.merge({
    logoSvg: state.get("logoSvg") == full ? notFull : full
  });
};

const reset = (state) => {
  return state.merge(defaultState)
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.RESET_STORE:
      return reset(state)
    case constants.CHANGE_DETAIL:
      return changeDetail(state, action);
    case constants.CHANGE_FAVOR:
      return changeFavor(state, action);  
    case constants.SHOW_TOOL_BAR:
      return state.set("showToolBar", action.data.show)
    case constants.SHOW_READ_LIST:
      return state.set("showReadList", action.data.show)
    case constants.SHOW_ARTICLE_IDX:
      return state.set("showArticleIndex", action.data.show)
    case constants.GET_READ_LIST:
      return state.merge({
        readList: fromJS(action.data.readList),
      })
    case constants.PATCH_TOPIC_TREE_NODE:
      return state.set("topicTree", action.data.topicTree)
    case constants.PATCH_TOPIC_GRAPH:
      return state.set("topicGraph", action.data.topicGraph)
    case constants.CHANGE_ARTICLE_BROWSER_ACTIVE_BUTTON:
      return state.set("articleBrowserActiveButton", action.data.activeButton)
    default:
      return state;
  }
};