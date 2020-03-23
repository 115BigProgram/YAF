import React, { Component } from "react"
import { connect } from "react-redux"
import { actionCreators } from "../../store"
import {LineWrapper, EditorWrapper, TitleWrapper, DomainItemWrapper, TopicItemWrapper} from "./style"

class WriteToolBar extends Component {
    constructor(props){
        super(props)
        this.getDomains=this.getDomains.bind(this)
        this.getTopics=this.getTopics.bind(this)
        this.selectDomain=this.selectDomain.bind(this)
        this.selectTopic=this.selectTopic.bind(this)
    }

    componentDidMount() {
        console.log(this.props.topics)
        this.props.getDomain()
    }

    selectDomain(e){
        var domains=this.getDomains()
        var selectedDomain=0
        for(var i=0;i<domains.length;i++)
            if(domains[i].props.children==e.target.value)
                selectedDomain=domains[i].key
        this.props.getTopic(selectedDomain)     
    }
    selectTopic(e){
        var topics=this.props.topics.toJS()
        var selectedTopic=0
        for(var i=0;i<topics.length;i++)
            if(topics[i].topic==e.target.value)
                selectedTopic=topics[i].id
        this.props.setSelectedTopic(selectedTopic)  
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
            items.push(
                <option key={domain.id==null?0:domain.id}>{domain.domain}</option>
            )
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
            items.push(<option key={topic.id==null?0:topic.id}>
                {topic.topic}
            </option>)
        })

        return items
    }

    render() {
        return (
            <EditorWrapper>
                <LineWrapper>
                    <TitleWrapper>学科:</TitleWrapper>
                    <select onChange={this.selectDomain}>
                    {
                        this.getDomains()
                    }
                    </select>
                </LineWrapper>
                <LineWrapper>
                    <TitleWrapper>主题:</TitleWrapper>
                    <select onChange={this.selectTopic}>
                    {
                        this.getTopics()
                    }
                    </select>
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
    },
    getTopic(domainID){
        dispatch(actionCreators.getTopics(domainID))
    },
    setSelectedTopic(selectedTopic){
        dispatch(actionCreators.setSelectedTopic(selectedTopic))
    }
})

export default connect(
    mapState,
    mapDispatch
)(WriteToolBar)