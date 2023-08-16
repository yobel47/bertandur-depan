import React from "react";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CommonButton, LoadingModal, Main, Title, ReviewModal, AlertModal, SuccessModal } from "../../components";
import { loadProductDetailTransaction } from "../../redux/actions";
import { IoLocationSharp } from "react-icons/io5";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import { resetError, resetSuccess } from "../../redux/slice/productSlice";

function DetailOrder() {
  const dispatch = useDispatch();

  const { status, success, error, detail } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);

  const [showReview, setShowReview] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    dispatch(loadProductDetailTransaction("PURCHASE_" + id));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Title text={"Tandur | Detail Pemesanan"} />
      <Main header={false} footer={true}>
        <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-evenly w-full  md:w-5/6 bg-white  shadow-lg">
            <div className="w-full flex flex-col md:flex-row">
              <div className="w-6/6 md:w-4/6 text-[#828282] mr-8 pt-20 pl-16 pb-10">
                <div className="text-3xl text-[#4A4A4A] font-poppinsSemibold">Detail Pemesanan</div>
                <div className="border-t-gray-300 border-2 mt-4 mb-8 pr-4"></div>
                <div className="w-6/6 flex flex-col gap-6">
                  {detail?.PURCHASE_DETAIL.map((e, i) => (
                    <div className="flex flex-row" key={i}>
                      <div>
                        <img src={e.PHOTO_PRODUCT[0]} alt="" className={"w-[100px] h-[100px] rounded-lg"} />
                      </div>
                      <div className="ml-4">
                        <div className="text-2xl text-tandur font-poppinsSemibold">{e.NAME_PRODUCT}</div>
                        <div className="text-xl text-[#4A4A4A] font-poppinsBold">
                          {currencyFormat(revertCurrency(e.PRICE_PRODUCT.toString() || ""), "Rp. ")}
                        </div>
                        <div className="flex flex-row justify-between mt-2 text-[#828282] font-poppins">
                          <div className="flex flex-col">
                            <div className="flex !mt-2">
                              <AiFillStar size={24} color={"#F8E064"} />
                              <div className="text-[#828282] ml-1 mb-2 align-top">{e.RATING_PRODUCT} / 5</div>
                            </div>
                          </div>
                          <div className="flex flex-col ml-4">
                            <div className="flex flex-row !mt-2">
                              <IoLocationSharp size={24} className="text-tandur" />
                              <div className="text-[#828282] font-poppins  ml-1">{e.NAME_CITY}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* <div className="border-t-gray-300 border-2 my-4 pr-4"></div> */}
                  <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Informasi Pembeli</div>
                  <div className="flex flex-col font-poppins my-3">
                    <div className="flex flex-row justify-between mb-2">
                      <span className="text-xl">Nama</span>
                      <span className="text-xl font-poppinsSemibold text-tandur">{userInfo.NAME_USER}</span>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <span className="text-xl">Email</span>
                      <span className="text-xl font-poppinsSemibold text-tandur">{userInfo.EMAIL_USER}</span>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <span className="text-xl">No Telp</span>
                      <span className="text-xl font-poppinsSemibold text-tandur">{userInfo.TELP_USER}</span>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <span className="text-xl">Alamat</span>
                      <span className="text-xl font-poppinsSemibold text-tandur">{userInfo.ADDRESS_USER}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-6/6 md:w-2/6 bg-[#F8FCF4] pt-10 md:pt-20 px-12 pb-10 flex flex-col justify-center">
                <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Status Pembayaran</div>
                <div className="font-poppinsSemibold text-2xl text-tandur mt-2">Berhasil</div>
                <div className="border-t-gray-300 border-2 my-4 pr-4"></div>
                <div className="font-poppinsSemibold text-2xl text-[#4A4A4A]">Detail Harga</div>
                <div className="flex flex-col mt-4">
                  {detail?.PURCHASE_DETAIL.map((e, i) => (
                    <div key={i} className="grid justify-between mb-2 gap-4" style={{ gridTemplateColumns: "2fr 2fr" }}>
                      <div className="text-[#828282] text-lg font-poppins">
                        {e.QTY_PD}x - {e.NAME_PRODUCT}
                      </div>
                      <div> {currencyFormat(revertCurrency(e.TOTAL_PRICE.toString() || ""), "Rp. ")}</div>
                    </div>
                  ))}
                  <div className="grid justify-between my-2 gap-4" style={{ gridTemplateColumns: "2fr 2fr" }}>
                    <div className="text-[#828282] font-poppins text-lg">
                      Ongkos Kirim <span className="uppercase">{detail?.SHIPPING_METHOD}</span>
                    </div>
                    <div> {currencyFormat(revertCurrency(detail?.SHIPPING_COST.toString() || ""), "Rp. ")}</div>
                  </div>
                </div>
                <div className="border-t-gray-300 border-2 my-4 pr-4"></div>
                <div className="flex flex-col mt-2">
                  <div className="grid justify-between mb-2 gap-4" style={{ gridTemplateColumns: "2fr 2fr" }}>
                    <div className="text-[#828282] text-lg font-poppinsSemibold">Metode Pembayaran</div>
                    <div className="capitalize text-lg text-tandur font-poppinsSemibold self-center">
                      {detail?.PAYMENT_DETAIL[0].payment_type == "bank_transfer" ? "Bank Transfer" : detail?.PAYMENT_DETAIL[0].payment_type}
                    </div>
                  </div>
                  <div className="grid justify-between mb-2 gap-4" style={{ gridTemplateColumns: "2fr 2fr" }}>
                    <div className="text-[#828282] text-lg font-poppinsSemibold">Jumlah Tagihan</div>
                    <div className="capitalize text-lg text-tandur font-poppinsSemibold self-center">
                      {currencyFormat(revertCurrency(detail?.TOTPAYMENT_PURCHASE.toString() || ""), "Rp. ")}
                    </div>
                  </div>
                  <div className="grid justify-between mb-2 gap-4" style={{ gridTemplateColumns: "2fr 2fr" }}>
                    <div className="text-[#828282] text-lg font-poppinsSemibold">Nomor Tagihan</div>
                    <div className="capitalize text-lg text-tandur font-poppinsSemibold self-center">{detail?.ID_PURCHASE}</div>
                  </div>
                  {detail?.PAYMENT_DETAIL[0]?.va_number && (
                    <div className="grid justify-between mb-2 gap-4" style={{ gridTemplateColumns: "2fr 2fr" }}>
                      <div className="text-[#828282] text-lg font-poppinsSemibold">Nomor rekening VA</div>
                      <div className="capitalize text-lg text-tandur font-poppinsSemibold self-center break-all">
                        {detail?.PAYMENT_DETAIL[0].va_number}
                      </div>
                    </div>
                  )}
                </div>
                {detail?.STATUS_REVIEW_PRODUCT !== "1" && (
                  <CommonButton
                    type="submit"
                    onClick={() => {
                      setShowReview(true);
                    }}
                    title="Berikan Ulasan"
                    disabled={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
      <ReviewModal
        visible={showReview}
        setVisible={setShowReview}
        styles={"z-[1200]"}
        id={detail?.PURCHASE_DETAIL[0].ID_PRODUCT}
        idTransaction={detail?.ID_PURCHASE}
      />
      <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
      <SuccessModal error={success} data={success} onClose={() => dispatch(resetSuccess())} styles={"z-[1300]"} />
    </>
  );
}

export default DetailOrder;
