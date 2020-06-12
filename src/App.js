import React, { useEffect } from "react";
import "./App.css";

import { Provider } from "react-redux";
import {
  userReducer,
  clientReducer,
  templateReducer,
  riskReducer,
} from "./state/reducers";
import { combineReducers, createStore, compose } from "redux";
// import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import {
  Route,
  withRouter,
  BrowserRouter,
  Switch,
  Redirect,
} from "react-router-dom";
// import thunk from "redux-thunk";

import RiskTable from "./views/RiskTable";
import RiskText from "./views/Document";
import Settings from "./views/Settings";
import Login from "./views/Login";
import Footer from "./Footer";
import AdminDashboard from "./views/AdminDashboard";
// import PrintTable from "./views/PrintTable";
import Print from "./views/Print";
import { render } from "@testing-library/react";

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

function App(props) {

//   function redirect() {
//     console.log("this is app");
//     render() {
//       <Redirect to={{ pathname: "/" }} />;
//     }
//   }

  useEffect(() => {
    // redirect()
    return () => {};
  }, []);

  return (
    <Provider store={store}>
      {/* <div className="App"> */}
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/project-settings" component={Settings} />
          <Route exact path="/" component={RiskTable} />
          <Route path="/risk-document" component={RiskText} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/print" component={Print} />
          <Route component={RiskTable} />
        </Switch>
      </BrowserRouter>
      {/* </div> */}
      <Footer />
    </Provider>
  );
}

export default withRouter(App);
