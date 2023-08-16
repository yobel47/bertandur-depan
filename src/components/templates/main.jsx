import React from "react";
import Footer from "./footer";
import Header from "./header";

const Main = ({ children, header, footer, head = true }) => {
  return (
    <div className="w-full min-h-screen flex flex-col mx-auto items-center font-poppins">
      {head && <Header header={header} />}
      {children}
      {footer && <Footer />}
    </div>
  );
};

export default Main;
