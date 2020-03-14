import styled from "styled-components";
import { ContentHorizontalPadding,ContentLength,DesktopMiniWidth,TopNavBarHeight } from "../../../../constvars"


export const SearchWrapper = styled.div`
  position: relative;
  z-index: 3;
  top:0;
  cursor: pointer;
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
  padding: 0 30px 0 20px;
  height: 38px;
  @media (min-width:${DesktopMiniWidth}px) {
    margin-left: 20px;
    width: 200px;
  }

  @media (max-width:${DesktopMiniWidth}px) {
    width: 160;
    margin: 0px;
    margin-left:2px;
    padding: 0px;
  }
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