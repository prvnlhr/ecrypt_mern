import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Home from "./appLayoutComponents/Home"
import SignUpPage from './authComponent/SignUpPage';
import appStyles from "./app.module.css";
import SignInPage from './authComponent/SignInPage';
import ProtectedRoute from "./authComponent/ProtectedRoute"
import ActivateAccount from './authComponent/ActivateAccount';
import { getAuthToken } from "../redux/features/auth/authSlice"
import { fecthCardsData } from "../redux/features/cards/cardsSlice"
import UnAuthenticatedRoutes from './authComponent/UnAuthenticatedRoutes';
import { getUserDetails } from "../redux/features/user/userSlice"
import ForgotPassword from './authComponent/ForgotPassword';
import ResetPassword from './authComponent/ResetPassword';
import { toggleUiTheme } from "../redux/features/ui/uiSlice"

import RequireAuth from './authComponent/RequireAuth';
import SearchList from './searchSection/SearchList';
import LoginIdsList from './loginIdsComponent/LoginIdsList';

const App = () => {
  // const appHeight = () => {
  //   const doc = document.documentElement
  //   doc.style.setProperty(` — app-height`, `${window.innerHeight}px`)
  // }
  // window.addEventListener(`resize`, appHeight)
  // appHeight()

  // const useVisualViewport = () => {
  //   const [state, setState] = useState(getViewports)
  //   useEffect(() => {
  //     const handleResize = () => setState(getViewports)
  //     window.visualViewport.addEventListener('resize', handleResize)
  //     return () =>
  //       window.visualViewport.removeEventListener('resize', handleResize)
  //   }, [])
  //   return state
  // }

  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  const isDarkMode = useSelector((state) => state.ui.darkMode);

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));
    if (theme !== null) {
      dispatch(toggleUiTheme(theme));
    } else {
      dispatch(toggleUiTheme(false));
    }
  }, [isDarkMode]);

  const getToken = async () => {
    await dispatch(getAuthToken({}))
  };

  useEffect(() => {
    if (token != undefined) {
      dispatch(getUserDetails(token));
    }
  }, [token])

  useEffect(() => {
    getToken();
  }, [])

  return (
    <div data-theme={isDarkMode === true ? 'dark' : 'light'} className={appStyles.app} >
      <Routes>
        <Route exact
          path='/user/login'
          element={
            <UnAuthenticatedRoutes >
              <SignInPage />
            </UnAuthenticatedRoutes>
          } />


        <Route exact path='/user/forgotPassword' element={
          <UnAuthenticatedRoutes>
            <ForgotPassword />
          </UnAuthenticatedRoutes>
        } />

        <Route exact path='/user/resetPassword/:reset_token' element={
          <UnAuthenticatedRoutes>
            <ResetPassword />
          </UnAuthenticatedRoutes>
        } />

        <Route exact path='/user/register' element={
          <UnAuthenticatedRoutes>
            <SignUpPage />
          </UnAuthenticatedRoutes>
        } />

        <Route path='/user/auth/activate/:activation_token' element={<ActivateAccount />} />

        <Route
          path='/*'
          element={
            <RequireAuth >
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </div >
  )
}

export default App;