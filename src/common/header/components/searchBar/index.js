import React,{Component} from "react"
import { connect } from "react-redux";
import {SearchWrapper,NavSearch} from "./style"
import {actionCreators} from "../../../../pages/home/store"

class Search extends Component{
    constructor(props){
        super(props)
        this.handleInput = this.handleInput.bind(this);
        this.search=this.search.bind(this)
        this.state={inputValue:''}
    }

    componentDidMount(){
        let initValue=this.props.keyword
        this.setState({inputValue:initValue})
    }


    handleInput(event) {
        //this.setState({value: event.target.value});
        this.setState({inputValue:event.target.value})
    }

    search(){
        const {
            handleSearch
        } = this.props

        const {
            inputValue
        } = this.state
        handleSearch(inputValue)
    }

    render(){
        return(
            <SearchWrapper>
                <NavSearch value={this.state.inputValue} onChange={(e)=>this.handleInput(e)}/>
                <i onClick={this.search} className="focused iconfont zoom" >
                    &#xe614;
                </i>
            </SearchWrapper>
        )
    }
}


const mapState = state => ({
    keyword: state.getIn(["home","keyword"])
})

const mapDispatch = dispatch =>({
    handleSearch(keyword){
        dispatch(actionCreators.changeKeyword(keyword))
    }
})

export default connect(
    mapState,
    mapDispatch
)(Search)
