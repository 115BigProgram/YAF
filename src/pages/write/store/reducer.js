import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
    draft: "",
    domain: Object,
    topic: Object,
    domains: undefined,
    topics: []
});

const changeDomain = (state, action) => {
    return state.merge({
        topics: action.data.topics,
        domain: action.data.domain
    })
}

const setDomains = (state, action) => {
    console.log(action)
    return state.merge({
        domains: action.data.domains,
        domain: action.data.domains[0],
        topics: action.data.topics,
        topic: action.data.topics[0],
    })
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_DOMAIN:
            return changeDomain(state, action)
        case constants.CHANGE_TOPIC:
            return state.set("topic", action.data.topic)
        case constants.GET_DOMAINS:
            return setDomains(state, action)
        case constants.UPDATE_DRAFT:
            return state.set("draft", action.data.draft)
        default:
            return state
    }
}