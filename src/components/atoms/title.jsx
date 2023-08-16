import React from "react";
import { Helmet } from "react-helmet-async";

function Title(props) {
  return (
    <Helmet>
      <title>{props.text}</title>
    </Helmet>
  );
}

export default Title;
