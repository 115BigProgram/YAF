import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import {actionCreators} from "./store";
import {actionCreators as loginActionCreators} from "../../pages/login/store";
import {actionCreators as HomeContentCreator} from "../../pages/home/store"
import {Typography} from "antd"
import {
    HeaderWrapper,
    Logo,
    Nav,
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
    TopicItem, TopicWrapper, TagWrapper, TagItem, SearchWrapperOuter
} from "./style";

const {Text} = Typography

class Header extends Component {

    componentDidMount() {
        this.props.handleGetTopic()
        this.props.handleChangeTags(0)
    }

    getTopics() {
        const {
            topics,
            handleChangeTags
        } = this.props;

        const newTopics = topics.toJS()
        const topicItems = []
        newTopics.map((item, idx) => {
            topicItems.push(
                <TopicItem  onClick={()=>handleChangeTags(idx)} key={idx}>
                    {item}
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
        } = this.props;
        return (
            <div>
                <HeaderWrapper>
                    <Nav>
                        <Link to="/">
                            <Logo/>
                        </Link>
                        <Link to="/">
                            <NavItem className="left active">首页</NavItem>
                        </Link>
                        <NavItem className="left">下载App</NavItem>
                        {login ? (
                            <NavItem onClick={logout} className="right">
                                退出
                            </NavItem>
                        ) : (
                            <Link to="/login">
                                <NavItem className="right">登陆</NavItem>
                            </Link>
                        )}
                        <NavItem className="right">
                            <i className="iconfont">&#xe636;</i>
                        </NavItem>
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
                            <Link to="/write">
                                <Button className="writting">
                                    <i className="iconfont">&#xe615;</i>
                                    写文章
                                </Button>
                            </Link>
                            <Button className="reg">注册</Button>
                        </Addition>
                    </Nav>
                </HeaderWrapper>
                < TopicWrapper >
                    { this.getTopics() }
                </ TopicWrapper >
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
        topics: state.getIn(["header", "topics"]),
        tags:state.getIn(["header","tags"])
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
            dispatch(actionCreators.getTopics())
        },
        logout() {
            dispatch(loginActionCreators.logout());
        },
        handleChangeTags(idx){
            dispatch(HomeContentCreator.getTags(idx))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispathToProps
)(Header);
