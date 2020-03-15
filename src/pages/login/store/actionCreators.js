import axios from "axios";
import * as constants from "./constants";

const changeLogin = () => ({
  type: constants.CHANGE_LOGIN,
  value: true
});


export const logout = () => ({
  type: constants.LOGOUT,
  value: false
});

export const showPopupActoin = (data) =>({
  type:constants.SHOW_POPUP,
  data: data
})

export const changePageAction = (data) => ({
  type:constants.CHANGE_POPUP_PAGE,
  data:data
})



export const login = (accout, password) => {
  return dispatch => {
    axios
      .get("/api/login.json?account=" + accout + "&password=" + password)
      .then(res => {
        const result = res.data.data;
        if (result) {
          dispatch(changeLogin());
        } else {
          alert("登陆失败");
        }
      });
  };
};

export const showPopup=(isLoginPage) =>{
  return dispatch => {
    let data={}
    data.showPopup=true
    data.isLoginPage=isLoginPage

    dispatch(showPopupActoin(data))
  }
}

export const closePopup=()=>{
  return dispatch => {
    let data={}
    data.showPopup=false
    
    dispatch(showPopupActoin(data))
  }
}

export const changePage=(isLoginPage)=>{
  return dispatch=>{
    let data={}
    data.isLoginPage=isLoginPage
    dispatch(changePageAction(data))
  }
}