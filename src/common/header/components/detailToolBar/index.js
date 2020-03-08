import React,{Component} from "react"
import { ToolBarWrapper, Button } from "./style"
import {actionCreators} from "../../../../pages/detail/store"
import { connect } from "react-redux";
import { SHOW_READ_LIST } from "../../../../pages/detail/store/constants";

class DetailPageToolBar extends Component{
    goBack(){
        const {
            showTopic
        } = this.props

        window.history.back()
    }
    render(){
        const{ 
            showReadList,
            srl
        } = this.props

        console.log(srl)

        return (
            <div>
                <ToolBarWrapper>
                    <Button onClick={this.goBack.bind(this)}>返回</Button>
                    <Button onClick={()=>showReadList()} >阅读目录</Button>
                    <Button>文章索引</Button>
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
  }
});

export default connect(
    mapState,
    mapDispatch
)(DetailPageToolBar)