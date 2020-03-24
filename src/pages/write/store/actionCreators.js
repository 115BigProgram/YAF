import * as constants from "./constants";
import httpClient, { client, handleErr, handleResponse } from "../../../client"
import Qs from 'qs'

const getFields = (getState, field) => {
    const store = getState().toJS().write
    return store[field]
}

const getStoreDomains = (getState) => {
    return getFields(getState, "domains")
}

const getStoreTopics = (getState) => {
    return getFields(getState, "topics")
}

const getDomainsAction = (data) => ({
    type: constants.GET_DOMAINS,
    data
})
const getTopicAction = (data) => ({
    type: constants.GET_TOPICS,
    data
})
const setSelectTopic = (data) => ({
    type: constants.SET_SELECTED_TOPIC,
    data
})
const commitArticleAction = (data) => ({
    type: constants.COMMIT_ARTICLE,
    data: data
})
export const setSelectedTopic = (selectedTopic) => {
    return (dispatch, getState) => {
        dispatch(setSelectTopic(selectedTopic))
        return
    }
}
export const commitArticle = (articleInfo) => {
    return (dispatch, getState) => {
        console.log(articleInfo)
        client
            .post("/addArticle", {
                title: articleInfo.title,
                domainID: articleInfo.domainID,
                topicID: articleInfo.topicID,
                content: articleInfo.content,
                authorID: articleInfo.authorID,
                authorName: articleInfo.authorName,
                publishDate: articleInfo.publishDate
            })
            .then(res => {
                let resData = handleResponse(res)
                alert("添加文章成功！")
                window.location.reload()
                return
            })
            .catch(err => {
                handleErr(err)
            })
        dispatch(commitArticleAction(articleInfo))
    }
}
export const getDomains = () => {
    return (dispatch, getState) => {
        const domains = getStoreDomains(getState)
        if (domains !== undefined) {
            return
        }

        httpClient
            .get("/domains")
            .then(res => {
                let domains = handleResponse(res)
                let data = {}
                if (domains.length == 0) {
                    data.domains = [{ id: null, domain: "无" }]
                    data.topics = [{ id: null, domain: "无" }]
                    dispatch(getDomainsAction(data))
                    return
                }
                data.domains = domains
                httpClient
                    .get("/topics?domain=" + domains[0].id)
                    .then(res => {
                        let topics = handleResponse(res)
                        if (topics.length == 0) {
                            data.topics = [{ id: null, domain: "无" }]
                            dispatch(getDomainsAction(data))
                            return
                        }
                        data.topics = topics
                        dispatch(getDomainsAction(data))
                        return
                    })
                    .catch(err => {
                        handleErr(err)
                    })
            })
            .catch(err => {
                handleErr(err)
                console.log(err)
            })
    }
}
export const getTopics = (domainID) => {
    return (dispatch, getState) => {
        let data = {}
        httpClient
            .get("/topics?domain=" + domainID)
            .then(res => {
                let topics = handleResponse(res)
                if (topics.length == 0) {
                    data.topics = [{ id: null, domain: "无" }]
                    dispatch(getTopicAction(data))
                    return
                }
                data.topics = topics
                data.domain = domainID
                dispatch(getTopicAction(data))
                return
            })
            .catch(err => {
                handleErr(err)
            })
    }
}

export const changeDomain = (idx) => {
    return (dispatch, getState) => {
        const domains = getStoreDomains(getState)
        const domain = domains[idx]
        httpClient
            .get("/topics?domain=", domain.id)
            .then(res => {
                let resData = handleResponse(res)
                console.log(resData)
            })
            .catch(err => {
                handleErr(err)
                console.log(err)
            })
    }
}

const changeTopicAction = (data) => ({
    type: constants.CHANGE_TOPIC,
    data
})

export const changeTopic = (idx) => {
    return (dispatch, getState) => {
        const topics = getStoreTopics(getState)
        let data = {}
        data.topic = topics[idx]
        dispatch(changeTopicAction(data))
    }
}

const updateDraftAction = (data) => ({
    type: constants.UPDATE_DRAFT,
    data
})

export const updateDraft = (draft) => {
    return (dispatch) => {
        let data = {}
        data.draft = draft
        dispatch(updateDraftAction(data))
    }
}



