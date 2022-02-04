import React from 'react';
import { Route, Routes  } from "react-router-dom";
import UserRegister from './RegisterUser';

function Register() {
    return (
        <Routes>
            <Route path="/register/user" element={<UserRegister />} />
            
        </Routes>
    )
  }
  
  export default Register;