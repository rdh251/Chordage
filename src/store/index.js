import { createStore } from "redux";
import theReducer from "../reducers/index";

const store = createStore(theReducer);
export default store;