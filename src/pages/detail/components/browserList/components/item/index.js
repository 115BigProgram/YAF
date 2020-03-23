import React,{Component} from "react"
import {connect} from "react-redux"
import { ItemWrapper,TitleWrapper,ContentWrapper } from "./style"
import {actionCreators} from "../../../../store"

class ListItem extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {
            title,
            content,
            id,
            handlieClickTitle
        }=this.props
        return (
            <ItemWrapper>
                <TitleWrapper onClick={()=>{handlieClickTitle(id)}}>{title}</TitleWrapper>
                <ContentWrapper>{content}</ContentWrapper>
            </ItemWrapper>
        )
    }
}

const mapState=state=>({

})

const mapDispatch=dispatch=>({
    handlieClickTitle(id){
        console.log(id)
        dispatch(actionCreators.changeDetailPageArticle(id))
    }
})

export default connect(
    mapState,
    mapDispatch
)(ListItem)