import styled from "styled-components";
import { ContentHorizontalPadding,ContentLength,DesktopMiniWidth,TopNavBarHeight } from "../../../../constvars"

export const ToolBarWrapper = styled.div`
  border-width: 10px;
  height: ${TopNavBarHeight/3}px;
  @media (min-width: ${DesktopMiniWidth}px){
    width: ${ContentLength};
    margin-left: ${ContentHorizontalPadding};
  }
`

export const LineWrapper = styled.div`
  display:flex;
  overflow-x:auto;
`

export const LineItem = styled.div`
`
