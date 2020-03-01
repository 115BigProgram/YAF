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

    Goback(){
        window.history.back()
    }
    render(){
        return (
        <div>
            <ButtonWrapper>
            <div onClick={this.Goback}>GOBACK</div>
            <button onClick={this.showStepBar.bind(this)}>SHOW</button>
            </ButtonWrapper>  
            <StepBarWrapper show={this.state.showStep}>
            <Steps progressDot current={1} direction="vertical">
                <Step title="Finished" description="This is a description. This is a description." />
                <Step title="Finished" description="This is a description. This is a description." />
                <Step title="In Progress" description="This is a description. This is a description." />
                <Step title="Waiting" description="This is a description." />
                <Step title="Waiting" description="This is a description." />
            </Steps>
            </StepBarWrapper>
        </div>
        )
    }
}

export default ArticleStepBar