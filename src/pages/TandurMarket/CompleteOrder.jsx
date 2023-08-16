import React from "react";
import { AuthTemplate, CommonButton, Main, Title } from "../../components";
import { Image4 } from "../../assets";
import {  useNavigate } from "react-router-dom";

const CompleteOrder = () => {
  const navigate = useNavigate();
  return (
    <>
      <Title text={"Tandur | Pemesanan Berhasil"} />

      <Main>
        <AuthTemplate image={Image4}>
          <div className="flex flex-col justify-center self-center w-full min-h-screen bg-white">
            <div className="w-full md:w-[30vw] px-6 md:px-0 h-60 self-center ">
              <div className="font-poppinsSemibold text-3xl text-tandur text-center">Selamat Pembayaran Anda Telah Kami Konfirmasi</div>
              <CommonButton
                type="button"
                title="Kembali ke halaman awal"
                disabled={true}
                onClick={() => {
                  navigate("/");
                }}
                customStyles={"!mb-0 !font-poppinsSemibold"}
              />
            </div>
          </div>
        </AuthTemplate>
      </Main>
    </>
  );
};

export default CompleteOrder;
