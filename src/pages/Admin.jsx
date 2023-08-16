/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CollapseDrawerProvider } from "../admin/contexts/CollapseDrawerContext";
import Router from "../admin/routes/routes";
import ThemeProvider from "../admin/theme";
import { logout } from "../redux/slice/authSlice";
import { resetError as resetErrorLand } from "../redux/slice/landSlice";
import { resetError as resetErrorProduct } from "../redux/slice/productSlice";
import { resetError as resetErrorTutorial } from "../redux/slice/tutorialSlice";
import { resetError as resetErrorUser } from "../redux/slice/usersSlice";
import { resetError as resetErrorAuth } from "../redux/slice/authSlice";

function Layout() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const errorLand = useSelector((state) => state.land.error);
  const errorProduct = useSelector((state) => state.product.error);
  const errorTutorial = useSelector((state) => state.tutorial.error);
  const errorUser = useSelector((state) => state.users.error);
  const errorAuth = useSelector((state) => state.auth.error);
  // const { errorProduct } = useSelector((state) => state.products);

  useEffect(() => {
    if (
      errorLand?.status_message == "Autentikasi anda gagal, harap login kembali!" ||
      errorProduct?.status_message == "Autentikasi anda gagal, harap login kembali!" ||
      errorTutorial?.status_message == "Autentikasi anda gagal, harap login kembali!" ||
      errorUser?.status_message == "Autentikasi anda gagal, harap login kembali!" ||
      errorAuth?.status_message == "Autentikasi anda gagal, harap login kembali!"
    ) {
      dispatch(logout());
      dispatch(resetErrorLand());
      dispatch(resetErrorProduct());
      dispatch(resetErrorTutorial());
      dispatch(resetErrorUser());
      dispatch(resetErrorAuth());
    }
  }, [errorLand, errorProduct, errorTutorial, errorUser, errorAuth]);

  if (!isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <ThemeProvider>
        <CollapseDrawerProvider>
          <Router />
        </CollapseDrawerProvider>
      </ThemeProvider>
    );
  }
}

export default Layout;
