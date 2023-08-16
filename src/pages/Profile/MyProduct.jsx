import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import { AiFillStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { LoadingModal, Main, ProfileSidebar, Title } from "../../components";
import { loadProductsUser } from "../../redux/actions";

function MyProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [active, setActive] = useState(1);

  const { status, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(loadProductsUser());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const checkProducts = (category) => {
    return products.filter((item) => item.CATEGORY == category);
  };

  return (
    <>
      <Title text={"Tandur | Barang Saya"} />
      <Main header={false} footer={true}>
        <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-evenly w-full lg:w-5/6 bg-white  shadow-lg">
            <div className="w-full flex flex-row">
              <div className="w-full text-[#828282] mr-0 lg:mr-8 pt-20 px-4 lg:pl-16 pb-10">
                <div className="text-3xl text-[#4A4A4A] font-poppinsSemibold">Profil</div>
                <div className="border-t-gray-300 border-2 mt-4 mb-8 pr-4"></div>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-3/12">
                    <ProfileSidebar />
                  </div>
                  <div className="w-full lg:w-9/12  rounded-lg shadow-md border px-8 py-6">
                    <div className="text-[#4A4A4A] font-poppinsSemibold text-2xl">Manajemen Barang</div>
                    <div className="flex flex-row items-center gap-4 justify-center mt-8 mb-6">
                      <div
                        onClick={(e) => {
                          setActive(1);
                        }}
                        className={`flex-1 cursor-pointer text-lg font-poppinsSemibold mb-4 rounded-2xl text-center ml-3 px-2 py-2 ${
                          active == 1 ? "text-white bg-tandur" : "text-font-primary bg-[#F2F2F2]"
                        } `}
                      >
                        Pasar Tandur
                      </div>
                      <div
                        onClick={(e) => {
                          setActive(2);
                        }}
                        className={`flex-1 cursor-pointer text-lg font-poppinsSemibold mb-4 rounded-2xl text-center ml-3 px-2 py-2 ${
                          active == 2 ? "text-white bg-tandur" : "text-font-primary bg-[#F2F2F2]"
                        } `}
                      >
                        Ground Garden
                      </div>
                    </div>
                    <div className="">
                      {active == 1 ? (
                        checkProducts("Tandur Market").length > 0 ? (
                          checkProducts("Tandur Market").map((e, i) => (
                            <div
                              key={i}
                              className="rounded-lg p-6 shadow-lg border flex flex-row gap-4 mt-8 cursor-pointer hover:shadow-xl"
                              onClick={() => navigate("/my-product/" + e.ID_PRODUCT)}
                            >
                              <div className="overflow-hidden">
                                <img alt="" src={e.PHOTO_PRODUCT[0]} className="w-96 h-36 rounded-lg object-fill" />
                              </div>
                              <div className="w-full h-auto flex flex-col justify-between">
                                <div>
                                  <div className="font-poppinsSemibold text-tandur text-2xl">{e.NAME_PRODUCT}</div>
                                  <div className="font-poppinsSemibold text-black text-lg">
                                    {currencyFormat(revertCurrency(e.PRICE_PRODUCT.toString() || ""), "Rp. ")}
                                  </div>
                                </div>
                                <div className="flex flex-row gap-6">
                                  <div className="flex">
                                    <AiFillStar size={24} color={"#F8E064"} />
                                    <div className="text-[#828282] ml-1 font-poppins align-top">{e.RATING_PRODUCT} / 5</div>
                                  </div>
                                  <div className="flex flex-row">
                                    <IoLocationSharp size={24} className="text-tandur" />
                                    <div className="text-[#828282] font-poppins ml-1">{e.NAME_DISTRICT}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-xl text-center pt-8 font-poppinsSemibold">Tidak ada barang</div>
                        )
                      ) : checkProducts("Ground Garden").length > 0 ? (
                        checkProducts("Ground Garden").map((e, i) => (
                          <div
                            key={i}
                            className="rounded-lg p-6 shadow-lg border flex flex-row gap-4 mt-8  cursor-pointer hover:shadow-xl"
                            onClick={() => navigate("/my-product/" + e.ID_PRODUCT)}
                          >
                            <div className="overflow-hidden">
                              <img alt="" src={e.PHOTO_PRODUCT[0]} className="w-96 h-36 rounded-lg object-fill" />
                            </div>
                            <div className="w-full h-auto flex flex-col justify-between">
                              <div>
                                <div className="font-poppinsSemibold text-tandur text-2xl">{e.NAME_PRODUCT}</div>
                                <div className="font-poppinsSemibold text-black text-lg">
                                  {currencyFormat(revertCurrency(e.PRICE_PRODUCT.toString() || ""), "Rp. ")}
                                </div>
                              </div>
                              <div className="flex flex-row gap-6">
                                <div className="flex">
                                  <AiFillStar size={24} color={"#F8E064"} />
                                  <div className="text-[#828282] ml-1 font-poppins align-top">{e.RATING_PRODUCT} / 5</div>
                                </div>
                                <div className="flex flex-row">
                                  <IoLocationSharp size={24} className="text-tandur" />
                                  <div className="text-[#828282] font-poppins ml-1">{e.NAME_DISTRICT}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xl text-center pt-8 font-poppinsSemibold">Tidak ada barang</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
    </>
  );
}

export default MyProduct;
