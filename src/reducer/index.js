import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/slice"
const rootReducer = combineReducers({
        auth:authReducer
})


export default rootReducer;