import React from "react";
import { AuthTemplate, CommonButton, Main, Title } from "../../components";
import { Image1 } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessVerif = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const status_message = location.state ? location.state : null;

  return (
    <>
      <Title text={"Tandur | Verifikasi Berhasil"} />
      <Main>
        <AuthTemplate image={Image1}>
          <div className="w-full flex justify-center items-center mx-auto lg:max-w-7xl flex-grow bg-white">
            <div className="flex flex-col self-center w-9/12">
              <span className="font-poppinsSemibold text-3xl">{status_message}</span>
              <span className="font-poppinsMedium text-2xl mt-2">
                Akun anda telah berhasil diverifikasi{status_message !== "Berhasil Verifikasi!" ? " sebelumnya." : "."}
              </span>
              <CommonButton
                type="button"
                title="Masuk"
                disabled={true}
                onClick={() => {
                  navigate("/masuk");
                }}
              />
            </div>
          </div>
        </AuthTemplate>
      </Main>
    </>
  );
};

export default SuccessVerif;
