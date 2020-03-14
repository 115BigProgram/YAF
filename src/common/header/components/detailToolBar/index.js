import React,{Component} from "react"
import { ToolBarWrapper, Button } from "./style"
import {actionCreators} from "../../../../pages/detail/store"
import { connect } from "react-redux";

class DetailPageToolBar extends Component{
    goBack(){
        window.history.back()
    }
    render(){
        const{ 
            showReadList,
            srl,
            showArticleIndex
        } = this.props

        console.log(srl)

        return (
            <div>
                <ToolBarWrapper>
                    <Button onClick={this.goBack.bind(this)}>返回</Button>
                    <Button onClick={()=>showReadList()} >阅读目录</Button>
                    <Button onClick={()=>showArticleIndex()}>文章索引</Button>
                </ToolBarWrapper>
            </div>
        )
    }
} 

const mapState = state => ({
    srl:state.getIn(["detail","showReadList"])
});

const mapDispatch = dispatch => ({
  showTopic(){
    dispatch(actionCreators.switchToolBar(false))
  },
  showReadList(){
      dispatch(actionCreators.switchReadList())
  },
  showArticleIndex(){
      dispatch(actionCreators.switchArticleIndex())
  }
});

export default connect(
    mapState,
    mapDispatch
)(DetailPageToolBar)