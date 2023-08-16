import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingModal, Main, LandCard, Title } from "../../components";
import { loadLands, loadLandDetail, loadLandsReview } from "../../redux/actions";
import RViewerJS from "viewerjs-react";
import { IoLocationSharp } from "react-icons/io5";
import { TiMinus, TiPlus } from "react-icons/ti";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import PageNotFound from "../pageNotFound";
import { IoWater, IoHome } from "react-icons/io5";
import { GiSpade } from "react-icons/gi";
import { BsPlugFill, BsChatLeftTextFill } from "react-icons/bs";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

import { format, addMonths, parseISO } from "date-fns";
import { id as localeId } from "date-fns/locale";
import FocusTrap from "focus-trap-react";
import { DayPicker } from "react-day-picker";
import { usePopper } from "react-popper";
import "react-day-picker/dist/style.css";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "../Maps/Maps.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { addLand, removeLand } from "../../redux/slice/favoriteSlice";

mapboxgl.accessToken = "pk.eyJ1IjoieW9iZWwiLCJhIjoiY2xiOWk0ZHpxMHYyODNvcXAweW82a2llNyJ9.VhHzgDxzRzdqFdmHX9dbCQ";

const css = `
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
    background-color: #7CBD1E;
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #d1ff91;
  }
`;

