import * as t from "../types";
import { GraphQLClient, gql } from "graphql-request";
import { BACKEND_URL } from "../../utils/constants";
import Cookies from "js-cookie";

const me_query = gql`
  query me {
    me {
      username
      firstName
      lastName
    }
  }
`;

export const setToken = (value) => {
  console.log("I am here");
  return (dispatch) => {
    const client = new GraphQLClient(BACKEND_URL, {
      headers: {
        authorization: `JWT ${Cookies.get("TOKEN")}`,
      },
    });
    client.request(me_query).then((data) => {
      console.log(data);
      dispatch({
        type: t.SET_TOKEN,
        payload: {
          value: value,
          username: data?.me?.username,
          name: data?.me?.firstName + " " + data?.me?.lastName,
        },
      });
    });
  };
};

export const Logout = () => {
  console.log("I am logging out");
  Cookies.remove("TOKEN");
  return (dispatch) => {
    dispatch({
      type: t.LOGOUT,
      payload: { value: false, username: null, name: null },
    });
  };
};
