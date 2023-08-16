import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingModal, Main, Title } from "../../components";
import { loadDetailProducts } from "../../redux/actions";
import RViewerJS from "viewerjs-react";
import { IoLocationSharp } from "react-icons/io5";
import PageNotFound from "../pageNotFound";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { addProduct, removeProduct } from "../../redux/slice/favoriteSlice";

function PreviewProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, detail } = useSelector((state) => state.product);
  let { id } = useParams();
  const productsLiked = useSelector((state) => state.favorite.products);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(productsLiked.some((obj) => obj.ID_PRODUCT == id));

  const onLiked = (e) => {
    e.stopPropagation();
    const productLike = productsLiked.some((obj) => obj.ID_PRODUCT == detail?.ID_PRODUCT);

    if (!productLike) {
      dispatch(addProduct(detail));
    } else {
      dispatch(removeProduct(detail?.ID_PRODUCT));
    }
    setLiked(!liked);
  };

  useEffect(() => {
    dispatch(loadDetailProducts(id));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);

  return (
    <>
      <Title text={"Tandur" + (detail && " | " + detail.NAME_PRODUCT)} />
      <Main header={false} footer={true}>
        {detail ? (
          <>
            <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
              <div className="flex flex-col items-center justify-evenly w-full md:w-5/6 bg-white pt-20 px-8 md:px-16 pb-10 shadow-lg">
                <RViewerJS options={{ navbar: false, button: false }}>
                  <div className="flex w-full items-center flex-col lg:flex-row mb-8">
                    <img src={detail?.PHOTO_PRODUCT[0]} alt="" className={"w-80 h-80 md:w-[30rem] md:h-[31rem]"} />
                    <div>
                      <div className="flex flex-wrap gap-4 lg:ml-4 mt-4 lg:mt-0 justify-center">
                        <img
                          src={detail?.PHOTO_PRODUCT[1]}
                          alt=""
                          className={`${detail?.PHOTO_PRODUCT[1] !== "-" ? "block" : "hidden"} w-28 h-28 lg:w-60 lg:h-60`}
                        />
                        <img
                          src={detail?.PHOTO_PRODUCT[2]}
                          alt=""
                          className={`${detail?.PHOTO_PRODUCT[2] !== "-" ? "block" : "hidden"} w-28 h-28 lg:w-60 lg:h-60`}
                        />
                        <img
                          src={detail?.PHOTO_PRODUCT[3]}
                          alt=""
                          className={`${detail?.PHOTO_PRODUCT[3] !== "-" ? "block" : "hidden"} w-28 h-28 lg:w-60 lg:h-60`}
                        />
                        <img
                          src={detail?.PHOTO_PRODUCT[4]}
                          alt=""
                          className={`${detail?.PHOTO_PRODUCT[4] !== "-" ? "block" : "hidden"} w-28 h-28 lg:w-60 lg:h-60`}
                        />
                      </div>
                    </div>
                  </div>
                </RViewerJS>
                <div className="w-full flex flex-col lg:flex-row">
                  <div className="w-full lg:w-3/6 text-[#828282] mr-8">
                    <div className="flex justify-between">
                      <div className="text-3xl text-tandur font-poppinsSemibold">{detail?.NAME_PRODUCT}</div>
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

                    <div className="flex flex-col sm:flex-row gap-2 justify-between mt-4 text-[#828282] font-poppins">
                      <div className="flex flex-1 flex-col">
                        <div className="font-semibold text-lg">Rating Produk</div>
                        <div className="flex !mt-2">
                          <AiFillStar size={24} color={"#F8E064"} />
                          <div className="text-[#828282] ml-1 mb-2 align-top">{detail?.RATING_PRODUCT} / 5</div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="font-semibold text-lg">Lokasi Penjual</div>
                        <div className="flex flex-row !mt-2">
                          <IoLocationSharp size={24} className="text-tandur" />
                          <div className="text-[#828282] font-poppins ml-1 mr-4">{detail?.ADDRESS_USER}</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-gray-300 border-2 my-4 pr-4"></div>
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Deskripsi Barang</div>
                    <div className="text-lg mt-4">{detail?.DESC_PRODUCT}</div>
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Catatan Penjual</div>
                    <div className="text-lg mt-4">{detail?.NOTE_PRODUCT}</div>
                  </div>
                  <div className="w-full lg:w-3/6 ">
                    <div className="flex gap-4 justify-end">
                      {/* <button
                        type={"button"}
                        onClick={() => {
                        }}
                        className={`text-white text-base bg-tandur border-2 border-tandur hover:text-tandur hover:bg-white active:bg-gray-100 active:text-tandur focus:outline-none disabled:bg-gray-300 w-full mt-3 py-2 rounded-2xl `}
                      >
                        <div className="flex items-center justify-center gap-1 font-poppinsSemibold">Aktifkan Lahan</div>
                      </button> */}
                      <button
                        type={"button"}
                        onClick={() => {
                          navigate("/market/ubah/" + detail?.ID_PRODUCT);
                        }}
                        className={`text-tandur w-1/2 text-base bg-white border-2 font-poppinsSemibold border-tandur hover:bg-gray-100 active:bg-gray-100 active:text-tandur focus:outline-none disabled:bg-gray-300 mt-3 py-2 rounded-2xl `}
                      >
                        Ubah Data
                      </button>
                    </div>
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-8">Informasi Barang</div>
                    <div className="flex flex-col font-poppins my-3">
                      <div className="flex flex-row justify-between mb-2">
                        <span className="text-lg">Stok</span>
                        <span className="text-lg font-poppinsSemibold text-tandur">{detail?.STOCK_PRODUCT}</span>
                      </div>
                      <div className="flex flex-row justify-between mb-2">
                        <span className="text-lg">Terjual</span>
                        <span className="text-lg font-poppinsSemibold text-tandur">{detail?.JML_TERJUAL}</span>
                      </div>
                      <div className="flex flex-row justify-between mb-2">
                        <span className="text-lg">Kondisi</span>
                        <span className="text-lg font-poppinsSemibold text-tandur">{detail?.CONDITION_PRODUCT}</span>
                      </div>
                      <div className="flex flex-row justify-between mb-2">
                        <span className="text-lg">Kategori</span>
                        <span className="text-lg font-poppinsSemibold text-tandur">{detail?.NAME_PCAT}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : status == "loading" ? (
          <div style={{ height: "100vh" }}></div>
        ) : (
          <PageNotFound />
        )}
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
    </>
  );
}

export default PreviewProduct;
