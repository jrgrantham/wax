import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { projectReducer, stylingReducer, templateReducer } from "./state/reducers";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Route } from "react-router-dom";
import thunk from "redux-thunk";

import RiskTable from "./views/ProjectTable";
import RiskText from "./views/ProjectDocument";
import Settings from "./views/Settings";
import Login from './views/Login'
import Footer from "./Footer";
import Templates from "./views/Templates";

const monsterReducer = combineReducers({
  templates: templateReducer,
  projectRisks: projectReducer,
  // projectStyling: stylingReducer,
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
        <Route path='/project-settings' component={Settings} />
        <Route path='/risk-table' component={RiskTable} />
        <Route path='/risk-document' component={RiskText} />
        <Route exact path='/login' component={Login} />
        <Route path='/templates' component={Templates} />
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
