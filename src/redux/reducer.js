import { combineReducers } from "redux";
import {userInfoReducer} from "./UserInfo/reducer"
export const app = combineReducers({
    userInfoReducer
})
