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
import EstimateList from './estimate/EstimateList';
import Estimate from './estimate/Estimate';
import routes from '../utils/Routes';


function NotFound() {
  return <h3>NotFound</h3>;
}
function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={routes.signupTermUser} element={<SignupTermUser />} />
        <Route path={routes.signupTermDriver} element={<SignupTermDriver />} />
        <Route path={routes.signupTermCompany} element={<SignupTermCompany />} />

        <Route path={routes.signupUser} element={<SignupUser />} />
        <Route path={routes.signupDriver} element={<SignupDriver />} />
        <Route path={routes.signupCompany} element={<SignupCompany />} />
        
        <Route path={routes.signupDoneUser} element={<SignupDone />} />
        <Route path={routes.signupDoneDriver} element={<SignupDone />} />
        <Route path={routes.signupDoneCompany} element={<SignupDone />} />
        
        <Route path={routes.loginUser} element={<LoginUser /> } />
        <Route path={routes.loginDriver} element={<LoginDriver /> } />
        <Route path={routes.loginCompany} element={<LoginCompany />} />
        
        <Route path={routes.recoveryId} element={<RecoveryId />} />
        {/* <Route path={routes.}res" element={<RecoveryId />} /> */}
        <Route path={routes.recoveryPw} element={<RecoveryPw />} />
        {/* <Route path={routes.}res" element={<RecoveryId />} /> */}

        <Route path={routes.estimateList} element={<EstimateList /> } />
        <Route path={routes.estimateCreate()} element={<Estimate /> } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  )
}

export default Root;