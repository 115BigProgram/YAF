import React, { Component } from "react"
import { connect } from "react-redux"
import { actionCreators } from "../../store"
import {LineWrapper, EditorWrapper, TitleWrapper, DomainItemWrapper, TopicItemWrapper} from "./style"

class WriteToolBar extends Component {
    constructor(props){
        super(props)
        this.getDomains=this.getDomains.bind(this)
        this.getTopics=this.getTopics.bind(this)
    }

    componentDidMount() {
        console.log(this.props.topics)
        this.props.getDomain()
    }

    getDomains() {
        const {
            domains
        }=this.props


        let items=[]
        if (domains==undefined){
            return items
        }

        domains.toJS().forEach(domain => {
            items.push(<DomainItemWrapper key={domain.id==null?0:domain.id}>
                {domain.domain}
            </DomainItemWrapper>)
        })

        return items
    }

    getTopics() {
        const {
            topics
        }=this.props

        console.log(topics)

        let items=[]
        topics.toJS().forEach(topic => {
            items.push(<TopicItemWrapper key={topic.id==null?0:topic.id}>
                {topic.topic}
            </TopicItemWrapper>)
        })

        return items
    }

    render() {
        return (
            <EditorWrapper>
                <LineWrapper>
                    <TitleWrapper>学科:</TitleWrapper>
                    {
                        this.getDomains()
                    }
                </LineWrapper>
                <LineWrapper>
                    <TitleWrapper>主题:</TitleWrapper>
                    {
                        this.getTopics()
                    }
                </LineWrapper>
            </EditorWrapper>
        )

    }
}

const mapState = state => ({
    domains: state.getIn(["write", "domains"]),
    topics: state.getIn(["write", "topics"])
})

const mapDispatch = dispatch => ({
    getDomain() {
        dispatch(actionCreators.getDomains())
    }
})

export default connect(
    mapState,
    mapDispatch
)(WriteToolBar)