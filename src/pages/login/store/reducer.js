import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  login: false,
  showPopup: true,
  isLoginPage: true,
});

const showPopup=(state,action)=>{
  if (!action.data.showPopup){
    return state.set("showPopup",false)
  }

  return state.merge({
    showPopup:action.data.showPopup,
    isLoginPage:action.data.isLoginPage
  })
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_LOGIN:
      return state.set("login", action.value);
    case constants.LOGOUT:
      return state.set("login", action.value);
    case constants.SHOW_POPUP:
      return showPopup(state,action)
    case constants.CHANGE_POPUP_PAGE:
      return state.set("isLoginPage",action.data.isLoginPage)
    default:
      return state;
  }
};
