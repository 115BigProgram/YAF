import styled from "styled-components";

export const StepBarWrapper=styled.div`
    display:${props => props.show?"block":"none"};
    background-color:grey;
    padding:10px 20px;
`
export const ButtonWrapper=styled.div`
    display:flex;
    align-items:center;
`