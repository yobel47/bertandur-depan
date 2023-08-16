import { Formik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { landValidationSchema } from "../../../utils/validation/validationSchema";
import CommonButton from "../../../components/atoms/commonButton";
import InputText from "../../../components/atoms/inputText";
import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AlertModal, InputCurrency, InputDropdown, InputImage, LoadingModal, InputMaskCustom, SuccessModal } from "../../../components";
import { addLands, loadLandDetail, updateLands } from "../../../redux/actions";
import { getProvince, getCity, getDistrict } from "../../../service/Api";
import jwt from "jwt-decode";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify";
import { currencyFormat, revertCurrency } from "../../../utils/currencyFormat";
import { resetSuccess, resetError } from "../../../redux/slice/landSlice";

const AddLand = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const updateData = location.state ? location.state.values : null;
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
  const [gallery, setGallery] = useState(false);
  const [dataGallery, setDataGallery] = useState(false);
  const formikRef = useRef();

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
    formdata.append("longtitude", 1111111);
    formdata.append("latitude", 222222);
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
    formdata.append("gallery_1", dataGallery);
    if (updateData) {
      formdata.append("rating", updateData.RATING_LAND);
      formdata.append("id_land", updateData.ID_LAND);
      dispatch(updateLands(formdata));
    } else {
      formdata.append("rating", "5.0");
      dispatch(addLands(formdata));
    }
  };

  useEffect(() => {
    getDataProvince();
    const user = jwt(localStorage.getItem("userToken"));
    setUserData(user);
    if (updateData) {
      dispatch(loadLandDetail(updateData.ID_LAND));
      getDataCity(updateData.ID_PROVINCE);
      getDataDistrict(updateData.ID_CITY);
      setFoto1(updateData.DOC_LAND[0]);
      setFoto2(updateData.DOC_LAND[1]);
      setGallery(updateData.GALLERY_LAND[0]);
      const facilityy = updateData.FACILITY_LAND.replace(/;/g, ", ");
      if (facilityy.includes("Irigasi")) {
        setIrigasi(true);
      }
      if (facilityy.includes("Peralatan")) {
        setPeralatan(true);
      }
      if (facilityy.includes("Listrik")) {
        setListrik(true);
      }
      if (facilityy.includes("Kanopi")) {
        setKanopi(true);
      }
    }
  }, []);

  useEffect(() => {
    if (success) {
      setFoto1(null);
      setFoto2(null);
      setGallery(null);
      setReset(true);
      setDisabledInformasi(false);
      setDisabledKTP(false);
      setIrigasi(false);
      setPeralatan(false);
      setListrik(false);
      setKanopi(false);
      formikRef.current.resetForm();
    }
    if (success && updateData) {
      navigate("/admin/land");
    }
  }, [success]);

  return (
    <>
      <Helmet>
        <title> Lahan | Tandur Admin </title>
      </Helmet>
      <div className="font-poppins">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="" mb={3}>
            <IconButton size="large" color="inherit" onClick={() => navigate("/admin/land")}>
              <Iconify icon={"mdi:arrow-left"} />
            </IconButton>
            <Typography variant="h4" gutterBottom className="mt-[8px] font-poppinsSemibold font-bold" ml={2}>
              Lahan
            </Typography>
          </Stack>

          <Card className="px-8 pt-6">
            <Formik
              innerRef={formikRef}
              validationSchema={landValidationSchema}
              initialValues={{
                name: updateData ? updateData.NAME_LAND : "",
                address: updateData ? detail?.ADDRESS_LAND : "",
                province: updateData ? updateData.PROVINCE_LAND : "",
                city: updateData ? updateData.CITY_LAND : "",
                district: updateData ? updateData.DISTRICT_LAND : "",
                location: updateData ? updateData.LOCATION_LAND : "1",
                noCertificate: updateData ? updateData.NOCERTIFICATE_LAND : "",
                ownname_land: updateData ? detail?.OWNNAME_LAND : "",
                ownktp: updateData ? updateData.OWNKTP_LAND : "",
                desc: updateData ? updateData.DESC_LAND : "",
                width: updateData ? updateData.WIDTH_LAND : "",
                length: updateData ? updateData.LENGTH_LAND : "",
                rule: updateData ? detail?.RULE_LAND : "",
                price: updateData ? currencyFormat(revertCurrency(updateData.PRICE_LAND.toString()), "Rp. 0") : "Rp. 0",
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
                        <div className="font-poppinsSemibold text-md mt-6 ml-3">Nama lahan</div>
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

                        <div className="font-poppinsSemibold text-md mt-6 ml-3">Alamat lahan</div>
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
                        <div className="font-poppinsSemibold text-md mt-6 ml-4">Provinsi</div>
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
                        <div className="font-poppinsSemibold text-md mt-6 ml-4">Kabupaten / Kota</div>
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
                        <div className="font-poppinsSemibold text-md mt-6 ml-4">Kecamatan</div>
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
                        {updateData ? (
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
                            <label htmlFor="alamat-checkbox" className="ml-2 text-md font-poppins">
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
                            }}
                            name="lokasi-lahan"
                            className="w-4 h-4 accent-[#69a118] bg-gray-100 border-gray-300 "
                          ></input>
                          <label htmlFor="teras-rumah" className="font-poppinsSemibold text-md ml-3">
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
                            }}
                            name="lokasi-lahan"
                            className="w-4 h-4 accent-[#69a118] bg-gray-100 border-gray-300 "
                          ></input>
                          <label htmlFor="lahan-berbeda" className="font-poppinsSemibold text-md  ml-3">
                            Lahan Berbeda dari Rumah
                          </label>
                        </div>
                        {values.location == "2" && (
                          <>
                            <div className="font-poppinsSemibold text-md mt-6 ml-3">No sertifikat lahan</div>
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
                            <InputImage setValue={setFoto1} setData={setDataFoto1} reset={reset} setReset={setReset} img={updateData && foto1} />
                            <div className="mb-3 text-center mt-2 font-poppins text-md">
                              {values.location == "1" ? "Foto Rumah Anda" : "Foto Sertifikat Tanah"}{" "}
                            </div>
                          </div>
                          <div className="flex flex-col w-full mt-5">
                            <InputImage setValue={setFoto2} setData={setDataFoto2} reset={reset} setReset={setReset} img={updateData && foto2} />
                            <div className="mb-3 text-center mt-2 font-poppins text-md">
                              {values.location == "1" ? "Foto Halaman Rumah Anda" : "Foto Lahan Anda"}
                            </div>
                          </div>
                        </div>
                        <div className="font-poppinsSemibold text-2xl ml-3 mt-4">Data Pemilik Lahan</div>
                        <div className="font-poppinsSemibold text-md mt-6 ml-3">Nama Pemilik Sesuai KTP</div>
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
                        <div className="font-poppinsSemibold text-md mt-6 ml-3">No KTP</div>
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
                        {updateData ? (
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
                            <label htmlFor="checked-checkbox" className="ml-2 text-md font-poppins">
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
                        <div className="font-poppinsSemibold text-md mt-6 ml-3">Harga Sewa Lahan</div>
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
                        <div className="font-poppinsSemibold text-md mt-6 ml-3">Ukuran Lahan</div>
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
                            className={`mt-5 w-20 px-3 py-3 text-md border-2 rounded-lg placeholder-slate-400
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
                            className={`mt-5 w-20 px-3 py-3 text-md border-2 rounded-lg placeholder-slate-400
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

                          <div className="font-poppinsSemibold text-md mt-6">Fasilitas Lahan</div>
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
                                <label htmlFor="irigasi-checkbox" className="ml-2 text-md font-poppins">
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
                                <label htmlFor="peralatan-checkbox" className="ml-2 text-md font-poppins">
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
                                <label htmlFor="listrik-checkbox" className="ml-2 text-md font-poppins">
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
                                <label htmlFor="kanopi-checkbox" className="ml-2 text-md font-poppins">
                                  Kanopi
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="font-poppinsSemibold text-md mt-6">Foto Lahan</div>
                          <div className="flex flex-col w-full mt-3">
                            <InputImage
                              setValue={setGallery}
                              setData={setDataGallery}
                              reset={reset}
                              setReset={setReset}
                              img={updateData && gallery}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 ml-3">
                        <div className="font-poppinsSemibold text-md mt-6">Deskripsi Lahan</div>
                        <textarea
                          value={values.desc}
                          onChange={handleChange("desc")}
                          onBlur={handleBlur("desc")}
                          rows="4"
                          className={`mt-5 w-full text-sm px-3 py-3 text-md border-2 rounded-lg placeholder-slate-400
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

                        <div className="font-poppinsSemibold text-md mt-6 ml-0 md:ml-3">Aturan Lahan</div>
                        <textarea
                          value={values.rule}
                          onChange={handleChange("rule")}
                          onBlur={handleBlur("rule")}
                          rows="4"
                          className={`mt-5 w-full text-sm px-3 py-3 text-md border-2 rounded-lg placeholder-slate-400
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
                    <CommonButton
                      type="submit"
                      title={updateData ? "Ubah" : "Tambah"}
                      disabled={
                        !errors.name &&
                        !errors.address &&
                        !errors.province &&
                        !errors.city &&
                        !errors.district &&
                        !errors.location &&
                        !errors.noCertificate &&
                        !errors.desc &&
                        !errors.width &&
                        !errors.length &&
                        !errors.rule &&
                        !errors.price &&
                        foto1 !== null &&
                        foto2 !== null &&
                        gallery !== null
                      }
                    />
                  </div>
                </form>
              )}
            </Formik>
          </Card>
        </Container>
      </div>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
      <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
      <SuccessModal error={success} data={success} onClose={() => dispatch(resetSuccess())} styles={"z-[1300]"} />
    </>
  );
};

export default AddLand;
