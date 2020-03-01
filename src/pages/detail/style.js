import styled from "styled-components";

let toolBarHeight = 50;

export const EmptyDiv = styled.div`
  visibility:hidden;
`

export const DetailWrapper = styled.div`
  display:flex;
  align-items:flex-start;
`;

export const StepBarWrapper =styled.div`
  width:auto;
  min-height:100vh;
  overflow:auto;
  background-color:cyan;
`

export const FixedInStepBarWrapper =styled.div`
  position: fixed;
  width:inherit;
`

export const ArticleWrapper = styled.div`
  width:auto;
  margin-left:auto;
  min-height:100vh;
  overflow:auto;
  padding-bottom: 100px;
  background-color:white;
  padding:15px;
`

export const Header = styled.div`
  margin: 0 0 20px 0;
  line-height: 44px;
  font-size: 34px;
  color: #333;
  font-weight: bold;
`;

export const Content = styled.div`
  color: #2f2f2f;
  img {
    width: 100%;
  }
  p {
    margin: 25px 0;
    font-size: 16px;
    line-height: 30px;
  }
  b {
    font-weight: bold;
  }
`;
