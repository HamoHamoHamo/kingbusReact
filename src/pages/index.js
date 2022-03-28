import React from 'react';
import AppLayout from '../components/AppLayout';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
//import Account from './account/index'
import { SignupUser, SignupDriver, SignupCompany } from './account/Signup';
import { SignupTermUser, SignupTermDriver, SignupTermCompany } from './account/SignupTerm';
import { SignupDone } from './account/SignupDone';
import { LoginUser, LoginDriver, LoginCompany } from './account/Login';
import routes from '../utils/Routes';
import RecoveryId from './account/RecoveryId';
import RecoveryPw from './account/RecoveryPw';
import EstimateList from './estimate/EstimateList';
import EstimateCreate from './estimate/EstimateCreate';
import EstimateWaiting from './estimate/EstimateWaiting';


function NotFound() {
  return <h3>NotFound</h3>;
}
function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route path={routes.home} element={<Home />} />
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
        <Route path={routes.estimateCreate()} element={<EstimateCreate /> } />
        <Route path={routes.estimateWaiting} element={<EstimateWaiting status={1} /> } />

        <Route path={routes.estimateSelected} element={<EstimateWaiting status={2}/> } />
        <Route path={routes.estimateCheckout} element={<EstimateWaiting /> } />
        <Route path={routes.estimateDone} element={<EstimateWaiting /> } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  )
}

export default Root;