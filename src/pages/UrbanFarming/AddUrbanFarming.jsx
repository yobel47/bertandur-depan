import { Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AlertModal,
  CommonButton,
  InputCurrency,
  InputDropdown,
  InputImage,
  InputText,
  LoadingModal,
  Main,
  SuccessModal,
  Title,
  InputMultipleImg,
  InputMaskCustom,
} from "../../components";
import { addLands, loadLandDetail, loadLandsUser, updateLands } from "../../redux/actions";
import { resetError, resetSuccess } from "../../redux/slice/productSlice";
import { landValidationSchema } from "../../utils/validation/validationSchema";
import { getCity, getDistrict, getProductCategory, getProvince } from "../../service/Api";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import jwt from "jwt-decode";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { ZoomControl } from "mapbox-gl-controls";
import "../Maps/Maps.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = "pk.eyJ1IjoieW9iZWwiLCJhIjoiY2xiOWk0ZHpxMHYyODNvcXAweW82a2llNyJ9.VhHzgDxzRzdqFdmHX9dbCQ";

function AddUrbanFarming() {
  const navigate = useNavigate();
  const location = useLocation();
  const [foto1, setFoto1] = useState(null);
  const [dataFoto1, setDataFoto1] = useState(null);
  const [foto2, setFoto2] = useState(null);
  const [dataFoto2, setDataFoto2] = useState(null);
  const [reset, setReset] = useState(false);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [userData, setUserData] = useState([]);
  const [disabledKtp, setDisabledKTP] = useState(false);
  const [disabledInformasi, setDisabledInformasi] = useState(false);
  const [irigasi, setIrigasi] = useState(false);
  const [peralatan, setPeralatan] = useState(false);
  const [listrik, setListrik] = useState(false);
  const [kanopi, setKanopi] = useState(false);
  const [edit, setEdit] = useState(location.pathname.includes("ubah") ? true : false);
  const [fileGallery, setFileGallery] = useState([]);
  const formikRef = useRef();
  const gallery = useRef();

  let { id } = useParams();
  const idLand = "LAND_" + id;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const geocoder = useRef(null);
  const [lng, setLng] = useState(108.338223);
  const [lat, setLat] = useState(-7.053939);
  const [zoom, setZoom] = useState(15);

  const { status, success, error, detail } = useSelector((state) => state.land);

  const dispatch = useDispatch();

  const getDataProvince = async () => {
    try {
      let response = await getProvince();
      setDataProvince(response.data.data);
    } catch (e) {}
  };

  const getDataCity = async (id) => {
    try {
      let response = await getCity(id);
      setDataCity(response.data.data);
    } catch (e) {}
  };

  const getDataDistrict = async (id) => {
    try {
      let response = await getDistrict(id);
      setDataDistrict(response.data.data);
    } catch (e) {}
  };

  const onAdd = (values) => {
    const formdata = new FormData();
    formdata.append("name_land", values.name);
    formdata.append("address", values.address);
    formdata.append("province", values.province);
    formdata.append("city", values.city);
    formdata.append("district", values.district);
    formdata.append("location_land", values.location);
    formdata.append("nocertificate_land", values.noCertificate);
    formdata.append("foto_1", dataFoto1);
    formdata.append("foto_2", dataFoto2);
    formdata.append("desc", values.desc);
    formdata.append("longtitude", lng);
    formdata.append("latitude", lat);
    formdata.append("ownname_land", values.ownname_land);
    formdata.append("ownktp", values.ownktp);
    formdata.append("ownemail", userData.EMAIL_USER);
    formdata.append("owntelp", userData.TELP_USER);
    formdata.append("width_land", values.width);
    formdata.append("length_land", values.length);
    formdata.append("rule", values.rule);
    formdata.append("price", revertCurrency(values.price));
    const facility = (irigasi ? "Irigasi;" : "") + (listrik ? "Listrik;" : "") + (peralatan ? "Peralatan;" : "") + (kanopi ? "Kanopi;" : "");
    formdata.append("facility", facility);
    const gal = gallery.current.getFiles();
    gal.map((e, i) => {
      formdata.append("gallery_" + (i + 1), e);
    });
    if (edit) {
      formdata.append("rating", detail?.RATING_LAND);
      formdata.append("id_land", detail?.ID_LAND);
      dispatch(updateLands(formdata));
    } else {
      formdata.append("rating", "0");
      dispatch(addLands(formdata));
    }
  };

  useEffect(() => {
    if (!location.pathname.includes("ubah")) {
      setEdit(false);
    }
  }, []);

  useEffect(() => {
    getDataProvince();
    const user = jwt(localStorage.getItem("userToken"));
    setUserData(user);
    if (location.pathname.includes("ubah")) {
      setEdit(true);
      dispatch(loadLandsUser());
      dispatch(loadLandDetail(idLand));
    } else {
      setEdit(false);
    }
  }, []);

  useEffect(() => {
    if (edit) {
      if (detail) {
        getDataCity(detail.ID_PROVINCE);
        getDataDistrict(detail.ID_CITY);
        setFoto1(detail.URLDOC_LAND[0]);
        setFoto2(detail.URLDOC_LAND[1]);
        const facilityy = detail.FACILITY_LAND.replace(/;/g, ", ");
        if (facilityy?.includes("Irigasi")) {
          setIrigasi(true);
        }
        if (facilityy?.includes("Peralatan")) {
          setPeralatan(true);
        }
        if (facilityy?.includes("Listrik")) {
          setListrik(true);
        }
        if (facilityy?.includes("Kanopi")) {
          setKanopi(true);
        }
      }
    }
  }, [detail]);

  useEffect(() => {
    if (success) {
      setFoto1(null);
      setFoto2(null);
      setReset(true);
      setDisabledInformasi(false);
      setDisabledKTP(false);
      setIrigasi(false);
      setPeralatan(false);
      setListrik(false);
      setKanopi(false);
      gallery.current.setFiles([]);
      formikRef.current.resetForm();
      if (edit) {
        navigate("/my-land");
      }
    }
  }, [success]);

  useEffect(() => {
    if (!edit) {
      if (map.current) return; // initialize map only once
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [position.coords.longitude, position.coords.latitude],
            zoom: zoom,
          });
          marker.current = new mapboxgl.Marker({ draggable: true, color: "red" })
            .setLngLat([position.coords.longitude, position.coords.latitude])
            .addTo(map.current);
          map.current.addControl(
            (geocoder.current = new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              marker: {
                color: "red",
                draggable: true,
              },
              mapboxgl: mapboxgl,
            }))
          );

          geocoder.current.on("result", (event) => {
            geocoder.current.clear();
            marker.current.remove();
            marker.current = new mapboxgl.Marker({ draggable: true, color: "red" }).setLngLat(event.result.center).addTo(map.current);
          });
          marker.current.on("dragend", (event) => {
            const lngLat = marker.current._lngLat;
            const { lng, lat } = marker.current._lngLat;
            setLat(lat);
            setLng(lng);
          });
        });
      }
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });
      marker.current = new mapboxgl.Marker({ draggable: true, color: "red" }).setLngLat([lng, lat]).addTo(map.current);
      map.current.addControl(
        (geocoder.current = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          marker: {
            color: "red",
            draggable: true,
          },
          mapboxgl: mapboxgl,
        }))
      );

      geocoder.current.on("result", (event) => {
        geocoder.current.clear();
        marker.current.remove();
        marker.current = new mapboxgl.Marker({ draggable: true, color: "red" }).setLngLat(event.result.center).addTo(map.current);
      });
    } else {
      if (map.current) return; // initialize map only once
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [
              detail?.LONG_LAND < -120 && detail?.LONG_LAND > 120 ? detail?.LONG_LAND : 0,
              detail?.LAT_LAND < -90 && detail?.LAT_LAND > 90 ? detail?.LAT_LAND : 0,
            ],
            zoom: zoom,
          });
          marker.current = new mapboxgl.Marker({ draggable: true, color: "red" })
            .setLngLat([
              detail?.LONG_LAND < -120 && detail?.LONG_LAND > 120 ? detail?.LONG_LAND : 0,
              detail?.LAT_LAND < -90 && detail?.LAT_LAND > 90 ? detail?.LAT_LAND : 0,
            ])
            .addTo(map.current);
          map.current.addControl(
            (geocoder.current = new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              marker: {
                color: "red",
                draggable: true,
              },
              mapboxgl: mapboxgl,
            }))
          );

          geocoder.current.on("result", (event) => {
            geocoder.current.clear();
            marker.current.remove();
            marker.current = new mapboxgl.Marker({ draggable: true, color: "red" }).setLngLat(event.result.center).addTo(map.current);
          });
          marker.current.on("dragend", (event) => {
            const lngLat = marker.current._lngLat;
            const { lng, lat } = marker.current._lngLat;
            setLat(lat);
            setLng(lng);
          });
        });
      }
    }
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on("click", (event) => {
      var coordinates = event.lngLat;
      marker.current.setLngLat(coordinates).addTo(map.current);
    });
  });

  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate replace to="/land" />;
  }

  return (
    <>
      <Title text={"Tandur | Sewakan Lahan"} />
      <Main header={false} footer={true}>
        <div className="flex flex-col items-center justify-evenly w-full bg-gray-100">
          <div className="flex w-full lg:w-5/6 items-center flex-row bg-white pt-16 pb-10">
            <div className="px-4 lg:px-20 pt-6 w-full font-poppins">
              <div className="font-poppinsSemibold text-2xl ml-3 mt-5">Sewakan Lahan</div>
              <div className="border-t-gray-300 border-2 w-full my-4"></div>
              {edit ? (
                detail && (
                  <Formik
                    innerRef={formikRef}
                    validationSchema={landValidationSchema}
                    initialValues={{
                      name: detail?.NAME_LAND,
                      address: detail?.ADDRESS_LAND,
                      province: detail?.ID_PROVINCE,
                      city: detail?.ID_CITY,
                      district: detail?.ID_DISTRICT,
                      location: detail?.LOCATION_LAND,
                      noCertificate: detail?.NOCERTIFICATE_LAND,
                      ownname_land: detail?.OWNNAME_LAND,
                      ownktp: detail?.OWNKTP_LAND,
                      desc: detail?.DESC_LAND,
                      width: detail?.WIDTH_LAND,
                      length: detail?.LENGTH_LAND,
                      rule: detail?.RULE_LAND,
                      price: edit ? currencyFormat(revertCurrency(detail?.PRICE_LAND.toString()), "Rp. 0") : "Rp. 0",
                    }}
                    onSubmit={(values) => {
                      onAdd(values);
                    }}
                  >
                    {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid, setFieldValue }) => (
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 mr-4">
                              <div className="font-poppinsSemibold text-2xl ml-3">Informasi Lahan</div>
                              <div className="font-poppinsSemibold text-lg mt-6 ml-3">Nama lahan</div>
                              <InputText
                                styles={"mt-1"}
                                placeholder={"Nama lahan"}
                                type={"text"}
                                name="name"
                                onChange={handleChange("name")}
                                onBlur={handleBlur("name")}
                                value={values.name}
                                error={errors.name && touched.name && errors.name}
                                message={errors.name}
                              />

                              <div className="font-poppinsSemibold text-lg mt-6 ml-3">Alamat lahan</div>
                              <InputText
                                styles={"mt-1"}
                                placeholder={"Alamat lahan"}
                                type={"text"}
                                name="address"
                                onChange={handleChange("address")}
                                onBlur={handleBlur("address")}
                                value={values.address}
                                error={errors.address && touched.address && errors.address}
                                message={errors.address}
                                disabled={disabledInformasi}
                              />
                              <div className="font-poppinsSemibold text-lg mt-6 ml-4">Provinsi</div>
                              <InputDropdown
                                styles={"mt-1"}
                                placeholder={"Provinsi"}
                                data={dataProvince}
                                name="province"
                                title={"NAME_PROVINCE"}
                                id={"ID_PROVINCE"}
                                onChange={(e) => {
                                  setFieldValue("province", e.target.value);
                                  getDataCity(e.target.value);
                                }}
                                onBlur={handleBlur("province")}
                                value={values.province}
                                error={errors.province && touched.province && errors.province}
                                message={errors.province}
                                disabled={disabledInformasi}
                              />
                              <div className="font-poppinsSemibold text-lg mt-6 ml-4">Kabupaten / Kota</div>
                              <InputDropdown
                                styles={"mt-1"}
                                placeholder={"Kabupaten/Kota"}
                                data={dataCity}
                                disabled={dataCity.length > 0 ? (disabledInformasi ? true : false) : true}
                                name="city"
                                title={"NAME_CITY"}
                                id={"ID_CITY"}
                                onChange={(e) => {
                                  setFieldValue("city", e.target.value);
                                  getDataDistrict(e.target.value);
                                }}
                                onBlur={handleBlur("city")}
                                value={values.city}
                                error={errors.city && touched.city && errors.city}
                                message={errors.city}
                              />
                              <div className="font-poppinsSemibold text-lg mt-6 ml-4">Kecamatan</div>
                              <InputDropdown
                                styles={"mt-1"}
                                placeholder={"Kecamatan"}
                                data={dataDistrict}
                                disabled={dataDistrict.length > 0 ? (disabledInformasi ? true : false) : true}
                                name="district"
                                title={"NAME_DISTRICT"}
                                id={"ID_DISTRICT"}
                                onChange={(e) => {
                                  setFieldValue("district", e.target.value);
                                }}
                                onBlur={handleBlur("district")}
                                value={values.district}
                                error={errors.district && touched.district && errors.district}
                                message={errors.district}
                              />
                              {detail ? (
                                ""
                              ) : (
                                <div className="flex items-center ml-3 mt-4">
                                  <input
                                    id="alamat-checkbox"
                                    type="checkbox"
                                    value=""
                                    checked={disabledInformasi}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFieldValue("address", userData.ADDRESS_USER);
                                        setFieldValue("province", userData.ID_PROVINCE);
                                        getDataCity(userData.ID_PROVINCE);
                                        getDataDistrict(userData.ID_CITY);
                                        setFieldValue("city", userData.ID_CITY);
                                        setFieldValue("district", userData.ID_DISTRICT);
                                        setDisabledInformasi(!disabledInformasi);
                                      } else {
                                        setFieldValue("address", "");
                                        setFieldValue("province", "");
                                        setFieldValue("city", "");
                                        setFieldValue("district", "");
                                        setDisabledInformasi(!disabledInformasi);
                                      }
                                    }}
                                    className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                  />
                                  <label htmlFor="alamat-checkbox" className="ml-2 text-lg font-poppins">
                                    Alamat lahan sama dengan alamat rumah.
                                  </label>
                                </div>
                              )}
                            </div>
                            <div className="w-full md:w-1/2 mt-7 md:mt-0 md:ml-4">
                              <div className="font-poppinsSemibold text-2xl ml-3">Lokasi Lahan</div>
                              <div className="flex items-center mb-4 mt-6 ml-4">
                                <input
                                  checked={values.location == "1"}
                                  id="teras-rumah"
                                  type="radio"
                                  value="1"
                                  onChange={(e) => {
                                    setFieldValue("location", e.target.value);
                                    setFieldValue("noCertificate", "");
                                  }}
                                  name="lokasi-lahan"
                                  className="w-4 h-4 accent-[#69a118] bg-gray-100 border-gray-300 "
                                ></input>
                                <label htmlFor="teras-rumah" className="font-poppinsSemibold text-lg ml-3">
                                  Halaman / Teras Rumah
                                </label>
                              </div>
                              <div className="flex items-center mt-3 ml-4">
                                <input
                                  checked={values.location == "2"}
                                  id="lahan-berbeda"
                                  type="radio"
                                  value="2"
                                  onChange={(e) => {
                                    setFieldValue("location", e.target.value);
                                    setFieldValue("noCertificate", "");
                                  }}
                                  name="lokasi-lahan"
                                  className="w-4 h-4 accent-[#69a118] bg-gray-100 border-gray-300 "
                                ></input>
                                <label htmlFor="lahan-berbeda" className="font-poppinsSemibold text-lg  ml-3">
                                  Lahan Berbeda dari Rumah
                                </label>
                              </div>
                              {values.location == "2" && (
                                <>
                                  <div className="font-poppinsSemibold text-lg mt-6 ml-3">No sertifikat lahan</div>
                                  <InputMaskCustom
                                    styles={"mt-1"}
                                    placeholder={"No Sertifikat lahan"}
                                    type={"number"}
                                    name="noCertificate"
                                    onChange={handleChange("noCertificate")}
                                    onBlur={handleBlur("noCertificate")}
                                    value={values.noCertificate}
                                    error={errors.noCertificate && touched.noCertificate && errors.noCertificate}
                                    message={errors.noCertificate}
                                    mask="99.99.99.99.9.99999"
                                    maskChar={null}
                                  />
                                </>
                              )}
                              <div className="flex flex-row space-x-6 w-50 mt-4 font-poppins">
                                <div className="flex flex-col w-full mt-5">
                                  <InputImage setValue={setFoto1} setData={setDataFoto1} reset={reset} setReset={setReset} img={detail && foto1} />
                                  <div className="mb-3 text-center mt-2 font-poppins text-lg">
                                    {values.location == "1" ? "Foto Rumah Anda" : "Foto Sertifikat Tanah"}{" "}
                                  </div>
                                </div>
                                <div className="flex flex-col w-full mt-5">
                                  <InputImage setValue={setFoto2} setData={setDataFoto2} reset={reset} setReset={setReset} img={detail && foto2} />
                                  <div className="mb-3 text-center mt-2 font-poppins text-lg">
                                    {values.location == "1" ? "Foto Halaman Rumah Anda" : "Foto Lahan Anda"}
                                  </div>
                                </div>
                              </div>
                              <div className="font-poppinsSemibold text-2xl ml-3 mt-4">Data Pemilik Lahan</div>
                              <div className="font-poppinsSemibold text-lg mt-6 ml-3">Nama Pemilik Sesuai KTP</div>
                              <InputText
                                styles={"mt-1"}
                                placeholder={"Nama Pemilik Sesuai KTP"}
                                type={"text"}
                                name="ownname_land"
                                onChange={handleChange("ownname_land")}
                                onBlur={handleBlur("ownname_land")}
                                value={values.ownname_land}
                                error={errors.ownname_land && touched.ownname_land && errors.ownname_land}
                                message={errors.ownname_land}
                                disabled={disabledKtp}
                              />
                              <div className="font-poppinsSemibold text-lg mt-6 ml-3">No KTP</div>
                              <InputText
                                styles={"mt-1"}
                                placeholder={"No KTP"}
                                type={"text"}
                                name="ownktp"
                                onChange={handleChange("ownktp")}
                                onBlur={handleBlur("ownktp")}
                                value={values.ownktp}
                                error={errors.ownktp && touched.ownktp && errors.ownktp}
                                message={errors.ownktp}
                                disabled={disabledKtp}
                              />
                              {detail ? (
                                ""
                              ) : (
                                <div className="flex items-center ml-3 mt-4">
                                  <input
                                    id="checked-checkbox"
                                    type="checkbox"
                                    value=""
                                    checked={disabledKtp}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFieldValue("ownname_land", userData.NAME_USER);
                                        setFieldValue("ownktp", userData.KTP_USER);
                                        setDisabledKTP(!disabledKtp);
                                      } else {
                                        setFieldValue("ownname_land", "");
                                        setFieldValue("ownktp", "");
                                        setDisabledKTP(!disabledKtp);
                                      }
                                    }}
                                    className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                  />
                                  <label htmlFor="checked-checkbox" className="ml-2 text-lg font-poppins">
                                    Samakan dengan KTP saya.
                                  </label>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="border-t-2 border-gray-400 my-12"></div>
                          <div className="font-poppinsSemibold text-2xl ml-3">Detail Lahan</div>
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 mr-4">
                              <div className="font-poppinsSemibold text-lg mt-6 ml-3">Harga Sewa Lahan</div>
                              <InputCurrency
                                type={"text"}
                                styles={"mt-1"}
                                placeholder={"Harga sewa lahan"}
                                onChange={handleChange("price")}
                                onBlur={handleBlur("price")}
                                value={values.price}
                                error={errors.price && touched.price && errors.price}
                                message={errors.price}
                              />
                              <div className="font-poppinsSemibold text-lg mt-6 ml-3">Ukuran Lahan</div>
                              <div className="relative ml-3">
                                <input
                                  type={"number"}
                                  placeholder={""}
                                  value={values.width}
                                  onChange={handleChange("width")}
                                  onBlur={handleBlur("width")}
                                  onInput={(e) => {
                                    if (e.target.value.length > e.target.maxLength) e.target.value = e.target.value.slice(0, e.target.maxLength);
                                  }}
                                  maxLength={"4"}
                                  className={`mt-5 w-20 px-3 py-3 text-lg border-2 rounded-lg placeholder-slate-400
                            focus:outline-none  focus:ring-tandur
                            disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                            ${
                              errors.width && touched.width && errors.width
                                ? "focus:border-pink-500 border-pink-500"
                                : "focus:border-tandur border-slate-400"
                            }`}
                                />
                                <span className="text-2xl mx-4">x</span>
                                <input
                                  type={"number"}
                                  placeholder={""}
                                  value={values.length}
                                  onChange={handleChange("length")}
                                  onBlur={handleBlur("length")}
                                  onInput={(e) => {
                                    if (e.target.value.length > e.target.maxLength) e.target.value = e.target.value.slice(0, e.target.maxLength);
                                  }}
                                  maxLength={"4"}
                                  className={`mt-5 w-20 px-3 py-3 text-lg border-2 rounded-lg placeholder-slate-400
                            focus:outline-none  focus:ring-tandur
                            disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                            ${
                              errors.length && touched.length && errors.length
                                ? "focus:border-pink-500 border-pink-500"
                                : "focus:border-tandur border-slate-400"
                            }`}
                                />
                                {errors.width && touched.width && errors.width && errors.length && touched.length && errors.length ? (
                                  <p className="text-pink-500 pt-2 pl-2">Panjang dan lebar harus ada</p>
                                ) : errors.width && touched.width && errors.width ? (
                                  <p className="text-pink-500 pt-2 pl-2">{errors.width}</p>
                                ) : (
                                  errors.length && touched.length && errors.length && <p className="text-pink-500 pt-2 pl-2">{errors.length}</p>
                                )}

                                <div className="font-poppinsSemibold text-lg mt-6">Fasilitas Lahan</div>
                                <div className=" w-full flex flex-row">
                                  <div className="w-1/2  flex flex-col">
                                    <div className="flex items-center ml-3 mt-4">
                                      <input
                                        id="irigasi-checkbox"
                                        type="checkbox"
                                        value=""
                                        checked={irigasi}
                                        onChange={(e) => {
                                          setIrigasi(e.target.checked);
                                        }}
                                        className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                      />
                                      <label htmlFor="irigasi-checkbox" className="ml-2 text-lg font-poppins">
                                        Irigasi
                                      </label>
                                    </div>
                                    <div className="flex items-center ml-3 mt-4">
                                      <input
                                        id="peralatan-checkbox"
                                        type="checkbox"
                                        value=""
                                        checked={peralatan}
                                        onChange={(e) => {
                                          setPeralatan(e.target.checked);
                                        }}
                                        className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                      />
                                      <label htmlFor="peralatan-checkbox" className="ml-2 text-lg font-poppins">
                                        Peralatan
                                      </label>
                                    </div>
                                  </div>
                                  <div className="w-1/2 flex flex-col">
                                    <div className="flex items-center ml-3 mt-4">
                                      <input
                                        id="listrik-checkbox"
                                        type="checkbox"
                                        value=""
                                        checked={listrik}
                                        onChange={(e) => {
                                          setListrik(e.target.checked);
                                        }}
                                        className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                      />
                                      <label htmlFor="listrik-checkbox" className="ml-2 text-lg font-poppins">
                                        Listrik
                                      </label>
                                    </div>
                                    <div className="flex items-center ml-3 mt-4">
                                      <input
                                        id="kanopi-checkbox"
                                        type="checkbox"
                                        value=""
                                        checked={kanopi}
                                        onChange={(e) => {
                                          setKanopi(e.target.checked);
                                        }}
                                        className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                      />
                                      <label htmlFor="kanopi-checkbox" className="ml-2 text-lg font-poppins">
                                        Kanopi
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="font-poppinsSemibold text-lg mt-6">Foto Lahan</div>
                                <div className="flex flex-col w-full mt-3">
                                  <InputMultipleImg
                                    inputType={"multiple"}
                                    maxFiles={5}
                                    label={""}
                                    name={"gallery"}
                                    ref={gallery}
                                    setFilesGallery={setFileGallery}
                                    labelStyles="!mt-5"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="w-full md:w-1/2 ml-3">
                              <div className="font-poppinsSemibold text-lg mt-6">Deskripsi Lahan</div>
                              <textarea
                                value={values.desc}
                                onChange={handleChange("desc")}
                                onBlur={handleBlur("desc")}
                                rows="4"
                                className={`mt-5 w-full px-3 py-3 text-lg border-2 rounded-lg placeholder-slate-400
                            focus:outline-none  focus:ring-tandur
                            disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                            ${
                              errors.desc && touched.desc && errors.desc
                                ? "focus:border-pink-500 border-pink-500"
                                : "focus:border-tandur border-slate-400"
                            }`}
                                placeholder="Deskripsi lahan"
                              ></textarea>
                              {errors.desc && touched.desc && errors.desc && <p className="text-pink-500 pt-2 pl-2">{errors.desc}</p>}

                              <div className="font-poppinsSemibold text-lg mt-6 ml-0 md:ml-3">Aturan Lahan</div>
                              <textarea
                                value={values.rule}
                                onChange={handleChange("rule")}
                                onBlur={handleBlur("rule")}
                                rows="4"
                                className={`mt-5 w-full px-3 py-3 text-lg border-2 rounded-lg placeholder-slate-400
                            focus:outline-none  focus:ring-tandur
                            disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                            ${
                              errors.rule && touched.rule && errors.rule
                                ? "focus:border-pink-500 border-pink-500"
                                : "focus:border-tandur border-slate-400"
                            }`}
                                placeholder="Aturan lahan"
                              ></textarea>
                              {errors.rule && touched.rule && errors.rule && <p className="ml-3 text-pink-500 pt-2 pl-2">{errors.rule}</p>}
                            </div>
                          </div>
                          <div className="overflow-hidden p-3">
                            <div className="font-poppinsSemibold text-lg mt-6 mb-4 ml-3">Lokasi Lahan</div>
                            <div ref={mapContainer} className="map-container w-full h-[100vh] m-3" />
                          </div>
                          <CommonButton
                            type="submit"
                            title={detail ? "Ubah" : "Tambah"}
                            disabled={
                              !errors.name &&
                              !errors.address &&
                              !errors.province &&
                              !errors.city &&
                              !errors.district &&
                              !errors.location &&
                              !errors.desc &&
                              !errors.width &&
                              !errors.length &&
                              !errors.rule &&
                              !errors.price &&
                              foto1 !== null &&
                              foto2 !== null
                            }
                          />
                        </div>
                      </form>
                    )}
                  </Formik>
                )
              ) : (
                <Formik
                  innerRef={formikRef}
                  validationSchema={landValidationSchema}
                  initialValues={{
                    name: "",
                    address: "",
                    province: "",
                    city: "",
                    district: "",
                    location: "1",
                    noCertificate: "",
                    ownname_land: "",
                    ownktp: "",
                    desc: "",
                    width: "",
                    length: "",
                    rule: "",
                    price: "Rp. 0",
                  }}
                  onSubmit={(values) => {
                    onAdd(values);
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/2 mr-4">
                            <div className="font-poppinsSemibold text-2xl ml-3">Informasi Lahan</div>
                            <div className="font-poppinsSemibold text-lg mt-6 ml-3">Nama lahan</div>
                            <InputText
                              styles={"mt-1"}
                              placeholder={"Nama lahan"}
                              type={"text"}
                              name="name"
                              onChange={handleChange("name")}
                              onBlur={handleBlur("name")}
                              value={values.name}
                              error={errors.name && touched.name && errors.name}
                              message={errors.name}
                            />

                            <div className="font-poppinsSemibold text-lg mt-6 ml-3">Alamat lahan</div>
                            <InputText
                              styles={"mt-1"}
                              placeholder={"Alamat lahan"}
                              type={"text"}
                              name="address"
                              onChange={handleChange("address")}
                              onBlur={handleBlur("address")}
                              value={values.address}
                              error={errors.address && touched.address && errors.address}
                              message={errors.address}
                              disabled={disabledInformasi}
                            />
                            <div className="font-poppinsSemibold text-lg mt-6 ml-4">Provinsi</div>
                            <InputDropdown
                              styles={"mt-1"}
                              placeholder={"Provinsi"}
                              data={dataProvince}
                              name="province"
                              title={"NAME_PROVINCE"}
                              id={"ID_PROVINCE"}
                              onChange={(e) => {
                                setFieldValue("province", e.target.value);
                                getDataCity(e.target.value);
                              }}
                              onBlur={handleBlur("province")}
                              value={values.province}
                              error={errors.province && touched.province && errors.province}
                              message={errors.province}
                              disabled={disabledInformasi}
                            />
                            <div className="font-poppinsSemibold text-lg mt-6 ml-4">Kabupaten / Kota</div>
                            <InputDropdown
                              styles={"mt-1"}
                              placeholder={"Kabupaten/Kota"}
                              data={dataCity}
                              disabled={dataCity.length > 0 ? (disabledInformasi ? true : false) : true}
                              name="city"
                              title={"NAME_CITY"}
                              id={"ID_CITY"}
                              onChange={(e) => {
                                setFieldValue("city", e.target.value);
                                getDataDistrict(e.target.value);
                              }}
                              onBlur={handleBlur("city")}
                              value={values.city}
                              error={errors.city && touched.city && errors.city}
                              message={errors.city}
                            />
                            <div className="font-poppinsSemibold text-lg mt-6 ml-4">Kecamatan</div>
                            <InputDropdown
                              styles={"mt-1"}
                              placeholder={"Kecamatan"}
                              data={dataDistrict}
                              disabled={dataDistrict.length > 0 ? (disabledInformasi ? true : false) : true}
                              name="district"
                              title={"NAME_DISTRICT"}
                              id={"ID_DISTRICT"}
                              onChange={(e) => {
                                setFieldValue("district", e.target.value);
                              }}
                              onBlur={handleBlur("district")}
                              value={values.district}
                              error={errors.district && touched.district && errors.district}
                              message={errors.district}
                            />
                            {detail ? (
                              ""
                            ) : (
                              <div className="flex items-center ml-3 mt-4">
                                <input
                                  id="alamat-checkbox"
                                  type="checkbox"
                                  value=""
                                  checked={disabledInformasi}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFieldValue("address", userData.ADDRESS_USER);
                                      setFieldValue("province", userData.ID_PROVINCE);
                                      getDataCity(userData.ID_PROVINCE);
                                      getDataDistrict(userData.ID_CITY);
                                      setFieldValue("city", userData.ID_CITY);
                                      setFieldValue("district", userData.ID_DISTRICT);
                                      setDisabledInformasi(!disabledInformasi);
                                    } else {
                                      setFieldValue("address", "");
                                      setFieldValue("province", "");
                                      setFieldValue("city", "");
                                      setFieldValue("district", "");
                                      setDisabledInformasi(!disabledInformasi);
                                    }
                                  }}
                                  className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                />
                                <label htmlFor="alamat-checkbox" className="ml-2 text-lg font-poppins">
                                  Alamat lahan sama dengan alamat rumah.
                                </label>
                              </div>
                            )}
                          </div>
                          <div className="w-full md:w-1/2 mt-7 md:mt-0 md:ml-4">
                            <div className="font-poppinsSemibold text-2xl ml-3">Lokasi Lahan</div>
                            <div className="flex items-center mb-4 mt-6 ml-4">
                              <input
                                checked={values.location == "1"}
                                id="teras-rumah"
                                type="radio"
                                value="1"
                                onChange={(e) => {
                                  setFieldValue("location", e.target.value);
                                  setFieldValue("noCertificate", "");
                                }}
                                name="lokasi-lahan"
                                className="w-4 h-4 accent-[#69a118] bg-gray-100 border-gray-300 "
                              ></input>
                              <label htmlFor="teras-rumah" className="font-poppinsSemibold text-lg ml-3">
                                Halaman / Teras Rumah
                              </label>
                            </div>
                            <div className="flex items-center mt-3 ml-4">
                              <input
                                checked={values.location == "2"}
                                id="lahan-berbeda"
                                type="radio"
                                value="2"
                                onChange={(e) => {
                                  setFieldValue("location", e.target.value);
                                  setFieldValue("noCertificate", "");
                                }}
                                name="lokasi-lahan"
                                className="w-4 h-4 accent-[#69a118] bg-gray-100 border-gray-300 "
                              ></input>
                              <label htmlFor="lahan-berbeda" className="font-poppinsSemibold text-lg  ml-3">
                                Lahan Berbeda dari Rumah
                              </label>
                            </div>
                            {values.location == "2" && (
                              <>
                                <div className="font-poppinsSemibold text-lg mt-6 ml-3">No sertifikat lahan</div>
                                <InputMaskCustom
                                  styles={"mt-1"}
                                  placeholder={"No Sertifikat lahan"}
                                  type={"number"}
                                  name="noCertificate"
                                  onChange={handleChange("noCertificate")}
                                  onBlur={handleBlur("noCertificate")}
                                  value={values.noCertificate}
                                  error={errors.noCertificate && touched.noCertificate && errors.noCertificate}
                                  message={errors.noCertificate}
                                  mask="99.99.99.99.9.99999"
                                  maskChar={null}
                                />
                              </>
                            )}
                            <div className="flex flex-row space-x-6 w-50 mt-4 font-poppins">
                              <div className="flex flex-col w-full mt-5">
                                <InputImage setValue={setFoto1} setData={setDataFoto1} reset={reset} setReset={setReset} img={detail && foto1} />
                                <div className="mb-3 text-center mt-2 font-poppins text-lg">
                                  {values.location == "1" ? "Foto Rumah Anda" : "Foto Sertifikat Tanah"}{" "}
                                </div>
                              </div>
                              <div className="flex flex-col w-full mt-5">
                                <InputImage setValue={setFoto2} setData={setDataFoto2} reset={reset} setReset={setReset} img={detail && foto2} />
                                <div className="mb-3 text-center mt-2 font-poppins text-lg">
                                  {values.location == "1" ? "Foto Halaman Rumah Anda" : "Foto Lahan Anda"}
                                </div>
                              </div>
                            </div>
                            <div className="font-poppinsSemibold text-2xl ml-3 mt-4">Data Pemilik Lahan</div>
                            <div className="font-poppinsSemibold text-lg mt-6 ml-3">Nama Pemilik Sesuai KTP</div>
                            <InputText
                              styles={"mt-1"}
                              placeholder={"Nama Pemilik Sesuai KTP"}
                              type={"text"}
                              name="ownname_land"
                              onChange={handleChange("ownname_land")}
                              onBlur={handleBlur("ownname_land")}
                              value={values.ownname_land}
                              error={errors.ownname_land && touched.ownname_land && errors.ownname_land}
                              message={errors.ownname_land}
                              disabled={disabledKtp}
                            />
                            <div className="font-poppinsSemibold text-lg mt-6 ml-3">No KTP</div>
                            <InputText
                              styles={"mt-1"}
                              placeholder={"No KTP"}
                              type={"text"}
                              name="ownktp"
                              onChange={handleChange("ownktp")}
                              onBlur={handleBlur("ownktp")}
                              value={values.ownktp}
                              error={errors.ownktp && touched.ownktp && errors.ownktp}
                              message={errors.ownktp}
                              disabled={disabledKtp}
                            />
                            {detail ? (
                              ""
                            ) : (
                              <div className="flex items-center ml-3 mt-4">
                                <input
                                  id="checked-checkbox"
                                  type="checkbox"
                                  value=""
                                  checked={disabledKtp}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFieldValue("ownname_land", userData.NAME_USER);
                                      setFieldValue("ownktp", userData.KTP_USER);
                                      setDisabledKTP(!disabledKtp);
                                    } else {
                                      setFieldValue("ownname_land", "");
                                      setFieldValue("ownktp", "");
                                      setDisabledKTP(!disabledKtp);
                                    }
                                  }}
                                  className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                />
                                <label htmlFor="checked-checkbox" className="ml-2 text-lg font-poppins">
                                  Samakan dengan KTP saya.
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="border-t-2 border-gray-400 my-12"></div>
                        <div className="font-poppinsSemibold text-2xl ml-3">Detail Lahan</div>
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/2 mr-4">
                            <div className="font-poppinsSemibold text-lg mt-6 ml-3">Harga Sewa Lahan</div>
                            <InputCurrency
                              type={"text"}
                              styles={"mt-1"}
                              placeholder={"Harga sewa lahan"}
                              onChange={handleChange("price")}
                              onBlur={handleBlur("price")}
                              value={values.price}
                              error={errors.price && touched.price && errors.price}
                              message={errors.price}
                            />
                            <div className="font-poppinsSemibold text-lg mt-6 ml-3">Ukuran Lahan</div>
                            <div className="relative ml-3">
                              <input
                                type={"number"}
                                placeholder={""}
                                value={values.width}
                                onChange={handleChange("width")}
                                onBlur={handleBlur("width")}
                                onInput={(e) => {
                                  if (e.target.value.length > e.target.maxLength) e.target.value = e.target.value.slice(0, e.target.maxLength);
                                }}
                                maxLength={"4"}
                                className={`mt-5 w-20 px-3 py-3 text-lg border-2 rounded-lg placeholder-slate-400
                              focus:outline-none  focus:ring-tandur
                              disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                              ${
                                errors.width && touched.width && errors.width
                                  ? "focus:border-pink-500 border-pink-500"
                                  : "focus:border-tandur border-slate-400"
                              }`}
                              />
                              <span className="text-2xl mx-4">x</span>
                              <input
                                type={"number"}
                                placeholder={""}
                                value={values.length}
                                onChange={handleChange("length")}
                                onBlur={handleBlur("length")}
                                onInput={(e) => {
                                  if (e.target.value.length > e.target.maxLength) e.target.value = e.target.value.slice(0, e.target.maxLength);
                                }}
                                maxLength={"4"}
                                className={`mt-5 w-20 px-3 py-3 text-lg border-2 rounded-lg placeholder-slate-400
                              focus:outline-none  focus:ring-tandur
                              disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                              ${
                                errors.length && touched.length && errors.length
                                  ? "focus:border-pink-500 border-pink-500"
                                  : "focus:border-tandur border-slate-400"
                              }`}
                              />
                              {errors.width && touched.width && errors.width && errors.length && touched.length && errors.length ? (
                                <p className="text-pink-500 pt-2 pl-2">Panjang dan lebar harus ada</p>
                              ) : errors.width && touched.width && errors.width ? (
                                <p className="text-pink-500 pt-2 pl-2">{errors.width}</p>
                              ) : (
                                errors.length && touched.length && errors.length && <p className="text-pink-500 pt-2 pl-2">{errors.length}</p>
                              )}

                              <div className="font-poppinsSemibold text-lg mt-6">Fasilitas Lahan</div>
                              <div className=" w-full flex flex-row">
                                <div className="w-1/2  flex flex-col">
                                  <div className="flex items-center ml-3 mt-4">
                                    <input
                                      id="irigasi-checkbox"
                                      type="checkbox"
                                      value=""
                                      checked={irigasi}
                                      onChange={(e) => {
                                        setIrigasi(e.target.checked);
                                      }}
                                      className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                    />
                                    <label htmlFor="irigasi-checkbox" className="ml-2 text-lg font-poppins">
                                      Irigasi
                                    </label>
                                  </div>
                                  <div className="flex items-center ml-3 mt-4">
                                    <input
                                      id="peralatan-checkbox"
                                      type="checkbox"
                                      value=""
                                      checked={peralatan}
                                      onChange={(e) => {
                                        setPeralatan(e.target.checked);
                                      }}
                                      className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                    />
                                    <label htmlFor="peralatan-checkbox" className="ml-2 text-lg font-poppins">
                                      Peralatan
                                    </label>
                                  </div>
                                </div>
                                <div className="w-1/2 flex flex-col">
                                  <div className="flex items-center ml-3 mt-4">
                                    <input
                                      id="listrik-checkbox"
                                      type="checkbox"
                                      value=""
                                      checked={listrik}
                                      onChange={(e) => {
                                        setListrik(e.target.checked);
                                      }}
                                      className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                    />
                                    <label htmlFor="listrik-checkbox" className="ml-2 text-lg font-poppins">
                                      Listrik
                                    </label>
                                  </div>
                                  <div className="flex items-center ml-3 mt-4">
                                    <input
                                      id="kanopi-checkbox"
                                      type="checkbox"
                                      value=""
                                      checked={kanopi}
                                      onChange={(e) => {
                                        setKanopi(e.target.checked);
                                      }}
                                      className="w-5 h-5 accent-[#69a118] checked:bg-black border-white bg-gray-100 rounded focus:ring-tandur"
                                    />
                                    <label htmlFor="kanopi-checkbox" className="ml-2 text-lg font-poppins">
                                      Kanopi
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="font-poppinsSemibold text-lg mt-6">Foto Lahan</div>
                              <div className="flex flex-col w-full mt-3">
                                <InputMultipleImg
                                  inputType={"multiple"}
                                  maxFiles={5}
                                  label={""}
                                  name={"gallery"}
                                  ref={gallery}
                                  setFilesGallery={setFileGallery}
                                  labelStyles="!mt-5"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-1/2 ml-3">
                            <div className="font-poppinsSemibold text-lg mt-6">Deskripsi Lahan</div>
                            <textarea
                              value={values.desc}
                              onChange={handleChange("desc")}
                              onBlur={handleBlur("desc")}
                              rows="4"
                              className={`mt-5 w-full px-3 py-3 text-lg border-2 rounded-lg placeholder-slate-400
                              focus:outline-none  focus:ring-tandur
                              disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                              ${
                                errors.desc && touched.desc && errors.desc
                                  ? "focus:border-pink-500 border-pink-500"
                                  : "focus:border-tandur border-slate-400"
                              }`}
                              placeholder="Deskripsi lahan"
                            ></textarea>
                            {errors.desc && touched.desc && errors.desc && <p className="text-pink-500 pt-2 pl-2">{errors.desc}</p>}

                            <div className="font-poppinsSemibold text-lg mt-6 ml-0 md:ml-3">Aturan Lahan</div>
                            <textarea
                              value={values.rule}
                              onChange={handleChange("rule")}
                              onBlur={handleBlur("rule")}
                              rows="4"
                              className={`mt-5 w-full px-3 py-3 text-lg border-2 rounded-lg placeholder-slate-400
                              focus:outline-none  focus:ring-tandur
                              disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                              ${
                                errors.rule && touched.rule && errors.rule
                                  ? "focus:border-pink-500 border-pink-500"
                                  : "focus:border-tandur border-slate-400"
                              }`}
                              placeholder="Aturan lahan"
                            ></textarea>
                            {errors.rule && touched.rule && errors.rule && <p className="ml-3 text-pink-500 pt-2 pl-2">{errors.rule}</p>}
                          </div>
                        </div>
                        <div className="overflow-hidden p-3">
                          <div className="font-poppinsSemibold text-lg mt-6 mb-4 ml-3">Lokasi Lahan</div>
                          <div ref={mapContainer} className="map-container w-full h-[100vh] m-3" />
                        </div>
                        <CommonButton
                          type="submit"
                          title={detail ? "Ubah" : "Tambah"}
                          disabled={
                            !errors.name &&
                            !errors.address &&
                            !errors.province &&
                            !errors.city &&
                            !errors.district &&
                            !errors.location &&
                            !errors.desc &&
                            !errors.width &&
                            !errors.length &&
                            !errors.rule &&
                            !errors.price &&
                            foto1 !== null &&
                            foto2 !== null
                          }
                        />
                      </div>
                    </form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
      <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
      <SuccessModal error={success} data={success} onClose={() => dispatch(resetSuccess())} styles={"z-[1300]"} />
    </>
  );
}

export default AddUrbanFarming;
