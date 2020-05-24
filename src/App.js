import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import {
  userReducer,
  clientReducer,
  templateReducer,
  riskReducer,
} from "./state/reducers";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Route, withRouter } from "react-router-dom";
import thunk from "redux-thunk";

import RiskTable from "./views/ProjectTable";
import RiskText from "./views/ProjectDocument";
import Settings from "./views/Settings";
import Login from "./views/Login";
import Footer from "./Footer";
// import Templates from "./views/Templates";
// import Clients from "./views/Clients";
import AdminDashboard from "./views/AdminDashboard";
import ExportCSV from "./views/ExportCsv";

const monsterReducer = combineReducers({
  templates: templateReducer,
  risks: riskReducer,
  clients: clientReducer,
  user: userReducer,
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
        <Route path="/project-settings" component={Settings} />
        <Route exact path="/" component={RiskTable} />
        <Route path="/risk-document" component={RiskText} />
        <Route path="/login" component={Login} />
        {/* <Route path="/templates" component={Templates} /> */}
        {/* <Route path="/clients" component={Clients} /> */}
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/exportcsv" component={ExportCSV} />
      </div>
      <Footer />
    </Provider>
  );
}

export default withRouter (App);
