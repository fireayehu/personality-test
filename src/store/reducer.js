import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/reducer";
import questionReducer from "./question/reducer";
import resultReducer from "./result/reducer";

const reducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
  result: resultReducer,
});

export default reducer;
