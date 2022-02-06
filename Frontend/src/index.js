// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import {Provider} from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';
// import {store,persistor} from './app/store/store';
// import './App.css';

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={<App />} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );



import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
// import storage from 'redux-persist/lib/storage';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import allReducers from './app/reducers/index';
// import './index.css';
// import App from './App';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from "redux-thunk"
// import { Router } from 'react-router'
// //import { syncHistoryWithStore } from 'react-router-redux'
// import { createBrowserHistory } from "history"
// const history = createBrowserHistory();

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, allReducers);


// const store = createStore(persistedReducer, composeWithDevTools(//window.__REDUX_DEVTOOLS_EXTENSION__());
//   applyMiddleware(thunk),
// ));
// //const history = syncHistoryWithStore(history, store)
// const persistor = persistStore(store);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <PersistGate loading={<App />} persistor={persistor}>
//      <Router history={history}>
//         <App />
//      </Router>
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );