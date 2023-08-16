import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { CommonButton, LoadingModal, TrackModal, Main, Title } from "../../components";
import { loadLandDetail, rentLand } from "../../redux/actions";
import { IoLocationSharp } from "react-icons/io5";
import { TiMinus, TiPlus } from "react-icons/ti";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";

import { format, addMonths } from "date-fns";
import { id as localeId } from "date-fns/locale";
import FocusTrap from "focus-trap-react";
import { DayPicker } from "react-day-picker";
import { usePopper } from "react-popper";
import "react-day-picker/dist/style.css";

const css = `
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
    background-color: #7CBD1E;
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #d1ff91;
  }
`;

function ConfirmOrderLand() {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderData = location.state ? location.state.values : null;
  const [counter, setCounter] = useState(orderData?.month ? orderData.month : 1);
  const [subtotal, setSubtotal] = useState(orderData?.total_harga ? orderData.total_harga : 1);
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(orderData?.total_harga ? orderData.total_harga : 1);
  const { status, success, detail } = useSelector((state) => state.land);
  const { userInfo } = useSelector((state) => state.auth);
  let { id } = useParams();
  const idLand = "LAND_" + id;

  useEffect(() => {
    dispatch(loadLandDetail(idLand));
    setTotal(orderData.total_harga);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setInputValue(format(orderData.dateStart, "dd MMM y", { locale: localeId }));
    setSelected(orderData.dateStart);
  }, []);

  useEffect(() => {
    if (detail) {
      setSubtotal(orderData?.total_harga ? orderData.total_harga : detail?.PRICE_LAND);
    }
  }, [detail]);

  useEffect(() => {
    if (success) {
      window.location.href = success.data?.payment_url;
    }
  }, [status]);

  const [selected, setSelected] = useState();
  const [inputValue, setInputValue] = useState("");
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const handleDaySelect = (date) => {
    if (date !== undefined) {
      setSelected(date);
      setInputValue(format(date, "dd MMM y", { locale: localeId }));
    }
    closePopper();
  };

  return (
    <>
      <style>{css}</style>
      <Title text={"Tandur | Konfirmasi Penyewaan"} />
      <Main header={false} footer={true}>
        <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-evenly w-full  md:w-5/6 bg-white  shadow-lg">
            <div className="w-full flex flex-col md:flex-row">
              <div className="w-6/6 md:w-4/6 text-[#828282]  pt-20 px-4 lg:px-16 pb-10">
                <div className="text-3xl text-[#4A4A4A] font-poppinsSemibold">Konfirmasi Penyewaan</div>
                <div className="border-t-gray-300 border-2 mt-4 mb-8 pr-4"></div>
                <div className="w-6/6">
                  <div className="flex flex-row">
                    <div>
                      {detail?.URLGALLERY_LAND && <img src={detail?.URLGALLERY_LAND[0]} alt="" className={"w-[100px] h-[100px] rounded-lg"} />}
                    </div>
                    <div className="ml-4">
                      <div className="text-2xl text-tandur font-poppinsSemibold">{detail?.NAME_LAND}</div>
                      <div className="text-xl text-[#4A4A4A] font-poppinsBold">
                        {currencyFormat(revertCurrency(detail?.PRICE_LAND?.toString() || ""), "Rp. ")}
                      </div>
                      <div className="text-[#828282] font-poppins  mt-2">
                        Luas {detail?.WIDTH_LAND} x {detail?.LENGTH_LAND} meter
                      </div>
                      <div className="text-[#828282] font-poppins  mt-2">
                        Fasilitas :{" "}
                        {detail?.FACILITY_LAND?.split(";").map((e, i) => {
                          if (detail?.FACILITY_LAND.split(";").length == i + 1) {
                            return e + ".";
                          } else {
                            return e + ", ";
                          }
                        })}
                      </div>

                      <div className="flex flex-row justify-between mt-2 text-[#828282] font-poppins">
                        <div className="flex flex-col">
                          <div className="flex !mt-2">
                            <AiFillStar size={24} color={"#F8E064"} />
                            <div className="text-[#828282] ml-1 mb-2 align-top">{detail?.RATING_LAND} / 5 </div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-4">
                          <div className="flex flex-row !mt-2">
                            <IoLocationSharp size={24} className="text-tandur" />
                            <div className="text-[#828282] font-poppins  ml-1">{detail?.ADDRESS_LAND}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center mt-4">
                    <div className="font-poppinsSemibold text-xl text-[#4A4A4A]">Durasi Sewa (Bulan)</div>
                    <div className="flex flex-row items-center bg-[#F2F2F2] rounded-lg p-1 font-poppinsSemibold text-tandur">
                      <button
                        className="bg-[#E0E0E0] p-1 rounded-lg"
                        onClick={() => {
                          counter > 1 && setCounter(counter - 1);
                          counter > 1 && setSubtotal((counter - 1) * detail?.PRICE_LAND);
                          counter > 1 && setTotal((counter - 1) * detail?.PRICE_LAND);
                        }}
                      >
                        <TiMinus size={22} />
                      </button>
                      <span className="mx-3 text-xl">{counter}</span>
                      <button
                        className="bg-[#E0E0E0] p-1 rounded-lg"
                        onClick={() => {
                          setCounter(counter + 1);
                          setSubtotal((counter + 1) * detail?.PRICE_LAND);
                          setTotal((counter + 1) * detail?.PRICE_LAND);
                        }}
                      >
                        <TiPlus size={22} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#F2F2F2] mt-4 px-8 py-4 rounded-lg">
                    <div ref={popperRef} className="flex flex-row justify-between text-xl">
                      <div>
                        <div>Mulai pada</div>
                        <button className="font-poppinsSemibold mt-2" ref={buttonRef} type="button" onClick={handleButtonClick}>
                          {inputValue}
                        </button>
                      </div>
                      <div>
                        <div>Berakhir pada</div>
                        <div className="font-poppinsSemibold mt-2">{selected !== undefined && format(addMonths(selected, counter), "dd MMM y")}</div>
                      </div>
                    </div>
                    {isPopperOpen && (
                      <FocusTrap
                        active
                        focusTrapOptions={{
                          initialFocus: false,
                          allowOutsideClick: true,
                          clickOutsideDeactivates: true,
                          onDeactivate: closePopper,
                          fallbackFocus: buttonRef.current,
                        }}
                      >
                        <div
                          tabIndex={-1}
                          style={popper.styles.popper}
                          className="dialog-sheet bg-white z-10 rounded-lg border"
                          {...popper.attributes.popper}
                          ref={setPopperElement}
                          role="dialog"
                          aria-label="DayPicker calendar"
                        >
                          <DayPicker
                            initialFocus={isPopperOpen}
                            locale={localeId}
                            mode="single"
                            defaultMonth={selected}
                            selected={selected}
                            onSelect={handleDaySelect}
                            disabled={[{ before: new Date() }]}
                          />
                        </div>
                      </FocusTrap>
                    )}
                  </div>
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
              <div className="w-6/6 md:w-2/6 bg-[#F8FCF4] pt-10 md:pt-20 px-11 pb-10 flex flex-col justify-center">
                <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Detail Harga</div>
                <div className="flex flex-col my-4">
                  <div className="flex flex-col gap-4 lg:flex-row justify-between mt-4 mb-2 items-center">
                    <div className="text-[#828282] text-lg font-poppins">
                      {counter} Bulan - {detail?.NAME_LAND}
                    </div>
                    <div className="whitespace-nowrap"> {currencyFormat(revertCurrency(subtotal.toString() || ""), "Rp. ")}</div>
                  </div>
                </div>
                <div className="border-t-gray-300 border-2 mt-4 mb-4 pr-4"></div>
                <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Total Biaya</div>
                <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">
                  {currencyFormat(revertCurrency(total.toString() || ""), "Rp. ")}
                </div>
                <CommonButton
                  type="submit"
                  onClick={() => {
                    const values = {
                      id_land: idLand,
                      duration_rent: counter,
                      start_date: format(selected, "y-MM-dd", { locale: localeId }),
                      end_date: format(addMonths(selected, counter), "y-MM-dd", { locale: localeId }),
                      total_payment: total,
                    };
                    dispatch(rentLand(values));
                  }}
                  title="Sewa"
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
      <TrackModal show={show} styles={"z-[1300]"} onClose={() => setShow(!show)} />
    </>
  );
}

export default ConfirmOrderLand;
