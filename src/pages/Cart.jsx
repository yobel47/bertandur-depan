import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { CartCard, CommonButton, LoadingModal, Main, ProductCard, Title } from "../components";
import { loadProducts, loadProductsGuest } from "../redux/actions";
import { Ihi } from "../assets";

function CartLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartList } = useSelector((state) => state.cart);

  return (
    <>
      <Title text={"Tandur | Keranjang"} />
      <Main header={false} footer={true}>
        <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-evenly w-5/6 bg-white  shadow-lg">
            <div className="w-full flex flex-row">
              <div className="w-full text-[#828282] mr-8 pt-20 pl-16 pb-10">
                <div className="text-3xl text-[#4A4A4A] font-poppinsSemibold">Keranjang</div>
                <div className="border-t-gray-300 border-2 mt-4 mb-8 pr-4"></div>
                {cartList.length == 0 ? (
                  <div className="text-center font-poppinsSemibold text-2xl py-44">Keranjang anda kosong!</div>
                ) : (
                  <div className="grid grid-cols-3 gap-6">
                    {cartList.map((e, i) => (
                      <CartCard data={e} key={i} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default CartLayout;
