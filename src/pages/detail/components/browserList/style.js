import styled from "styled-components";

export const CurrentTopicWrapper = styled.div`
  width:100%;
  text-align:left;
  color:black;
  background-color:white;
  font-size:1rem;
  padding-left:25px;
  ::before{
    content:"当前主题:"
  }

    border-bottom-style:solid;
    border-bottom-width:0.5px;
    border-bottom-color:grey;

`

export const TabGroupWrapper = styled.div`
  display:flex;
  align-items:center;
background-color:white;
`
export const TabWrapper = styled.div`
  color:${props => props.active ? "white" : "dodgerblue"};
  background-color:${props => props.active ? "dodgerblue" : "white"};
  text-align:center;
  margin-left:5px;
  padding:5px 5px 5px 5px;
  .first{
    border-top-left-radius: 14rem;
  }
  .last{
    border-top-right-radius: 14rem;
  }
  border-bottom-style:solid;
  border-bottom-width:0.5px;
`

export const ListAreaWrapper = styled.div`
  max-height:450px;
  overflow-y:auto;
  background-color:white;
`

export const RecommendListWrapper = styled.div`
  display:${props=>props.show?"block":"none"};

`

export const BrowserListWrapper = styled.div`
  display:${props=>props.show?"block":"none"};

`

