import React from 'react';
import AppLayout from '../components/AppLayout';
import { Route, Routes  } from "react-router-dom";
import Home from './Home';
//import Account from './account/index'
import { SignupUser, SignupDriver, SignupCompany } from './account/Signup';
import { SignupTermUser, SignupTermDriver, SignupTermCompany } from './account/SignupTerm';
import { SignupDone } from './account/SignupDone';
import { LoginUser, LoginDriver, LoginCompany } from './account/Login';
import RecoveryId from './account/RecoveryId';
import RecoveryPw from './account/RecoveryPw';


function NotFound() {
  return <h3>NotFound</h3>;
}
function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="signupterm/user" element={<SignupTermUser />} />
        <Route path="signupterm/driver" element={<SignupTermDriver />} />
        <Route path="signupterm/company" element={<SignupTermCompany />} />

        <Route path="signup/user" element={<SignupUser />} />
        <Route path="signup/driver" element={<SignupDriver />} />
        <Route path="signup/company" element={<SignupCompany />} />
        
        <Route path="signupdone/user" element={<SignupDone />} />
        <Route path="signupdone/driver" element={<SignupDone />} />
        <Route path="signupdone/company" element={<SignupDone />} />

        
        <Route path="login/user" element={<LoginUser /> } />
        <Route path="login/driver" element={<LoginDriver /> } />
        <Route path="login/company" element={<LoginCompany />} />
        
        <Route path="recovery/id" element={<RecoveryId />} />
        {/* <Route path="recovery/id/res" element={<RecoveryId />} /> */}
        <Route path="recovery/password" element={<RecoveryPw />} />
        {/* <Route path="recovery/password/res" element={<RecoveryId />} /> */}

        
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  )
}

export default Root;