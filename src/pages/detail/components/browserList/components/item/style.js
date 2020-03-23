import styled from "styled-components";

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

export const ItemWrapper = styled.div`
    padding:15px;
`

export const TitleWrapper = styled.div`
    width: 98%;
    cursor:pointer;
    line-height: 27px;
    font-size: 18px;
    font-weight: bold;
    max-width: 98%;
    text-overflow:ellipsis;
    color: #333;
`

export const ContentWrapper = styled.div`
    width: 98%;
    line-height: 24px;
    font-size: 13px;
    color: #999;
    text-overflow:ellipsis;
    overflow:hidden;
    height:50px;
    border-bottom-style:solid;
    border-bottom-color:grey;
    border-bottom-width:0.5px;;
`