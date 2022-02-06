// import {createStore, applyMiddleware} from 'redux';
// import thunk from "redux-thunk"
// import reducers from '../reducers/index';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import {persistStore} from "redux-persist";

// export const store = createStore(reducers, composeWithDevTools(
//   applyMiddleware(thunk),
// ));

// export const persistor = persistStore(store);





// import { createStore } from "redux";
// import allReducers from '../reducers/index';
// import { devToolsEnhancer } from 'redux-devtools-extension';

// const store = createStore(allReducers, devToolsEnhancer());

// export default store;

import { createStore } from 'redux';
import allReducers from '../reducers/index';
import { devToolsEnhancer } from 'redux-devtools-extension';

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

// const rootReducer = combineReducers({
//   list: allReducers
// });

const persistedStore = loadFromLocalStorage();

const store = createStore(allReducers, persistedStore, devToolsEnhancer());

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
