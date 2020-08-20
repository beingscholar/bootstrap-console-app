import axios from "axios";

export const fetchUsersList = () => {
  return function (dispatch) {
    return axios.get("./data.json").then(({ data }) => {
      dispatch(getUsersList(data));
    });
  };
};

function getUsersList(data) {
  return {
    type: "GET_USERS_LIST",
    payload: data
  };
}
