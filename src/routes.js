import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './views/Login';
import Register from './views/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import Groups from './views/Groups';
import Dashboard from './views/Dashboard';
import GroupDetails from './views/GroupDetails';
import './assets/css/custom.css';
import 'react-datepicker/dist/react-datepicker.css';
import PrivateRoute from './utils/PrivateRoute';
import Migration from './views/Migration';
import Logs from './views/Logs';
import GroupBalance from './views/GroupBalance';
import Notfound from './views/Notfound';
import LoanRequests from './views/LoanRequests';

toast.configure();

const Routes = () => (
  <React.StrictMode>
    <Suspense fallback="loading">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/groups" component={Groups} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/groups/:group_id" component={GroupDetails} />
          <PrivateRoute exact path="/migration" component={Migration} />
          <PrivateRoute exact path="/support/logs" component={Logs} />
          <PrivateRoute exact path="/support/balances" component={GroupBalance} />
          <PrivateRoute exact path="/support/balances/:group_id" component={GroupBalance} />
          <PrivateRoute exact path="/support/loan-requests" component={LoanRequests} />
          <PrivateRoute exact path="/support/loan-requests/:group_id" component={LoanRequests} />
          <PrivateRoute exact path="*" component={Notfound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

export default Routes;
