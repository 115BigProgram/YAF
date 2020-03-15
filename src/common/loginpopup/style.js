import styled from "styled-components";

export const PopupContainer = styled.div`
  display:${(props)=>props.show?"flex":"none"};
  position:fixed;
  z-index:500;
  background-color: rgba(0, 0, 0, 0.25);

  justify-content:center;
  align-items:center;
  top:0;
  left:0;
  right:0;
  bottom:0;
`

export const PopupToolBar = styled.div`
  width: 318px;
  background-color:white;
  display:flex;
  align-items:center;

  .closebutton{
      margin-left:auto
  }
`

export const LoginBoxWrapper = styled.div`
  display:${(props)=>props.show?"block":"none"};
  width: 318px;
  font-size: 1.167rem;
  padding:2rem;
  padding-top:0;
  background-color:white;

  .inputbox{
      margin-top:10px;
  }

  .submit{
      margin-top:30px;
      width:100%
  }

  .title{
      margin-bottom:30px;
  }

  .register{
      font-size:0.6rem;
  }

  .toolbar{
      display:flex;
      align-items:center;
  }
`

export const RegisterBoxWrapper = styled.div`
  display:${(props)=>props.show?"block":"none"};

  width: 318px;
  font-size: 1.167rem;
  padding:2rem;
  background-color:white;
  padding-top:0;

  .title{
      margin-bottom:30px;
  }

  .inputbox{
      margin-top:10px;
  }

  .submit{
      margin-top:30px;
      width:100%
  }

  .toolbar{
      display:flex;
      align-items:center;
  }

  .login{
      font-size:0.6rem;
  }
`
