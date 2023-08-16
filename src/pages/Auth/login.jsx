import React from "react";
import { AuthTemplate, FormLogin, Main, Title } from "../../components";
import { Image1 } from "../../assets";

const Login = () => {
  return (
    <>
      <Title text={"Tandur | Masuk"} />
      <Main>
        <AuthTemplate image={Image1}>
          <FormLogin />
        </AuthTemplate>
      </Main>
    </>
  );
};

export default Login;
