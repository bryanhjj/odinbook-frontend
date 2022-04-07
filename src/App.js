import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Account from './components/Account/Account';
import Dashboard from "./components/Dashboard/Dashboard";
import Friends from './components/Friends/Friends';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import './App.css';
import useLocalStorage from './useLocalStorage';

require("dotenv").config();

function App() {
  const [user, setUser] = useLocalStorage("user", "");

  return (
    <div>
      <NavBar user={user} setUser={setUser}/>
      <Switch>
          <Route path='/login'>
            <Login user={user} setUser={setUser}/>
          </Route>
          <Route path='/account'>
            <Account user={user} setUser={setUser}/>
          </Route>
          <Route path='/friends'>
            <Friends user={user}/>
          </Route>
          <Route path='/users/:userId'>
            <Profile user={user} setUser={setUser}/>
          </Route>
          <Route exact path="/">
            <Dashboard user={user} setUser={setUser}/>
          </Route>
      </Switch>
    </div>
  );
};

export default App;