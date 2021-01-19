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
// import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import {
  Route,
  withRouter,
  BrowserRouter,
  Switch,
  Redirect,
} from "react-router-dom";
import thunk from "redux-thunk";

import RiskTable from "./views/RiskTable";
import RiskText from "./views/Document";
import Settings from "./views/Settings";
import Login from "./views/Login";
import Footer from "./Footer";
import AdminDashboard from "./views/AdminDashboard";
import Print from "./views/Print";
import Password from "./views/Password";

const monsterReducer = combineReducers({
  templates: templateReducer,
  risks: riskReducer,
  clients: clientReducer,
  user: userReducer,
});

const middleware = [thunk];

const store = createStore(
  monsterReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


function protectedRoute(Component, props) {
  // Not really secure. Any token would pass the test.
  if (localStorage.getItem("token")) {
    return <Component {...props} />;
  }
  return <Redirect to="/login" />;
}

function App() {
  return (
    <Provider store={store}>
      {/* <div className="App"> */}
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route path="/project-settings" component={Settings} /> */}
          <Route
            path="/project-settings"
            render={(props) => protectedRoute(Settings, props)}
          />
          {/* <Route exact path="/" component={RiskTable} /> */}
          <Route
            exact
            path="/"
            render={(props) => protectedRoute(RiskTable, props)}
          />
          {/* <Route path="/risk-document" component={RiskText} /> */}
          <Route
            path="/risk-document"
            render={(props) => protectedRoute(RiskText, props)}
          />
          {/* <Route path="/admin" component={AdminDashboard} /> */}
          <Route
            path="/admin"
            render={(props) => protectedRoute(AdminDashboard, props)}
          />
          {/* <Route path="/print" component={Print} /> */}
          <Route
            path="/print"
            render={(props) => protectedRoute(Print, props)}
          />
          {/* <Route path="/print" component={Print} /> */}
          <Route
            path="/password"
            render={(props) => protectedRoute(Password, props)}
          />
          {/* <Route component={RiskTable} /> */}
          <Route
            render={(props) => protectedRoute(RiskTable, props)}
          />
        </Switch>
        <Footer />
      </BrowserRouter>
      {/* </div> */}
    </Provider>
  );
}

export default withRouter(App);
