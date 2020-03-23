import * as constants from "./constants";
import { fromJS } from "immutable";
import axios from "axios";

const changeList = data => ({
    type: constants.CHANGE_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
});

const changeTopic = data => ({
    type: constants.CHANGE_TOPICS,
    data: fromJS(data)
})

const contentChangeAction = (data) => ({
    type:constants.CONTANT_CHANGE,
    data:data
})

export const contentChange = (data) =>{
    return(dispatch, getState) => {
        dispatch(contentChangeAction(data))
        return
    }
}

export const searchFocus = () => ({
    type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
    type: constants.SEARCH_BLUR
});

export const mouseEnter = () => ({
    type: constants.MOUSE_ENTER
});

export const mouseLeave = () => ({
    type: constants.MOUSE_LEAVE
});

export const changePage = page => ({
    type: constants.CHANGE_PAGE,
    page
});

export const changeToolBarAction = (data)=>({
    type:constants.CHANGE_TOOL_BAR,
    data
})

export const changeToolBar = toolbar => {
    return dispatch =>{
        let data={}
        data.toolbar=toolbar
        dispatch(changeToolBarAction(data))
    }
}


export const getList = () => {
    return dispatch => {
        axios
            .get("/api/headerList.json")
            .then(res => {
                const data = res.data;
                dispatch(changeList(data.data));
            })
            .catch(() => {
                console.log("error");
            });
    };
};

export const getTopics = () => {
    return dispatch => {
        axios
            .get("/api/topics.json")
            .then(res => {
                const raw = res.data.data;
                let data = raw
                dispatch(changeTopic(data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

