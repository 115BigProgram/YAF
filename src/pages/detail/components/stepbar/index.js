import React,{ Component } from "react"
import {Steps} from "antd"
import {StepBarWrapper } from "./style"
import {connect} from "react-redux"
import {actionCreators} from "../../store"

const {Step} = Steps

class ReadList extends Component{
    constructor(props){
        super(props)
        this.state={showStep:false}
    }

    showStepBar(){
        let prev=this.state.showStep
        this.setState(
            {
                showStep:!prev
            }
        )
    }

    getArticles(){
        const{ 
            readList,
            changeArticle
        } = this.props

        const articles=readList.toJS()

        const steps=[]
        articles.forEach( (element,idx) => {
        steps.push(
            <Step 
            title={element.domain} 
            description={element.title} 
            key={idx}
            onClick={()=>changeArticle(idx)}
            />
        )
        })

        return steps
    }

    changeArticle(){

    }

    render(){
        const {
            articleIdx
        } = this.props
        return (
        <div>
            <StepBarWrapper>
            <Steps progressDot current={articleIdx} direction="vertical" onChange={this.changeArticle}>
            </Steps>
            </StepBarWrapper>
        </div>
        )
    }
}

const mapState = state => ({
  readList: state.getIn(["detail","readList"]),
  articleIdx: state.getIn(["detail","currentArticle"])
});

const mapDispatch = dispatch => ({
    changeArticle(idx){
        console.log('hit')
        dispatch(actionCreators.changeArticleIdx(idx))
    }
});

export default connect(
    mapState,
    mapDispatch
)(ReadList)