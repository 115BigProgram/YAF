import React,{ Component } from "react"
import {Steps} from "antd"
import {StepBarWrapper, ButtonWrapper} from "./style"

const {Step} = Steps

class ArticleStepBar extends Component{
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
        const articles=[
            {domain:"数学",title:"线性代数"},
            {domain:"编程",title:"Python 速成"},
            {domain:"机器学习",title:"CNN 神经网络"}
        ]

        const steps=[]
        articles.forEach( (element,idx) => {
        steps.push(
            <Step title={element.domain} description={element.title} key={idx} ></Step>
        )
        })

        return steps
    }

    Goback(){
        window.history.back()
    }
    render(){
        return (
        <div>
            <ButtonWrapper>
            <div onClick={this.Goback}>L</div>
            <div onClick={this.showStepBar.bind(this)}>R</div>
            <div>I</div>
            </ButtonWrapper>  
            <StepBarWrapper show={this.state.showStep}>
            <Steps progressDot current={1} direction="vertical">
                {this.getArticles()}
            </Steps>
            </StepBarWrapper>
        </div>
        )
    }
}

export default ArticleStepBar