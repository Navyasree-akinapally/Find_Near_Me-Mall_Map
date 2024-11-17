import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../components/auth/auth-layout';
import Login from '../components/auth/login';
import SignUp from '../components/auth/sign-up';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path='/:login' element={<Login />} />

                <Route path='/registration/:reg' element={<SignUp />} />
            </Route>
        </Routes>
    );
}

export default AuthRoutes;
