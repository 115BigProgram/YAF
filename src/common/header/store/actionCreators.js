import * as constants from "./constants";
import {fromJS} from "immutable";
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

const changeTags = (data) => ({
    type: constants.CHANGE_TAGS,
    data: data
})

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
                const data = res.data;
                dispatch(changeTopic(data.data))
            })
            .catch(() => {
                console.log("error")
            })
    }
}

export const getTags= (idx) => {
    return (dispatch,getState) => {
        axios
            .get("/api/tags.json")
            .then(res => {
                const topic_tags = res.data.data
                const {topics} = getState().toJS().header
                const topic=topics[idx]
                let data=topic_tags[topic]

                dispatch(changeTags(data))
            })
            .catch(()=>{
                console.log("error")
            })
    }
}