function DetailLand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [counter, setCounter] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [allReview, setReview] = useState(false);
  const { status, lands, detail, review } = useSelector((state) => state.land);

  let { id } = useParams();
  const idLand = "LAND_" + id;
  useEffect(() => {
    dispatch(loadLandDetail(idLand));
    dispatch(loadLandsReview(idLand));
    dispatch(loadLands());
    setCounter(1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setInputValue(format(new Date(), "dd MMM y", { locale: localeId }));
    setSelected(new Date());
  }, [id]);

  useEffect(() => {
    if (detail?.ID_LAND == "LAND_" + id) {
      if (map.current) return; // initialize map only once

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [
          detail?.LONG_LAND <= 180 && detail?.LONG_LAND >= -180 ? detail?.LONG_LAND : "0",
          detail?.LAT_LAND <= 90 && detail?.LAT_LAND >= -90 ? detail?.LAT_LAND : "0",
        ],
        zoom: 15,
      });

      marker.current = new mapboxgl.Marker({ color: "red" })
        .setLngLat([
          detail?.LONG_LAND <= 180 && detail?.LONG_LAND >= -180 ? detail?.LONG_LAND : "0",
          detail?.LAT_LAND <= 90 && detail?.LAT_LAND >= -90 ? detail?.LAT_LAND : "0",
        ])
        .addTo(map.current);
    }
  }, [detail]);

  const formattedDate = () => {
    const dateStr = detail?.REGISTERAT_LAND;
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("id-ID", options);
    return formattedDate;
  };

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

  const landsLiked = useSelector((state) => state.favorite.lands);

  const [liked, setLiked] = useState(landsLiked.some((obj) => obj.ID_LAND == "LAND_" + id));

  const onLiked = (e) => {
    e.stopPropagation();
    const landLike = landsLiked.some((obj) => obj.ID_LAND == detail?.ID_LAND);

    if (!landLike) {
      dispatch(addLand(detail));
    } else {
      dispatch(removeLand(detail?.ID_LAND));
    }
    setLiked(!liked);
  };

  return (
    <>
      <style>{css}</style>
      <Title text={"Tandur" + (detail && " | " + detail.NAME_LAND)} />
      <Main header={false} footer={true}>
        {/* <PageNotFound /> */}

        {detail ? (
          <>
            <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
              <div className="flex flex-col items-center justify-evenly w-full md:w-5/6 bg-white pt-20 px-8 md:px-16 pb-10 shadow-lg">
                <RViewerJS options={{ navbar: false, button: false }}>
                  {detail.URLGALLERY_LAND && (
                    <div className="flex w-full items-center flex-col lg:flex-row mb-8">
                      <img
                        src={detail?.URLGALLERY_LAND[0]}
                        alt=""
                        className={` ${detail?.URLGALLERY_LAND[1] == "-" ? "w-full " : "w-80 h-80 md:w-[30rem]"}   md:h-[31rem]`}
                      />
                      <div>
                        <div className="flex flex-wrap gap-4 lg:ml-4 mt-4 lg:mt-0 justify-center">
                          <img
                            src={detail?.URLGALLERY_LAND[1]}
                            alt=""
                            className={`${detail?.URLGALLERY_LAND[1] !== "-" ? "block" : "hidden"} w-28 h-28 lg:w-60 lg:h-60`}
                          />
                          <img
                            src={detail?.URLGALLERY_LAND[2]}
                            alt=""
                            className={`${detail?.URLGALLERY_LAND[2] !== "-" ? "block" : "hidden"} w-28 h-28 lg:w-60 lg:h-60`}
                          />
                          <img
                            src={detail?.URLGALLERY_LAND[3]}
                            alt=""
                            className={`${detail?.URLGALLERY_LAND[3] !== "-" ? "block" : "hidden"} w-28 h-28 lg:w-60 lg:h-60`}
                          />
                          <img
                            src={detail?.URLGALLERY_LAND[4]}
                            alt=""
                            className={`${detail?.URLGALLERY_LAND[4] !== "-" ? "block" : "hidden"} w-28 h-28 lg:w-60 lg:h-60`}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </RViewerJS>
                <div className="w-full flex flex-col lg:flex-row">
                  <div className="w-full lg:w-4/6 text-[#828282] mr-8">
                    <div className="flex justify-between">
                      <div className="text-3xl text-tandur font-poppinsSemibold">{detail?.NAME_LAND}</div>
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
                          <div className="text-[#828282] ml-1 mb-2 align-top">{detail?.RATING_LAND} / 5</div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="font-semibold text-lg">Lokasi Penjual</div>
                        <div className="flex flex-row !mt-2">
                          <IoLocationSharp size={24} className="text-tandur" />
                          <div className="text-[#828282] font-poppins ml-1 mr-4">{detail?.ADDRESS_LAND}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col w-full mt-3">
                      <div className="font-poppinsSemibold text-lg">Pemilik Lahan</div>
                      <div className="flex w-full  justify-between items-center rounded-md mt-2">
                        <div className="flex items-center">
                          <img src={detail?.IMG_USER} alt="" className="w-[35px] h-[35px] mr-2 img-fluid rounded-full" />
                          <div className="font-poppinsSemibold ">{detail?.OWNNAME_LAND}</div>
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
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A]">Fasilitas Lahan</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 justify-between w-full font-poppins my-3 pr-0 md:pr-10">
                      {detail?.FACILITY_LAND?.split(";").map((e, i) => {
                        return (
                          <div className="flex" key={i}>
                            {e == "Irigasi" ? (
                              <IoWater size={24} className="text-tandur" />
                            ) : e == "Peralatan" ? (
                              <GiSpade size={24} className="text-tandur" />
                            ) : e == "Listrik" ? (
                              <BsPlugFill size={24} className="text-tandur" />
                            ) : (
                              e == "Kanopi" && <IoHome size={24} className="text-tandur" />
                            )}
                            <span className="text-[#828282] font-poppins ml-1">{e}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Keterangan Lahan</div>
                    <div className="flex flex-col font-poppins my-3">
                      <div className="flex flex-row justify-between mb-2">
                        <span className="text-lg">Ukuran Lahan</span>
                        <span className="text-lg font-poppinsSemibold text-tandur">
                          {detail?.WIDTH_LAND} x {detail?.LENGTH_LAND} meter
                        </span>
                      </div>
                      <div className="flex flex-row justify-between mb-2">
                        <span className="text-lg">ID Lahan</span>
                        <span className="text-lg font-poppinsSemibold text-tandur">{detail?.ID_LAND}</span>
                      </div>
                      <div className="flex flex-row justify-between mb-2">
                        <span className="text-lg">Terdaftar Pada</span>
                        <span className="text-lg font-poppinsSemibold text-tandur">{formattedDate()}</span>
                      </div>
                    </div>
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Peraturan Lahan</div>
                    <div className="text-lg mt-4">{detail?.RULE_LAND}</div>
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Lokasi Lahan</div>
                    <div className="w-full mt-4 rounded-lg overflow-hidden">
                      <div ref={mapContainer} className="map-container w-full h-[100vh]" />
                    </div>
                  </div>
                  <div className="w-full lg:w-2/6 mt-11">
                    <div className="shadow-lg border rounded-3xl p-6 text-[#4A4A4A]">
                      <div className="text-[1.7rem] text-[#4A4A4A] font-poppinsBold">
                        {currencyFormat(revertCurrency(detail?.PRICE_LAND?.toString() || ""), "Rp. ")}
                        <span className="text-base"> / Bulan</span>
                      </div>
                      <div className="flex flex-row justify-between items-center mt-4">
                        <div className="font-poppinsSemibold text-base">Durasi Sewa (Bulan)</div>
                        <div className="flex flex-row items-center bg-[#F2F2F2] rounded-lg p-1 font-poppinsSemibold text-tandur">
                          <button
                            className="bg-[#E0E0E0] p-1 rounded-lg"
                            onClick={() => {
                              counter > 1 && setCounter(counter - 1);
                              counter > 1 && setSubtotal((counter - 1) * detail?.PRICE_LAND);
                            }}
                          >
                            <TiMinus size={20} />
                          </button>
                          <span className="mx-3 text-lg">{counter}</span>
                          <button
                            className="bg-[#E0E0E0] p-1 rounded-lg"
                            onClick={() => {
                              setCounter(counter + 1);
                              setSubtotal((counter + 1) * detail?.PRICE_LAND);
                            }}
                          >
                            <TiPlus size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="bg-[#F2F2F2] mt-4 px-4 py-2 rounded-lg">
                        <div ref={popperRef} className="flex flex-row justify-between">
                          <div>
                            <div>Mulai pada</div>
                            <button className="font-poppinsSemibold" ref={buttonRef} type="button" onClick={handleButtonClick}>
                              {inputValue}
                            </button>
                          </div>
                          <div>
                            <div>Berakhir pada</div>
                            <div className="font-poppinsSemibold">{selected !== undefined && format(addMonths(selected, counter), "dd MMM y")}</div>
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
                      <div className="font-poppinsSemibold text-lg mt-4">Total Biaya Sewa</div>
                      <div className="text-2xl text-[#4A4A4A] font-poppinsBold mt-2">
                        {counter == 1
                          ? currencyFormat(revertCurrency(detail?.PRICE_LAND?.toString() || ""), "Rp. ")
                          : currencyFormat(revertCurrency(subtotal.toString() || ""), "Rp. ")}
                      </div>
                      <div className="flex gap-4">
                        <button
                          type={"button"}
                          onClick={() => {
                            if (isLoggedIn) {
                              const values = {
                                id_land: detail?.ID_LAND,
                                month: counter,
                                dateStart: selected,
                                total_harga: detail?.PRICE_LAND * counter,
                              };
                              navigate("/land/order/" + detail?.ID_LAND.slice(5), { state: { values } });
                            } else {
                              navigate("/masuk");
                            }
                          }}
                          className={`text-white text-base bg-tandur border-2 border-tandur hover:text-tandur hover:bg-white active:bg-gray-100 active:text-tandur focus:outline-none disabled:bg-gray-300 w-full mt-3 py-2 rounded-2xl`}
                        >
                          Sewa
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
                  <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] ">Lahan Lainnya</div>
                  <div className="font-poppinsSemibold text-lg text-tandur ml-4">
                    <Link to={"../land?sort=2"}>Lihat semua</Link>
                  </div>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full items-center">
                  {lands
                    .filter((item) => item.ID_LAND !== "LAND_" + id)
                    .slice(0, 4)
                    .map((val, i) => {
                      return <LandCard key={i} data={val} customStyle={"w-[225px]"} />;
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

export default DetailLand;
