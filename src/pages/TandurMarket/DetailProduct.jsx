import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingModal, Main, ProductCard, Title } from "../../components";
import { loadDetailProducts, loadProducts, loadProductsReview } from "../../redux/actions";
import RViewerJS from "viewerjs-react";
import { IoLocationSharp } from "react-icons/io5";
import { TiMinus, TiPlus } from "react-icons/ti";
import { AiOutlinePlus } from "react-icons/ai";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import PageNotFound from "../pageNotFound";
import { addCart } from "../../redux/slice/cartSlice";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { addProduct, removeProduct } from "../../redux/slice/favoriteSlice";
import { format, parseISO } from "date-fns";
import { FaStar } from "react-icons/fa";
import { BsChatLeftTextFill } from "react-icons/bs";

function DetailProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [allReview, setReview] = useState(false);

  const { status, products, detail, review } = useSelector((state) => state.product);
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
    dispatch(loadProductsReview(id));
    dispatch(loadProducts());
    setCounter(1);
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
                  <div className="w-full lg:w-4/6 text-[#828282] mr-8">
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

                    <div className="flex flex-col w-full mt-3">
                      <div className="font-poppinsSemibold text-lg">Penjual</div>
                      <div className="flex w-full  justify-between items-center rounded-md mt-2">
                        <div className="flex items-center">
                          <img src={detail?.IMG_USER} alt="" className="w-[35px] h-[35px] mr-2 img-fluid rounded-full" />
                          <div className="font-poppinsSemibold ">{detail?.NAME_USER}</div>
                        </div>
                        <button
                          onClick={() => {
                            window.open("https://api.whatsapp.com/send?phone=" + detail?.TELP_USER, "_blank");
                          }}
                          className="flex gap-3 items-center bg-[#F4F4F4] py-2 px-4 rounded-md font-poppinsSemibold mr-4"
                        >
                          <BsChatLeftTextFill size={20} />
                          Hubungi
                        </button>
                      </div>
                    </div>

                    <div className="border-t-gray-300 border-2 my-4 pr-4"></div>
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A]">Informasi Barang</div>
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
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Deskripsi Barang</div>
                    <div className="text-lg mt-4">{detail?.DESC_PRODUCT}</div>
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Catatan Penjual</div>
                    <div className="text-lg mt-4">{detail?.NOTE_PRODUCT}</div>
                  </div>
                  <div className="w-full lg:w-2/6 mt-11">
                    <div className="shadow-lg border rounded-3xl p-6 text-[#4A4A4A]">
                      <div className="text-3xl text-[#4A4A4A] font-poppinsBold">
                        {currencyFormat(revertCurrency(detail?.PRICE_PRODUCT.toString() || ""), "Rp. ")}
                      </div>
                      <div className="flex flex-row justify-between items-center mt-4">
                        <div className="font-poppinsSemibold text-lg">Qty</div>
                        <div className="flex flex-row items-center bg-[#F2F2F2] rounded-lg p-1 font-poppinsSemibold text-tandur">
                          <button
                            className="bg-[#E0E0E0] p-1 rounded-lg"
                            onClick={() => {
                              counter > 1 && setCounter(counter - 1);
                              counter > 1 && setSubtotal((counter - 1) * detail?.PRICE_PRODUCT);
                            }}
                          >
                            <TiMinus size={20} />
                          </button>
                          <span className="mx-3 text-lg">{counter}</span>
                          <button
                            className="bg-[#E0E0E0] p-1 rounded-lg"
                            onClick={() => {
                              setCounter(counter + 1);
                              setSubtotal((counter + 1) * detail?.PRICE_PRODUCT);
                            }}
                          >
                            <TiPlus size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="font-poppinsSemibold text-lg mt-4">Subtotal</div>
                      <div className="text-2xl text-[#4A4A4A] font-poppinsBold mt-2">
                        {counter == 1
                          ? currencyFormat(revertCurrency(detail?.PRICE_PRODUCT.toString() || ""), "Rp. ")
                          : currencyFormat(revertCurrency(subtotal.toString() || ""), "Rp. ")}
                      </div>
                      <div className="flex gap-4">
                        <button
                          type={"button"}
                          onClick={() => {
                            dispatch(
                              addCart({
                                id: detail?.ID_PRODUCT,
                                name: detail?.NAME_PRODUCT,
                                img: detail?.PHOTO_PRODUCT,
                                qty: counter,
                                total: detail?.PRICE_PRODUCT * counter,
                              })
                            );
                          }}
                          className={`text-white text-base bg-tandur border-2 border-tandur hover:text-tandur hover:bg-white active:bg-gray-100 active:text-tandur focus:outline-none disabled:bg-gray-300 w-full mt-3 py-2 rounded-2xl `}
                        >
                          <div className="flex items-center justify-center gap-1">
                            <AiOutlinePlus size={20} />
                            Keranjang
                          </div>
                        </button>
                        <button
                          type={"button"}
                          onClick={() => {
                            const values = {
                              id_product: detail?.ID_PRODUCT,
                              qty: counter,
                              total_harga: detail?.PRICE_PRODUCT * counter,
                            };
                            navigate("/market/order/" + detail?.ID_PRODUCT, { state: { values } });
                          }}
                          className={`text-tandur text-base bg-white border-2 border-tandur hover:bg-gray-100 active:bg-gray-100 active:text-tandur focus:outline-none disabled:bg-gray-300 w-full mt-3 py-2 rounded-2xl `}
                        >
                          Beli
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {review.length > 0 && (
                  <>
                    <div className="border-t-gray-300 border-2 my-8 mb-4 pr-4 w-full"></div>
                    <div className="flex flex-row w-full mb-4 items-end">
                      <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] ">Ulasan</div>
                      <div className="font-poppinsSemibold text-lg text-tandur ml-4 cursor-pointer" onClick={() => setReview(!allReview)}>
                        {allReview ? "Lebih sedikit" : "Lihat semua"}
                      </div>
                    </div>
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center">
                      {review &&
                        review.slice(0, allReview ? review.length + 1 : 2).map((e, i) => (
                          <div key={i} className="flex gap-3 bg-white rounded-lg overflow-hidden border p-4">
                            <img src={review[0]?.IMG_USER} alt="" className={`w-10 h-10 rounded-full`} />
                            <div className="flex flex-col">
                              <div className="text-[#828282] font-poppins">{review[0]?.NAME_USER}</div>
                              <div className="text-[#4A4A4A] font-poppinsSemibold">{review[0]?.REVIEW_TITLE}</div>
                              <div className="text-[#BDBDBD] font-poppins">
                                {review[0]?.DATE_REVIEW && format(parseISO(review[0]?.DATE_REVIEW), "dd MMM y")}
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, index) => {
                                  const starValue = index + 1;
                                  return (
                                    <FaStar
                                      key={index}
                                      size={20}
                                      color={review[0]?.RATING >= starValue ? "#F8E064" : "#e4e5e9"}
                                      style={{ marginRight: 10 }}
                                    />
                                  );
                                })}
                              </div>
                              <div className="text-[#4A4A4A] font-poppins mt-1">{review[0]?.REVIEW_CONTENT}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                <div className="border-t-gray-300 border-2 my-8 mb-4 pr-4 w-full"></div>
                <div className="flex flex-row w-full mb-4 items-end">
                  <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] ">Barang Lainnya</div>
                  <div className="font-poppinsSemibold text-lg text-tandur ml-4">
                    <Link to={"../market"}>Lihat semua</Link>
                  </div>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full items-center">
                  {products
                    .filter((item) => item.ID_PRODUCT !== id)
                    .slice(0, 4)
                    .map((val, i) => {
                      return <ProductCard key={i} data={val} customStyle={"w-[225px]"} />;
                    })}
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

export default DetailProduct;
