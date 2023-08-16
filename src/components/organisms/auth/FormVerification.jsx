import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { otpResend, verifUser } from "../../../redux/actions";
import { resetError, resetStatus, resetSuccess } from "../../../redux/slice/authSlice";
import { AlertModal, CommonButton, InputOTP, LoadingModal, SuccessModal } from "../../atoms";

const FormVerification = () => {
  const location = useLocation();
  const email = location.state ? location.state.dataForm1.email : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!email) {
      navigate("/daftar");
    } else {
      dispatch(resetSuccess());
    }
  }, []);

  useEffect(() => {
    if (status?.status_code == 200) navigate("/daftar/verifikasiBerhasil", { state: status?.status_message });
  }, [navigate, status]);

  const ResendCode = () => (
    <>
      <span className="font-poppinsMedium text-center w-100 ">Tidak menerima kode OTP?</span>
      <button
        className="font-poppinsBold text-center w-fit"
        onClick={() => {
          dispatch(otpResend({ email }));
          setCounter("300");
          setCounterText("05:00");
          setShow(!show);
          if (show) {
            setShow(false);
          }
        }}
      >
        Kirim ulang
      </button>
    </>
  );

  const [counter, setCounter] = React.useState("0");
  const [counterText, setCounterText] = React.useState("");

  React.useEffect(() => {
    counter > 0 &&
      setTimeout(() => {
        const minutes = Math.floor((counter - 1) / 60);
        const minutess = minutes > 9 ? minutes : "0" + minutes;
        const seconds = (counter - 1) % 60;
        const secondss = seconds > 9 ? seconds : "0" + seconds;
        setCounterText(minutess + ":" + secondss);
        if (counter - 1 == 0) setShow(!show);
        setCounter(counter - 1);
      }, 1000);
  }, [counter, counterText]);

  return (
    <>
      <div className="w-full flex justify-center mx-auto lg:max-w-7xl flex-grow bg-white">
        <div className="flex flex-col self-center w-9/12 mt-20">
          <span className="font-poppinsSemibold text-3xl">Verifikasi</span>
          <div className="text-center mt-8">Mohon masukkan 6 digit kode OTP yang telah dikirimkan ke email anda</div>
          <Formik
            initialValues={{ otp: "" }}
            onSubmit={(values) => {
              const payload = {
                email: email,
                otp: values.otp,
              };
              dispatch(verifUser(payload));
            }}
            onChange={(values) => {
              // console.log(values);
            }}
          >
            {({ handleChange, handleSubmit, touched, values, errors, isValid }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex my-8 justify-center ">
                  <InputOTP value={values.otp} valueLength={6} onChange={handleChange("otp")} />
                </div>
                <CommonButton type="submit" title="Verifikasi" customStyle={"mt-5"} disabled={isValid && !errors.otp && touched} />
              </form>
            )}
          </Formik>
          <div className="flex flex-col justify-center border-t-2 pt-4 items-center  border-t-black mb-8 w-3/4 self-center">
            {show ? (
              <ResendCode />
            ) : (
              <>
                <span className="font-poppinsMedium text-center w-100 ">Tunggu jika mengirimkan OTP kembali.</span>
                <div className="font-poppinsBold text-center w-fit">{counterText}</div>
              </>
            )}
          </div>
        </div>
      </div>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
      <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
      <SuccessModal error={status.status_code} data={status} onClose={() => dispatch(resetStatus())} styles={"z-[1300]"} />
    </>
  );
};

export default FormVerification;
