import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./views/Login";
import Register from "./views/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Groups from "./views/Groups";
import Dashboard from "./views/Dashboard";
import GroupDetails from "./views/GroupDetails";
import "./assets/css/custom.css";
import "react-datepicker/dist/react-datepicker.css";
import PrivateRoute from "./utils/PrivateRoute";

toast.configure();

const App = () => {
  return (
    <React.StrictMode>
      <Suspense fallback="loading">
        <BrowserRouter>
          <Switch>
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <PrivateRoute exact path="/groups" component={Groups} />

            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            />

            <PrivateRoute
              exact
              path="/groups/:group_id"
              component={GroupDetails}
            />

            <Redirect exact from="/" to="/login" />
            <Redirect from="*" to="/groups" />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </React.StrictMode>
  );
};

export default App;
