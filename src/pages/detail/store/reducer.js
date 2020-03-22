import { fromJS } from "immutable";
import * as constants from "./constants";
import { TreeNode, Graph } from "../utils"

const defaultState = fromJS({
  title: "",
  content: "",
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
    topicGraph: new Graph({ id: action.data.content.topic, name: action.data.content.topicName })
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