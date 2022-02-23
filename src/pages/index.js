import React from 'react';
import AppLayout from '../components/AppLayout';
import { Route, Routes  } from "react-router-dom";
import Home from './Home';
//import Account from './account/index'
import Signup from './account/Signup';
import SignupUser from './account/SignupUser';
import SignupDriver from './account/SignupDriver';
import SignupCompany from './account/SignupCompany';
import { Login, LoginUser, LoginDriver, LoginCompany } from './account/Login';


function NotFound() {
  return <h3>NotFound</h3>;
}
function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route />
        <Route path="" element={<Home />} />
        <Route path="signup" element={<Signup />}>
          <Route path="driver" element={<SignupDriver />} />
          <Route path="company" element={<SignupCompany />} />
        </Route>
        <Route path="login" element={<Login />}>
          <Route path="driver" element={<LoginDriver /> } />
          <Route path="company" element={<LoginCompany />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  )
}

export default Root;