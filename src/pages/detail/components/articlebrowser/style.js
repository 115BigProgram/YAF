import styled from "styled-components";

export const MainWrapper = styled.div`
    height:300px;
    width:100%;
    display:flex;
`

export const ButtonsWrapper = styled.div`
    padding:5px;
    background-color:white;
    border-top-left-radius:0.5rem;
    border-bottom-left-radius:0.5rem;
    border-right-style:solid;
    border-right-width:0.5px;
    border-right-color:grey;
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


export const HistoryWrapper = styled.div`
    display:flex;
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