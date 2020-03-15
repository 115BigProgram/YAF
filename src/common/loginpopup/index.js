import React, { Component } from "react"
import { connect } from "react-redux"
import { PopupContainer, LoginBoxWrapper, PopupToolBar, RegisterBoxWrapper } from "./style"
import { Input, Button } from 'antd';
import { actionCreators } from '../../pages/login/store'


class LoginPopup extends Component {
    constructor(props) {
        super(props)
        this.state = { password: "", username: "" }
        this.handleInputUserName = this.handleInputUserName.bind(this)
        this.handleInputPassword = this.handleInputPassword.bind(this)
    }

    handleInputUserName(e) {
        this.setState({ username: e.target.value })
    }

    handleInputPassword(e) {
        this.setState({ password: e.target.value })
    }

    render() {
        const {
            handleSwitchToLogin,
            handleSwitchToRegister,
            handleLogin,
            hadnleRegister
        } = this.props

        const {
            username,
            password
        } = this.state

        return (
            <PopupContainer show={this.props.show}>
                <div>
                    <PopupToolBar>
                        <Button type="link" className="closebutton" onClick={this.props.handleClosePopup}>关闭</Button>
                    </PopupToolBar>
                    <LoginBoxWrapper show={this.props.isLoginPage}>
                        <div className="title" >
                            登陆
                    </div>
                        <Input onChange={(e) => this.handleInputUserName(e)} placeholder="请输入邮箱" />
                        <Input.Password onChange={this.handleInputPassword} placeholder="请输入密码" className="inputbox" />
                        <Button
                            type="primary"
                            className="submit"
                            onClick={() => { handleLogin(username, password) }}>确定</Button>
                        <div className="toolbar">
                            <div className="register">
                                没有账号?
                    </div>
                            <Button type="link" className="register " onClick={handleSwitchToRegister}>注册</Button>
                        </div>
                    </LoginBoxWrapper>

                    <RegisterBoxWrapper show={!this.props.isLoginPage}>
                        <div className="title">
                            注册
                    </div>
                        <Input className="inputbox" placeholder="请输入用户名" />
                        <Input className="inputbox" placeholder="请输入邮箱" />
                        <Input.Password className="inputbox" placeholder="请输入密码" />
                        <Input.Password className="inputbox" placeholder="请重复输入密码" />
                        <Button type="primary" className="submit" onClick={hadnleRegister}>注册</Button>

                        <div className="toolbar">
                            <div className="login">
                                已有账号?
                    </div>
                            <Button type="link" className="login" onClick={handleSwitchToLogin}>登陆</Button>
                        </div>

                    </RegisterBoxWrapper>
                </div>
            </PopupContainer>
        )
    }
}

const mapState = state => ({
    show: state.getIn(["login", "showPopup"]),
    isLoginPage: state.getIn(["login", "isLoginPage"])
})

const mapDispatch = dispatch => ({
    handleLogin(username, password) {
        dispatch(actionCreators.login(username, password))
    },
    hadnleRegister(username,email,password){
        dispatch(actionCreators.register(username,email,password))
    },
    handleClosePopup() {
        dispatch(actionCreators.closePopup())
    },
    handleSwitchToRegister() {
        dispatch(actionCreators.changePage(false))
    },
    handleSwitchToLogin() {
        dispatch(actionCreators.changePage(true))
    }
})

export default connect(
    mapState,
    mapDispatch
)(LoginPopup)
