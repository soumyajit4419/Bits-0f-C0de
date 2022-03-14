import { createStore } from "redux";
import { userReducer } from "../Store/user";

export const store = createStore(userReducer);
