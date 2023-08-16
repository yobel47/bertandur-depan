import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifUser } from "../../redux/actions";

function Verify() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const email = searchParams.get("email");
  const otp = searchParams.get("otp");
  useEffect(() => {
    const payload = {
      email: email,
      otp: otp,
    };
    dispatch(verifUser(payload));
  }, []);

  useEffect(() => {
    if (status?.status_code == 200 && status?.status_message == "Berhasil Verifikasi!") {
      navigate("/daftar/verifikasiBerhasil", { state: status?.status_message });
    } else {
      const dataForm1 = { email: email };
      navigate("/daftar/verifikasi", { state: { dataForm1 } });
    }
  }, [navigate, status]);

  return <></>;
}

export default Verify;
