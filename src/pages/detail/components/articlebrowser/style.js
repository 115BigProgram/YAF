import styled from "styled-components";

export const MainWrapper = styled.div`
    height:300px;
    width:100%;
    display:flex;
`

export const HistoryItemWrapper = styled.div`
    background-color:${props => props.active ? "black" : "white"};
    cursor:pointer;
    color:${props => props.active ? "white" : "black"};
    padding:1px 5px 1px 5px;
    margin-right:5px;
    text-align:center;
    border-style:solid;
    border-radius:0.5rem;
    border-color:black;
    border-width:0.5px;
`

export const ButtonsWrapper = styled.div`
    padding:5px;
    background-color:white;
    border-top-left-radius:0.5rem;
    border-bottom-left-radius:0.5rem;
`

export const CenterBlock = styled.div`
    display:flex;
    align-items:center;
`

export const TitleWrapper = styled.div`
    text-align:center;
    font-size:1rem;
    margin-bottom:10px;
    border-bottom-style:solid;
    border-bottom-width:1px;
    border-bottom-color:grey;
`

export const ButtonWrapper = styled.div`
    min-width:75px;
    text-align:center;
    padding:5px;
    margin-bottom:10px;
    font-size:.90rem;
    color:${props => props.active ? "white" : "dodgerblue"};
    background-color:${props => props.active ? "dodgerblue" : "white"};
    border-radius:0.5rem;
    cursor: pointer;

`

export const GraphWrapper = styled.div`
    display:flex;
    flex:1;
    flex-direction:row;
    align-items:center;
    min-width:0;
    min-height:0;
    overflow:auto;
    background-color:white;
`

export const BlankWrapper = styled.div`
    background-color:white;
    color:black;
    width:100%;
    height:100px;
    font-size:50px;
    text-align:center
`


export const HistoryWrapper = styled.div`
    display:flex;
    margin-top:5px;
    flex-wrap:wrap;
    margin-bottom:10px;
`

export const HistoryTitleWrapper = styled.div`
    min-width:85.5px;
    text-align:center;
    font-size:.90rem;
    color:grey;
`

export const ListWrapper = styled.div`
    display:${props => props.show ? "block" : "none"};
`

export const ShowListButton = styled.div`
    display:block;
    text-align:center;
    padding:5px;
    font-size:.90rem;
    color :dodgerblue;
    background-color:white;
    cursor: pointer;
`

export const BrowserToolBar = styled.div`
    display:flex;
    align-items:center;
    margin-top:15px;
`

export const PageNumWrapper = styled.div`
    font-size:0.7rem;
    color:black;
    background-color:white;
    border-radius:0.5rem;
    border-style:solid;
    border-color:grey;
    border-width:0.5px;
    min-width:40px;
    margin-right:5px;
    text-align:center;
`

export const ToolBarButton = styled.div`
    font-size:0.7rem;
    color:dodgerblue;
    cursor: pointer;
    background-color:white;
    min-width:40px;
    text-align:left;
`
