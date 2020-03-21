import * as constants from "./constants";
import httpClient, { handleErr, handleResponse } from "../../../client"

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



