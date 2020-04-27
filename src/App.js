import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { riskReducer } from "./state/reducers";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import RiskTable from "./riskTable/RiskTable";

const monsterReducer = combineReducers({
  projectRisks: riskReducer,
});

const store = createStore(
  monsterReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RiskTable />
      </div>
    </Provider>
  );
}

export default App;
