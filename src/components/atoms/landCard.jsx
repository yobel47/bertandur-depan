import React, { useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import { useNavigate } from "react-router-dom/dist";
import { useDispatch, useSelector } from "react-redux";
import { addLand, removeLand } from "../../redux/slice/favoriteSlice";

function LandCard(props) {
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
      className={`${props.customStyle} bg-white w-[250px] rounded-lg overflow-hidden border`}
      style={{ cursor: "pointer" }}
    >
      {/* <div className="h-[45%] bg-blue-500 rounded-none w-full overflow-hidden"> */}
      <img src={props.data.URLGALLERY_LAND[0]} alt="" className="object-fill h-[180px] bg-blue-500 rounded-none w-full overflow-hidden"></img>
      {/* </div> */}
      <div className="h-[15px] bg-white rounded-t-lg w-full -mt-1 relative "></div>
      <div className="bg-white px-4 pb-4 font-poppins space-y-1 relative ">
        {isLoggedIn && (
          <div className="absolute right-0 mr-4 -mt-1">
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
        <div className="flex !mt-2">
          <AiFillStar size={24} color={"#F8E064"} />
          <div className="text-[#BDBDBD] ml-1 mb-2 align-top">{props.data.RATING_LAND} / 5</div>
        </div>
        <div className="flex flex-row pb-2">
          <IoLocationSharp size={24} className="text-tandur" />
          <div className="text-[#828282] font-poppins  ml-1">{props.data.NAME_DISTRICT}</div>
        </div>
      </div>
    </div>
  );
}

export default LandCard;
