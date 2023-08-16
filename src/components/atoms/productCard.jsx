import React, { useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom/dist";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../redux/slice/favoriteSlice";

function ProductCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.favorite);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(products.some((obj) => obj.ID_PRODUCT == props.data?.ID_PRODUCT));

  const onLiked = (e) => {
    e.stopPropagation();
    const productLike = products.some((obj) => obj.ID_PRODUCT == props.data?.ID_PRODUCT);
    if (!productLike) {
      dispatch(addProduct(props.data));
    } else {
      dispatch(removeProduct(props.data.ID_PRODUCT));
    }
    setLiked(!liked);
  };

  return (
    <div
      onClick={() => {
        navigate("/market/" + props.data?.ID_PRODUCT);
      }}
      className={`${props.customStyle} bg-white w-[250px] justify-start rounded-lg overflow-hidden border hover:shadow-lg`}
      style={{ cursor: "pointer" }}
    >
      {/* <div className="h-[45%] bg-blue-500 rounded-none w-full overflow-hidden"> */}
      <img src={props.data?.PHOTO_PRODUCT[0]} alt="" className="object-fill h-[180px] bg-blue-500 rounded-none w-full overflow-hidden"></img>
      {/* </div> */}
      <div className="h-[3%] bg-white rounded-t-lg w-full -mt-1 relative "></div>
      <div className="px-4 pb-4 pt-4 -mt-2 rounded-t-lg bg-white font-poppins space-y-1 relative ">
        {isLoggedIn && (
          <div className="absolute right-0 mr-4 -mt-1">
            {liked ? (
              <button onClick={onLiked}>
                <AiFillHeart size={28} className="text-red-500 z-10" />
              </button>
            ) : (
              <button onClick={onLiked}>
                <AiOutlineHeart size={28} className="z-10" />
              </button>
            )}
          </div>
        )}

        <div className="text-tandur text-start font-semibold w-[90%]">
          {props.data?.NAME_PRODUCT.length > 17
            ? props.data?.NAME_PRODUCT.slice(0, 17) + "..."
            : props.data?.NAME_PRODUCT.length > 20
            ? props.data?.NAME_PRODUCT.slice(0, 20) + "..."
            : props.data?.NAME_PRODUCT}
        </div>
        <div className="text-[#4A4A4A] text-start font-poppinsBold">
          {currencyFormat(revertCurrency(props.data?.PRICE_PRODUCT.toString() || ""), "Rp. ")}
        </div>
        <div className="flex !mt-2">
          <AiFillStar size={24} color={"#F8E064"} />
          <div className="text-[#BDBDBD] ml-1 mb-2 align-top">{props.data?.RATING_PRODUCT} / 5</div>
        </div>
        <div className="flex flex-row pb-2">
          <IoLocationSharp size={24} className="text-tandur" />
          <div className="text-[#828282] font-poppins  ml-1">{props.data?.NAME_DISTRICT}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
