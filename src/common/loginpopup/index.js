import React, { Component } from "react"
import { connect } from "react-redux"
import { PopupContainer, LoginBoxWrapper, PopupToolBar } from "./style"
import { Input, Button } from 'antd';
import {actionCreators} from '../../pages/login/store'


class LoginPopup extends Component {
    constructor(props){
        super(props)
        this.state={password:"",username:""}
        this.handleInputUserName=this.handleInputUserName.bind(this)
        this.handleInputPassword=this.handleInputPassword.bind(this)
    }

    handleInputUserName(e){
        this.setState({username:e.target.value})
    }

    handleInputPassword(e){
        this.setState({password:e.target.value})
    }



    render() {
        return (
            <PopupContainer show={this.props.show}>
                <div>
                <PopupToolBar>
                    <Button type="link" className="closebutton" onClick={this.props.handleClosePopup}>关闭</Button>
                </PopupToolBar>
                <LoginBoxWrapper>
                    <div className="title">
                        登陆
                    </div>
                    <Input onChange={(e)=>this.handleInputUserName(e)} placeholder="请输入邮箱" />
                    <Input.Password onChange={this.handleInputPassword} placeholder="请输入密码" className="inputbox" />
                    <Button type="primary" className="submit">确定</Button>
                    <div className="toolbar">
                        <div className="register">
                            没有账号?
                    </div>
                        <Button type="link" className="register ">注册</Button>
                    </div>
                </LoginBoxWrapper>
                </div>
            </PopupContainer>
        )
    }
}

const mapState = state => ({
    show:state.getIn(["login","showPopup"])
})

const mapDispatch = dispatch => ({
    handleLoginIn(username,password){

    },
    handleClosePopup(){
        dispatch(actionCreators.closePopup())
    },
})

export default connect(
    mapState,
    mapDispatch
)(LoginPopup)
