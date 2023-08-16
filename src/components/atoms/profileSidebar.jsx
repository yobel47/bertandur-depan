import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiSeedlingLine, RiSeedlingFill } from "react-icons/ri";
import { BsBox, BsBoxFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";

function ProfileSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [active, setActive] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setActive(pathname.slice(1));
  }, [pathname]);

  const menuItem = [
    { pathname: "profile", text: "Profil Saya" },
    { pathname: "transaction", text: "Transaksi" },
    { pathname: "favorite", text: "Favorit" },
    { pathname: "my-land", text: "Manajemen Lahan" },
    { pathname: "my-product", text: "Katalog Barang Anda" },
    { pathname: "keluar", text: "Keluar" },
  ];

  const menuIcon = (text) => {
    if (text == "Profil Saya") {
      return <FaUser size={16} className={` ${active == "profile" && "text-tandur"}`} />;
    } else if (text == "Transaksi") {
      return (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className={` ${active == "transaction" && "text-tandur"}`}
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" stroke="currentColor" strokeWidth="2" d="M2,7 L20,7 M16,2 L21,7 L16,12 M22,17 L4,17 M8,12 L3,17 L8,22"></path>
        </svg>
      );
    } else if (text == "Favorit") {
      if (active == "favorite") {
        return <AiFillHeart size={16} className={` ${active == "favorite" && "text-tandur"}`} />;
      } else {
        return <AiOutlineHeart size={16} className={` ${active == "favorite" && "text-tandur"}`} />;
      }
    } else if (text == "Manajemen Lahan") {
      if (active == "my-land") {
        return <RiSeedlingFill size={16} className={` ${active == "my-land" && "text-tandur"}`} />;
      } else {
        return <RiSeedlingLine size={16} className={` ${active == "my-land" && "text-tandur"}`} />;
      }
    } else if (text == "Katalog Barang Anda") {
      if (active == "my-product") {
        return <BsBoxFill size={16} className={` ${active == "my-product" && "text-tandur"}`} />;
      } else {
        return <BsBox size={16} className={` ${active == "my-product" && "text-tandur"}`} />;
      }
    } else if (text == "Keluar") {
      return <FiLogOut size={16} className="hover:text-red-500" />;
    }
  };

  const keluar = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className="border rounded-tr-lg rounded-br-lg shadow-md overflow-hidden">
        {menuItem.map((e, i) => (
          <div
            key={i}
            onClick={() => (e.pathname == "keluar" ? keluar() : navigate("/" + e.pathname))}
            className={`p-4 pl-5 flex gap-2 text-black font-poppinsMedium items-center cursor-pointer ${
              e.pathname == active ? "bg-[#E5F2D2] border-l-[6px]  border-l-tandur" : "mx-[6px] border-b"
            }`}
          >
            {menuIcon(e.text)}
            {e.text}
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfileSidebar;
