import styled from "styled-components";
import { ContentHorizontalPadding,ContentLength,DesktopMiniWidth,TopNavBarHeight } from "../../../../constvars"

export const ToolBarWrapper = styled.div`
  display:flex;
  align-items:center;
  border-width: 10px;
  height: ${TopNavBarHeight/3}px;
  @media (min-width: ${DesktopMiniWidth}px){
    width: ${ContentLength};
    margin-left: ${ContentHorizontalPadding};
  }
  overflow-x: auto;
`

export const Button = styled.div`
  margin:1px;
  margin-left: 2px;
  text-align:center;
  cursor:pointer;
  flex-wrap: nowrap;
  white-space: nowrap;
  min-width:56px;        
  &:hover {
    text-overflow:ellipsis;  color: cadetblue;
  }

`