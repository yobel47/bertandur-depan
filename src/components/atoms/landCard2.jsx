import React, { useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import { useNavigate } from "react-router-dom/dist";
import { useDispatch, useSelector } from "react-redux";
import { addLand, removeLand } from "../../redux/slice/favoriteSlice";
import CommonButton from "./commonButton";

function LandCard2(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { lands } = useSelector((state) => state.favorite);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(lands.some((obj) => obj.ID_LAND == props.data?.ID_LAND));

  const onLiked = (e) => {
    e.stopPropagation();
    const landLike = lands.some((obj) => obj.ID_LAND == props.data?.ID_LAND);

    if (!landLike) {
      dispatch(addLand(props.data));
    } else {
      dispatch(removeLand(props.data.ID_LAND));
    }
    setLiked(!liked);
  };

  return (
    <div
      onClick={() => {
        navigate("/land/" + props.data?.ID_LAND.slice(5));
      }}
      className={`${props.customStyle} bg-white rounded-lg overflow-hidden border flex flex-col lg:flex-row p-4`}
      style={{ cursor: "pointer" }}
    >
      <img src={props.data.URLGALLERY_LAND[0]} alt="" className="rounded-lg w-[200px] h-[200px] object-cover self-center"></img>
      <div className="bg-white px-4 font-poppins space-y-1 relative w-full mt-4">
        <div className="text-tandur font-semibold w-[88%]">
          {props.customStyle
            ? props.data?.NAME_LAND.length > 17
              ? props.data?.NAME_LAND.slice(0, 17) + "..."
              : props.data?.NAME_LAND.length > 20
              ? props.data?.NAME_LAND.slice(0, 20) + "..."
              : props.data?.NAME_LAND
            : props.data?.NAME_LAND}
        </div>
        <div className="text-[#4A4A4A] font-poppinsBold">{currencyFormat(revertCurrency(props.data?.PRICE_LAND.toString() || ""), "Rp. ")} /Bln</div>
        <div className="text-[#828282] font-poppins leading-tight">
          Luas {props.data.WIDTH_LAND} x {props.data.LENGTH_LAND} meter
        </div>
        <div className="text-[#828282] font-poppins leading-tight">Fasilitas : {props.data.FACILITY_LAND.replace(/;/g, ", ")}</div>
        <div className="flex gap-x-4 items-center">
          <div className="flex !mt-2">
            <AiFillStar size={24} color={"#F8E064"} />
            <div className="text-[#BDBDBD] ml-1 mb-2 align-top">{props.data.RATING_LAND} / 5</div>
          </div>
          <div className="flex flex-row ">
            <IoLocationSharp size={24} className="text-tandur" />
            <div className="text-[#828282] font-poppins  ml-1">{props.data.NAME_DISTRICT}</div>
          </div>
        </div>
        <div className="flex gap-x-4">
          <CommonButton type="button" title="Sewa Sekarang" disabled={true} customStyle={"text-base !m-0"} />
          {isLoggedIn && (
            <div className="">
              {liked ? (
                <button onClick={onLiked}>
                  <AiFillHeart size={28} className="text-red-500" />
                </button>
              ) : (
                <button onClick={onLiked}>
                  <AiOutlineHeart size={28} className="" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandCard2;
