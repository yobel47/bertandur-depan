import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Reaptcha from "reaptcha";
import { loginUser } from "../../../redux/actions";
import { resetError, resetSuccess } from "../../../redux/slice/authSlice";
import { CAPTCHA_SITE_KEY } from "../../../utils/constant";
import { loginValidationSchema } from "../../../utils/validation/validationSchema";
import { AlertModal, CommonButton, InputPassword, InputText, LoadingModal } from "../../atoms";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, success, error, userInfo } = useSelector((state) => state.auth);
  const [verified, setVerified] = useState(false);

  React.useEffect(() => {
    dispatch(resetSuccess());
  }, []);

  React.useEffect(() => {
    if (success == "login") {
      dispatch(resetSuccess());

      if (userInfo?.IS_ADMIN == 1) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [success]);
  return (
    <>
      <div className="w-full flex justify-center mx-auto lg:max-w-7xl flex-grow bg-white">
        <div className="flex flex-col self-center w-9/12">
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              dispatch(loginUser(values));
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid }) => (
              <form onSubmit={handleSubmit}>
                <div className="mt-20">
                  <span className="font-poppinsSemibold text-3xl">Masuk</span>
                  <InputText
                    placeholder={"Email"}
                    type={"email"}
                    name="email"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    error={errors.email && touched.email && errors.email}
                    message={errors.email}
                  />
                  <InputPassword
                    placeholder={"Password"}
                    name="password"
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    error={errors.password && touched.password && errors.password}
                    message={errors.password}
                  />
                  <div className="mt-6">
                    <Reaptcha sitekey={CAPTCHA_SITE_KEY} onVerify={() => setVerified(true)} />
                  </div>
                  <CommonButton type="submit" title="Masuk" disabled={isValid && !errors.email && !errors.password && touched && verified} />
                </div>
              </form>
            )}
          </Formik>
          <div className="flex flex-col justify-center border-t-2 pt-4 border-t-black mb-8 w-3/4 self-center">
            <span className="font-poppinsMedium text-center w-100 ">Belum punya akun?</span>

            <span className="font-poppinsBold text-center w-100">
              <Link to={"../daftar"}>Daftar</Link>
            </span>
          </div>
        </div>
      </div>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
      <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
    </>
  );
};

export default FormLogin;
