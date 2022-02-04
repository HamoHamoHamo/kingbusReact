import React from 'react';
import AppLayout from '../components/AppLayout';
import { Route, Routes  } from "react-router-dom";
import Home from './Home';
import Accounts from './accounts/index'

function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route />
        최상위 컴포넌트
        <Route path="/" element={<Home />} />
        <Route path="/accounts/*" element={<Accounts />} />
      </Routes>
    </AppLayout>
  )
}

export default Root;