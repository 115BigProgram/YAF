import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavSearch from "../header/components/searchBar"
import { actionCreators } from "./store";
import { actionCreators as loginActionCreators } from "../../pages/login/store";
import { actionCreators as HomeContentCreator } from "../../pages/home/store"
import DetailPageToolBar from "../header/components/detailToolBar"

import {
    HeaderWrapper,
    NonHomeItemWrapper,
    NavItem,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Addition,
    Button,
    TopicItem,
    TopicWrapper,
    NavWrapper,
    NavItemShowButton,
    HeaderLineWrapper,
    TopicLineWrapper,
    LogoWrapper
} from "./style";

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            NavItemShow: false,
            ActiveNo: 0,
        }
    }

    componentDidMount() {
        this.props.handleGetTopic()
    }

    showItem() {
        let preValue = this.state.NavItemShow
        this.setState({
            NavItemShow: !preValue
        })
    }

    onChangeTopic(idx) {
        const {
            handleChangeTopic
        } = this.props;

        this.setState({
            ActiveNo: idx
        })

        handleChangeTopic(idx)
    }

    getTopics() {
        const {
            topics,
            handleChangeTopic
        } = this.props;

        const {
            ActiveNo
        } = this.state;


        const newTopics = topics.toJS()
        const topicItems = []
        newTopics.map((item, idx) => {
            topicItems.push(
                <TopicItem idx={idx} active={ActiveNo} onClick={() => this.onChangeTopic.bind(this)(idx)} key={idx}>
                    {item.domain}
                </TopicItem>
            )
        })

        return topicItems
    }


    render() {
        const {
            login,
            logout,
            showToolBar,
            handleShowLogin,
            handleShowRegister
        } = this.props;
        return (
            <div>
                <HeaderLineWrapper>
                    <HeaderWrapper>
                        <Link to="/">
                            <LogoWrapper>
                                <div>知识</div>
                                <div>论坛</div>
                            </LogoWrapper>
                        </Link>
                        <NavWrapper>
                            <Link to="/">
                                <NavItem className="active home">首页</NavItem>
                            </Link>
                            <NavItemShowButton className="arrow" onClick={this.showItem.bind(this)}></NavItemShowButton>
                            <NonHomeItemWrapper show={this.state.NavItemShow}>
                                <NavItem className="left">下载App</NavItem>
                                <NavItem className="right">
                                    <i className="iconfont">&#xe636;</i>
                                </NavItem>
                                <NavItem>
                                    TEST
                              </NavItem>
                            </NonHomeItemWrapper>
                        </NavWrapper>
                        <NavSearch />
                        <Addition>
                            {login ? (
                                <Button className="writting" onClick={logout}>
                                    退出
                                </Button>
                            ) : (
                                    <Button className="writting" onClick={handleShowLogin}>
                                        登陆
                                    </Button>
                                )}
                            <Button className="reg" onClick={handleShowRegister}>注册</Button>
                        </Addition>
                    </HeaderWrapper>
                </HeaderLineWrapper>
                <TopicLineWrapper>
                    {
                        showToolBar ? <DetailPageToolBar /> :
                            (< TopicWrapper >
                                {this.getTopics()}
                            </ TopicWrapper >)
                    }
                </TopicLineWrapper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        focused: state.getIn(["header", "focused"]),
        list: state.getIn(["header", "list"]),
        page: state.getIn(["header", "page"]),
        totalPage: state.getIn(["header", "totalPage"]),
        mouseIn: state.getIn(["header", "mouseIn"]),
        login: state.getIn(["login", "login"]),
        topics: state.getIn(["home", "topics"]),
        tags: state.getIn(["header", "tags"]),
        showToolBar: state.getIn(["detail", "showToolBar"])
    };
};

const mapDispathToProps = dispatch => {
    return {
        handleInputFocus(list) {
            list.size === 0 && dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/gi, "");
            if (originAngle) {
                originAngle = parseInt(originAngle, 10);
            } else {
                originAngle = 0;
            }
            spin.style.transform = "rotate(" + (originAngle + 360) + "deg)";

            if (page < totalPage) {
                dispatch(actionCreators.changePage(page + 1));
            } else {
                dispatch(actionCreators.changePage(1));
            }
        },
        handleGetTopic() {
            dispatch(HomeContentCreator.getTopics())
        },
        logout() {
            dispatch(loginActionCreators.logout());
        },
        handleChangeTopic(idx) {
            dispatch(HomeContentCreator.setTopic(idx))
        },
        handleShowLogin() {
            dispatch(loginActionCreators.showPopup(true))
        },
        handleShowRegister(){
            dispatch(loginActionCreators.showPopup(false))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispathToProps
)(Header);
