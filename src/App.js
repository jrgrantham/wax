import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { projectReducer, stylingReducer, settingsReducer } from "./state/reducers";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Route } from "react-router-dom";
import thunk from "redux-thunk";

import RiskTableProject from "./riskManagement/ProjectTable";
import RiskText from "./riskManagement/ProjectDocument";
import ClientSettings from "./clientSettings/ClientSettings";
import Login from './views/Login'
import Footer from "./Footer";

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
        <Route path='/project-settings' component={ClientSettings} />
        <Route path='/risk-table' component={RiskTableProject} />
        <Route path='/risk-document' component={RiskText} />
        <Route exact path='/' component={Login} />
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
