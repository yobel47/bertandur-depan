import React from "react";
import { Image1 } from "../../assets";
import { AuthTemplate, Main, FormVerification, Title } from "../../components";

const Verification = () => {
  return (
    <>
      <Title text={"Tandur | Verifikasi"} />
      <Main>
        <AuthTemplate image={Image1}>
          <FormVerification />
        </AuthTemplate>
      </Main>
    </>
  );
};

export default Verification;
