import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { riskReducer, stylingReducer } from "./state/reducers";
import { combineReducers, createStore, compose } from "redux";
import { Route } from "react-router-dom";
// import thunk from "redux-thunk";

import RiskTable from "./riskManagement/RiskTable";
import RiskText from "./riskManagement/TextRisks";
import ClientSettings from "./clientSettings/ClientSettings";

const monsterReducer = combineReducers({
  projectRisks: riskReducer,
  projectStyling: stylingReducer,
});

const store = createStore(
  monsterReducer,
  compose(
    // applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Route exact path='/' component={RiskTable} />
        <Route path='/risk-document' component={RiskText} />
        <Route path='/settings' component={ClientSettings} />
      </div>
    </Provider>
  );
}

export default App;
