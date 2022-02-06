// import {combineReducers} from 'redux';
// import {persistReducer} from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import loginReducer from './loginReducer';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// const persistConfig = {
//     key: "root",
//     storage,
//     stateReconciler: autoMergeLevel2
// };

// const appReducers = combineReducers({
//     login: loginReducer
// });

// const reducer = (state,action) => {
//     //Upon logout, everything will be set to initial state
//     if(action.type === 'logout') {
//         return appReducers(undefined,action);
//     }
//     return appReducers(state,action);
// }

// const reducers = persistReducer(persistConfig, reducer);

// export default reducers



import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
//import {  routerReducer } from 'react-router-redux'

const allReducers = combineReducers({ login: loginReducer });

export default allReducers;

// // ,
// //     routing: routerReducer 