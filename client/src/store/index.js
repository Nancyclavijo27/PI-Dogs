import {createStore, applyMiddleware  } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";//libreria automatica
import thunk from "redux-thunk";
import rootReducer from "../reducer";// se hace funcion en index reducer


export const store =createStore( rootReducer,  composeWithDevTools(applyMiddleware(thunk)) )