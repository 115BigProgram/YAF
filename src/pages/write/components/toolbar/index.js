import React, { Component } from "react"
import { connect } from "react-redux"
import { actionCreators } from "../../store"
import {LineWrapper, EditorWrapper, TitleWrapper} from "./style"

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
            items.push(<div key={domain.id==null?0:domain.id}>
                {domain.domain}
            </div>)
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
            items.push(<div key={topic.id==null?0:topic.id}>
                {topic.topic}
            </div>)
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