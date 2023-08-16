import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingModal, Main, Title } from "../../components";
import { loadLandDetail } from "../../redux/actions";
import RViewerJS from "viewerjs-react";
import { IoLocationSharp } from "react-icons/io5";
import PageNotFound from "../pageNotFound";
import { IoWater, IoHome } from "react-icons/io5";
import { GiSpade } from "react-icons/gi";
import { BsPlugFill } from "react-icons/bs";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";

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

function PreviewLand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const { status, detail } = useSelector((state) => state.land);
  let { id } = useParams();
  const idLand = "LAND_" + id;
  useEffect(() => {
    dispatch(loadLandDetail(idLand));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);

  useEffect(() => {
    if (detail) {
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

  const landsLiked = useSelector((state) => state.favorite.lands);
  const { isLoggedIn } = useSelector((state) => state.auth);

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
                  <div className="w-full lg:w-3/6 text-[#828282] mr-8">
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
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Fasilitas Lahan</div>
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
                              <IoHome size={24} className="text-tandur" />
                            )}
                            <span className="text-[#828282] font-poppins ml-1">{e}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Lokasi Lahan</div>
                    <div className="w-full mt-4 rounded-lg overflow-hidden">
                      <div ref={mapContainer} className="map-container w-full h-[100vh]" />
                    </div>
                  </div>
                  <div className="w-full lg:w-3/6">
                    <div className="flex gap-4 justify-end">
                      {/* {detail?.IS_ACTIVE == 0 && (
                        <button
                          type={"button"}
                          onClick={() => {
                            //API aktifkan lahan
                          }}
                          className={`text-white text-base bg-tandur border-2 border-tandur hover:text-tandur hover:bg-white active:bg-gray-100 active:text-tandur focus:outline-none disabled:bg-gray-300 w-full py-2 rounded-2xl `}
                        >
                          <div className="flex items-center justify-center gap-1 font-poppinsSemibold">Aktifkan Lahan</div>
                        </button>
                      )} */}
                      <button
                        type={"button"}
                        onClick={() => {
                          navigate("/land/ubah/" + detail?.ID_LAND.substring(5));
                        }}
                        className={`${
                          detail?.IS_ACTIVE == 1 && "!w-1/2"
                        } text-tandur text-base bg-white border-2 font-poppinsSemibold border-tandur hover:bg-gray-100 active:bg-gray-100 active:text-tandur focus:outline-none disabled:bg-gray-300 w-full py-2 rounded-2xl `}
                      >
                        Ubah Data
                      </button>
                    </div>
                    <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-8">Keterangan Lahan</div>
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

export default PreviewLand;
