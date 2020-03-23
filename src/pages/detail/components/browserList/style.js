import styled from "styled-components";

export const CurrentTopicWrapper = styled.div`
  width:100%;
  text-align:center;
  color:black;
  background-color:white;
  font-size:1rem;
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
  height:450px;
  overflow-y:auto;
  background-color:white;
`

export const RecommendListWrapper = styled.div`

`

export const BrowserListWrapper = styled.div`

`

export const ListItem = styled.div`
  overflow: hidden;
  padding: 20px 0;
  :first{
    padding-top:5px;
  }
  border-bottom: 1px solid #dcdcdc;
  width: 100%;
  
  .pic {
    display: block;
    width: 125px;
    height: 100px;
    float: right;
    border-radius: 10px;
  }
`;

export const ListInfo = styled.div`
  width: 98%;
  .title {
    line-height: 27px;
    font-size: 18px;
    font-weight: bold;
    max-width: 98%;
    text-overflow:ellipsis;
    color: #333;
  }
  .desc {
    line-height: 24px;
    font-size: 13px;
    color: #999;
    text-overflow:ellipsis;
    height:50px;
  }
`;