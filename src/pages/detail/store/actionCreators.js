import axios from "axios";
import * as constants from "./constants";

const changeDetail = (title, content) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content
});

export const getDetail = id => {
  return dispatch => {
    axios
      .get("/api/hascode.md")
      .then(res => {
        const result = res.data;
        console.log(result)
        dispatch(changeDetail("SAMPLE", result));
      })
      .catch(() => {});
  };
};
