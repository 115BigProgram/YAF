import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import {actionCreators} from "./store";
import {actionCreators as loginActionCreators} from "../../pages/login/store";
import {actionCreators as HomeContentCreator} from "../../pages/home/store"
import {Typography} from "antd"
import DetailPageToolBar from "../header/components/detailToolBar"

import {
    HeaderWrapper,
    NonHomeItemWrapper,
    NavItem,
    SearchWrapper,
    NavSearch,
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

const {Text} = Typography

class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            NavItemShow:false,
            ActiveNo:0,
        }
    }

    componentDidMount() {
        this.props.handleGetTopic()
    }

    showItem(){
        let preValue=this.state.NavItemShow
        this.setState({
            NavItemShow:!preValue
        })
    }

    onChangeTopic(idx){
        const{
            handleChangeTopic
        } = this.props;

        this.setState({
            ActiveNo:idx
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
                <TopicItem idx={idx} active={ActiveNo}  onClick={()=>this.onChangeTopic.bind(this)(idx)} key={idx}>
                    {item.name}
                </TopicItem>
            )
        })

        return topicItems
    }

    getListArea() {
        const {
            focused,
            list,
            page,
            totalPage,
            mouseIn,
            handleMouseEnter,
            handleMouseLeave,
            handleChangePage
        } = this.props;
        const newList = list.toJS();
        const pageList = [];

        if (newList.length) {
            for (let i = (page - 1) * 10; i < page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                );
            }
        }

        if (focused || mouseIn) {
            return (
                <SearchInfo
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch
                            onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
                        >
                            <i
                                ref={icon => {
                                    this.spinIcon = icon;
                                }}
                                className="iconfont spin"
                            >
                                &#xe851;
                            </i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>{pageList}</SearchInfoList>
                </SearchInfo>
            );
        } else {
            return null;
        }
    }

    render() {
        const {
            focused,
            handleInputFocus,
            handleInputBlur,
            list,
            login,
            logout,
            showToolBar
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
                        <SearchWrapper>
                            <CSSTransition in={focused} timeout={200} classNames="slide">
                                <NavSearch
                                    className={focused ? "focused" : ""}
                                    onFocus={() => handleInputFocus(list)}
                                    onBlur={handleInputBlur}
                                />
                            </CSSTransition>
                            <i className={focused ? "focused iconfont zoom" : "iconfont zoom"}>
                                &#xe614;
                            </i>
                            {this.getListArea()}
                        </SearchWrapper>
                        <Addition>
                            {login ? (
                                <Button className="writting" onClick={logout}>
                                    退出
                                </Button>
                            ):(
                            <Link to="/login">
                                <Button className="writting">
                                    登陆
                                </Button>
                            </Link>
                            )}
                            <Button className="reg">注册</Button>
                        </Addition>
                </HeaderWrapper>
                </HeaderLineWrapper>
                <TopicLineWrapper>
                    {
                        showToolBar?<DetailPageToolBar/>:
                        (< TopicWrapper >
                            { this.getTopics() }
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
        tags:state.getIn(["header","tags"]),
        showToolBar:state.getIn(["detail","showToolBar"])
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
        handleChangeTopic(idx){
            dispatch(HomeContentCreator.setTopic(idx))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispathToProps
)(Header);
