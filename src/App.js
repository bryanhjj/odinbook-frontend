import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
      <Routes>
          <Route path='/login' element={<Login user={user} setUser={setUser} />}/>
          <Route path='/account' element={<Account user={user} setUser={setUser}/>} />
          <Route path='/friends' element={<Friends user={user} />} />
          <Route path='/users/:userId' element={<Profile user={user} setUser={setUser} />} />
          <Route path="/" element={<Dashboard user={user} setUser={setUser}/> } />
      </Routes>
    </div>
  );
};

export default App;