import styled from "styled-components";
import logoPic from "../../statics/logo.png";
import { ContentHorizontalPadding,ContentLength,DesktopMiniWidth,TopNavBarHeight } from "../../constvars"
import {Content} from "../../pages/detail/style";


const toolBarHeight = TopNavBarHeight/3*2 ;
const topicBarHeight =toolBarHeight/2;

const navFontSize = 17;
const navDivMiniSize  = navFontSize*4;


export const HeaderWrapper = styled.div`
  z-index: 1;
  position: relative;
  height: ${toolBarHeight}px;
  border-bottom: 1px solid #f0f0f0;
`;

export const Logo = styled.div`
  width: 100px;
  height: 50px;
  background: url(${logoPic});
  background-size: contain;
`;

export const Nav = styled.div`
  height: 95%;
  @media (min-width: ${DesktopMiniWidth}px){
    margin-left:${ContentHorizontalPadding};
    width: ${ContentLength};
  }
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow-x: auto;
`;

export const NavItem = styled.div`
  line-height: 56px;
  padding: 0 15px;
  font-size: ${navFontSize}px;
  color: #333;
  cursor:pointer;
  min-width: ${navDivMiniSize}px;
  white-space: nowrap;
  text-overflow: ellipsis;
  &.active {
    color: #ea6f5a;
  }
`;


export const SearchWrapper = styled.div`
  position: relative;
  .zoom {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    &.focused {
      background: #777;
      color: #fff;
    }
  }
`;

export const NavSearch = styled.input.attrs({
    placeholder: "搜索"
})`
  z-index: 3;
  width: 160px;
  height: 38px;
  padding: 0 30px 0 20px;
  margin-top: 9px;
  margin-left: 20px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-radius: 19px;
  background: #eee;
  font-size: 14px;
  color: #666;
  &::placeholder {
    color: #999;
  }
  &.focused {
    width: 240px;
  }
  &.slide-enter {
    transition: all 0.2s ease-out;
  }
  &.slide-enter-active {
    width: 240px;
  }
  &.slide-exit {
    transition: all 0.2s ease-out;
  }
  &.slide-exit-active {
    width: 160px;
  }
`;

export const SearchInfo = styled.div`
  position: absolute;
  z-index: 5;
  left: 0;
  top: 56px;
  width: 240px;
  padding: 0 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  background: #fff;
`;

export const SearchInfoTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  line-height: 20px;
  font-size: 14px;
  color: #969696;
`;

export const SearchInfoSwitch = styled.span`
  float: right;
  font-size: 13px;
  cursor: pointer;
  .spin {
    display: block;
    float: left;
    font-size: 12px;
    margin-right: 2px;
    transition: all 0.2s ease-in;
    transform-origin: center center;
  }
`;

export const SearchInfoList = styled.div`
  overflow: hidden;
`;

export const SearchInfoItem = styled.a`
  display: block;
  float: left;
  line-height: 20px;
  padding: 0 5px;
  margin-right: 10px;
  margin-bottom: 15px;
  font-size: 12px;
  border: 1px solid #ddd;
  color: #787878;
  border-radius: 3px;
`;

export const Addition = styled.div`
  margin-left:auto;
  display: flex;
  flex-wrap:nowrap;
`;

export const Button = styled.div`
  margin-top: 9px;
  margin-right: 20px;
  padding: 0 20px;
  line-height: 38px;
  border-radius: 19px;
  border: 1px solid #ec6149;
  font-size: 14px;
  &.reg {
    color: #ec6149;
  }
  &.writting {
    color: #fff;
    background: #ec6149;
  }
`;

export const TopicWrapper = styled.div`
  display:flex;
  align-items:center;
  background-color: aqua;
  border-width: 10px;
  border-bottom: 1px solid #f0f0f0;
  height: ${TopNavBarHeight/3}px;
  @media (min-width: ${DesktopMiniWidth}px){
    width: ${ContentLength};
    margin-left: ${ContentHorizontalPadding};
  }
  overflow-x: auto;
`

export const TopicItem = styled.div`
  margin:1px;
  margin-left: 2px;
  margin-right: 5px;
  text-align:center;
  cursor:pointer;
  flex-wrap: nowrap;
  white-space: nowrap;
  min-width:56px;        
  &:hover {
  text-overflow:ellipsis;  color: cadetblue;
  }
`

