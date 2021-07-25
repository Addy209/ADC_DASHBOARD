import * as t from "../types";

const initialState={
  loggedIn:false,
  username:null,
  name:null
}

const main = (state=initialState, action) => {
  console.log("I am here in reducer");
  switch(action.type){
    case t.SET_TOKEN:{
      return { 
        ...state,
        loggedIn: action.payload.value,
        username:action.payload.username,
        name:action.payload.name
      };
    break
    }
    

    case t.LOGOUT:{
      return { 
        ...state,
        loggedIn: action.payload.value,
        username:action.payload.username,
        name:action.payload.name
      };
    break
    }
    default:
      return {...state};
    }
}

export default main;