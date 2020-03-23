import * as constants from "./constants";
import {fromJS} from "immutable";



const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    list: [],
    page: 1,
    totalPage: 1,
    topics: [],
    toolbar:""
});

const changeList = (state, action) => {
    return state.merge({
        list: action.data,
        totalPage: action.totalPage
    });
};

const contentChange = (state, action) => {
    return state.set("content", action.data);    
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.SEARCH_FOCUS:
            return state.set("focused", true);
        case constants.CONTANT_CHANGE:
            return contentChange(state, action)
        case constants.SEARCH_BLUR:
            return state.set("focused", false);
        case constants.CHANGE_LIST:
            return changeList(state, action);
        case constants.MOUSE_ENTER:
            return state.set("mouseIn", true);
        case constants.MOUSE_LEAVE:
            return state.set("mouseIn", false);
        case constants.CHANGE_PAGE:
            return state.set("page", action.page);
        case constants.CHANGE_TOPICS:
            return state.set("topics",action.data)
        case constants.CHANGE_TOOL_BAR:
            return state.set("toolbar",action.data.toolbar)
        default:
            return state;
    }
};
