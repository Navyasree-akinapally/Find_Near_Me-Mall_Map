import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../components/auth/auth-layout';
import Login from '../components/auth/login';
import SignUp from '../components/auth/sign-up';
import ForgotPassword from '../components/auth/forgot-password';
import ResetPassword from '../components/auth/reset-password';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path='/registration/:reg' element={<SignUp />} />
                <Route path='/:login' element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />
            </Route>
        </Routes>
    );
}

export default AuthRoutes;
