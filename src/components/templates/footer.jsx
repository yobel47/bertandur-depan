import React from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

function Footer(props) {
  return (
    <div className={`bg-[#5B861E] w-full h-96 ${props.footer && "invisible"}`}>
      <div className="bg-[#5B861E] flex flex-col h-96 px-12 md:px-44 bg-origin-border mt-12 font-poppins text-white bg-[size:75%] md:bg-[size:50%] bg-[url('assets/images/image1.svg')] bg-no-repeat lg:bg-contain bg-right-bottom">
        <div className="flex flex-col md:flex-row w-full h-5/6">
          <div className="w-1/3 ">
            <div className="font-poppinsSemibold text-2xl">TANDUR</div>
            <div className="mt-4">Tani Kolaborasi</div>
          </div>
          <div className="w-1/3 hidden md:block">
            <div className="font-poppinsSemibold text-xl align-text-top">Kontak</div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <BsTelephoneFill size={16} className="mr-2" />
                +6288805593445
              </div>
              <div className="flex items-center">
                <MdOutlineEmail size={20} className="mr-2" />
                tandur@urban.id
              </div>
              <div className="flex ">
                <IoLocationSharp size={20} className="mr-2 mt-1" />
                <div className="break-words">
                  Jl. Tidar No 100,
                  <br />
                  Kota Malang, Jawa Timur, <br />
                  Indonesia
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-muted text-xs ">Copyright © 2022 TANDUR. All Rights Reserved.</div>
      </div>
    </div>
  );
}

export default Footer;
