import * as t from "../types";
import axios from "axios";

export const setToken = (value, username) => dispatch => {
  
  dispatch({
    type: t.SET_TOKEN,
    payload: {value:value, username:username}
  });
}