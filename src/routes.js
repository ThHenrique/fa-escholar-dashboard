import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from './services/auth';

import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import Admins from "./pages/Admins"
import NewAdmin from "./pages/Admins/new"
import EditAdmin from "./pages/Admins/edit"

import Discipline from './pages/Discipline';
import ViewDiscipline from './pages/Discipline/view';
import NewDiscipline from "./pages/Discipline/new"
import Session from "./pages/Discipline/session"
import EditSession from "./pages/Discipline/editSession"



import Profile from './pages/Profile';
import ViewProfile from './pages/Profile/view';

import AdminNavbar from './components/AdminNavbar';
import Sidebar from './components/Sidebar';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={ props => (
      isAuthenticated() ? (
        <>
          <Sidebar sidenavOpen={false} toggleSidenav={false} {...props}/>
          <div
            className="main-content"
          >
            <AdminNavbar/>
            <Component { ...props } />

          </div>

        </>
      ) : (
       <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    )}
  />
)

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Dashboard} />

        <PrivateRoute exact path="/admins" component={Admins} />
        <PrivateRoute exact path="/admins/new" component={NewAdmin} />
        <PrivateRoute exact path="/admins/:id" component={EditAdmin} />

        <PrivateRoute exact path="/discipline" component={Discipline} />
        <PrivateRoute exact path="/discipline/new" component={NewDiscipline} />
        <PrivateRoute exact path="/discipline/:id" component={ViewDiscipline} />
        <PrivateRoute exact path="/discipline/session/:id/:sessionId" component={Session} />
        <PrivateRoute exact path="/discipline/editSession/:id" component={EditSession} />


        <PrivateRoute exact path="/profiles" component={Profile} />
        <PrivateRoute exact path="/profiles/:id" component={ViewProfile} />

        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
