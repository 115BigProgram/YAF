import React, { Component } from "react"
import { connect } from "react-redux"
import { ToolBarWrapper, LineWrapper } from "./style"
import { actionCreators } from "../../../../pages/write/store"

class WriteToolBar extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <ToolBarWrapper>
                <span style={{position:"relative",top:600,left:550}}><img onClick={this.commitArticle.bind(this)} style={{cursor:"pointer"}} width="50vw" height="50vw" title="提交" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg0OTcyMzc3Mzk2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM3MzMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDBDMjI5LjY2ODU3MSAwIDAgMjI5LjY2ODU3MSAwIDUxMnMyMjkuNjY4NTcxIDUxMiA1MTIgNTEyIDUxMi0yMjkuNjY4NTcxIDUxMi01MTJTNzk0LjMzMTQyOSAwIDUxMiAweiBtMzA3LjIgMzQzLjc3MTQyOXMtMjY3LjcwMjg1NyAyOTUuNDk3MTQzLTMyNy42OCAzNjUuNzE0Mjg1Yy01OS45NzcxNDMgNzAuMjE3MTQzLTEwNi43ODg1NzEgMC0xMDYuNzg4NTcxIDBMMjEwLjY1MTQyOSA1MjkuNTU0Mjg2cy0yNy43OTQyODYtNDIuNDIyODU3IDIxLjk0Mjg1Ny04MS45MmM0Ni44MTE0MjktMzguMDM0Mjg2IDg0Ljg0NTcxNCAwIDg0Ljg0NTcxNCAwbDEyMi44OCAxMjguNzMxNDI4TDc0Ni4wNTcxNDMgMjkxLjEwODU3MXMyOS4yNTcxNDMtMjAuNDggNTkuOTc3MTQzIDUuODUxNDI5YzIzLjQwNTcxNCAyMS45NDI4NTcgMTMuMTY1NzE0IDQ2LjgxMTQyOSAxMy4xNjU3MTQgNDYuODExNDI5eiIgZmlsbD0iIzY4QkY3QiIgcC1pZD0iMzczNCI+PC9wYXRoPjwvc3ZnPg=="/></span>
            </ToolBarWrapper>
        )

    }
    commitArticle()
{
    var day = new Date();
    day.setTime(day.getTime());
    var time = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
    var articleContent=this.props.content
    let articleInfo={
        title:articleContent.split("\n")[0],
        domainID:this.props.domain,
        topicID:this.props.topic,
        content:articleContent,
        authorID:2,
        authorName:"zthang",
        publishDate:time
    }
    this.props.commitArticle(articleInfo)
}
}
const mapState = state => ({
    domains: state.getIn(["write", "domains"]),
    topics: state.getIn(["write", "topics"]),
    domain: state.getIn(["write", "domain"]),
    topic: state.getIn(["write", "topic"]),    
    content: state.getIn(["header","content"])
})

const mapDispatch = dispatch => ({
    getDomain() {
        dispatch(actionCreators.getDomains())
    },
    commitArticle(articleInfo) {
        dispatch(actionCreators.commitArticle(articleInfo))
    }
})

export default connect(
    mapState,
    mapDispatch
)(WriteToolBar)