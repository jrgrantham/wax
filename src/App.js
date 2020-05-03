import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { projectReducer, stylingReducer, settingsReducer } from "./state/reducers";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Route } from "react-router-dom";
import thunk from "redux-thunk";

import RiskTableProject from "./riskManagement/RiskTableProject";
import RiskText from "./riskManagement/TextRisksDocument";
import ClientSettings from "./clientSettings/ClientSettings";
import RiskTableTemplate from "./riskManagement/RiskTableTemplate";

const monsterReducer = combineReducers({
  adminSettings: settingsReducer,
  projectRisks: projectReducer,
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
        <Route exact path='/' component={ClientSettings} />
        <Route path='/risk-table' component={RiskTableProject} />
        <Route path='/risk-document' component={RiskText} />
        <Route path='/risk-templates' component={RiskTableTemplate} />
      </div>
    </Provider>
  );
}

export default App;
