import React from "react";
import { Image1 } from "../../assets";
import { AuthTemplate, Main, FormRegister, Title } from "../../components";

const Register = () => {
  return (
    <>
      <Title text={"Tandur | Daftar"} />
      <Main>
        <AuthTemplate image={Image1}>
          <FormRegister />
        </AuthTemplate>
      </Main>
    </>
  );
};

export default Register;
