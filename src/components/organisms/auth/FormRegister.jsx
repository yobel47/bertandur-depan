import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCity, getDistrict, getProvince } from "../../../service/Api";
import { registerValidationSchema } from "../../../utils/validation/validationSchema";
import { CommonButton, InputDropdown, InputText, InputPassword, InputImage, LoadingModal, AlertModal, InputMaskCustom } from "../../atoms";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/actions";
import { resetError, resetSuccess } from "../../../redux/slice/authSlice";

const FormRegister = () => {
  const navigate = useNavigate();
  const [dataProvince, setDataProvince] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataForm1, setdataForm1] = useState([]);
  const [ktp, setKtp] = useState(null);
  const [img, setImg] = useState(null);
  const [dataImg, setDataImg] = useState(null);
  const [dataKtp, setDataKtp] = useState(null);
  const [dataSelfieKtp, setDataSelfieKtp] = useState(null);
  const [selfieKtp, setSelfieKtp] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [reset, setReset] = useState(false);

  const { status, success, error } = useSelector((state) => state.auth);

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

  const onNext = () => {
    setFormVisible(!formVisible);
  };

  useEffect(() => {
    getDataProvince();
  }, []);

  const onRegister = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("id_district", dataForm1.kecamatan);
    formdata.append("id_city", dataForm1.kabupaten);
    formdata.append("id_province", dataForm1.provinsi);
    formdata.append("email", dataForm1.email);
    formdata.append("ktp", dataForm1.noKtp);
    formdata.append("name", dataForm1.nama);
    formdata.append("password", dataForm1.password);
    formdata.append("telp", dataForm1.noTelp.replace(/[^0-9 ]/g, ""));
    formdata.append("address", dataForm1.alamat);
    formdata.append("img_user", dataImg);
    formdata.append("img_ktp", dataKtp);
    formdata.append("img_ktp_selfie", dataSelfieKtp);
    dispatch(registerUser(formdata));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate("verifikasi", { state: { dataForm1 } });
    }
  }, [success]);

  return (
    <>
      <div className="w-full flex justify-center mx-auto lg:max-w-7xl flex-grow my-16 ">
        <div className="flex flex-col self-center w-9/12">
          <Formik
            validationSchema={registerValidationSchema}
            initialValues={{ email: "", password: "", nama: "", noTelp: "", alamat: "", provinsi: "", kabupaten: "", kecamatan: "", noKtp: "" }}
            onSubmit={(values) => {
              setdataForm1(values);
              onNext();
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <div className={`${formVisible ? "visible" : "hidden"} mt-16`}>
                  <span className="font-poppinsSemibold text-3xl">Daftar</span>
                  <InputText
                    placeholder={"Email"}
                    type={"email"}
                    name="email"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    error={errors.email && touched.email && errors.email}
                    message={errors.email}
                  />
                  <InputPassword
                    placeholder={"Password"}
                    name="password"
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    error={errors.password && touched.password && errors.password}
                    message={errors.password}
                  />
                  <InputText
                    placeholder={"Nama Lengkap"}
                    type={"text"}
                    name="nama"
                    onChange={handleChange("nama")}
                    onBlur={handleBlur("nama")}
                    value={values.nama}
                    error={errors.nama && touched.nama && errors.nama}
                    message={errors.nama}
                  />
                  <InputMaskCustom
                    placeholder={"No KTP"}
                    type={"number"}
                    name="noKtp"
                    onChange={handleChange("noKtp")}
                    onBlur={handleBlur("noKtp")}
                    value={values.noKtp}
                    error={errors.noKtp && touched.noKtp && errors.noKtp}
                    message={errors.noKtp}
                    mask="9999999999999999"
                    maskChar={null}
                  />
                  <InputMaskCustom
                    placeholder={"No Telp"}
                    type={"number"}
                    name="noTelp"
                    onChange={handleChange("noTelp")}
                    onBlur={handleBlur("noTelp")}
                    value={values.noTelp}
                    error={errors.noTelp && touched.noTelp && errors.noTelp}
                    message={errors.noTelp}
                    mask="0899-9999-99999"
                    maskChar={null}
                  />
                  <InputText
                    placeholder={"Alamat"}
                    type={"text"}
                    name="alamat"
                    onChange={handleChange("alamat")}
                    onBlur={handleBlur("alamat")}
                    value={values.alamat}
                    error={errors.alamat && touched.alamat && errors.alamat}
                    message={errors.alamat}
                  />
                  <InputDropdown
                    placeholder={"Provinsi"}
                    data={dataProvince}
                    name="provinsi"
                    title={"NAME_PROVINCE"}
                    id={"ID_PROVINCE"}
                    onChange={(e) => {
                      setFieldValue("provinsi", e.target.value);
                      getDataCity(e.target.value);
                    }}
                    onBlur={handleBlur("provinsi")}
                    value={values.provinsi}
                    error={errors.provinsi && touched.provinsi && errors.provinsi}
                    message={errors.provinsi}
                  />
                  <InputDropdown
                    placeholder={"Kabupaten/Kota"}
                    data={dataCity}
                    disabled={dataCity.length > 0 ? false : true}
                    name="kabupaten"
                    title={"NAME_CITY"}
                    id={"ID_CITY"}
                    onChange={(e) => {
                      setFieldValue("kabupaten", e.target.value);
                      getDataDistrict(e.target.value);
                    }}
                    onBlur={handleBlur("kabupaten")}
                    value={values.kabupaten}
                    error={errors.kabupaten && touched.kabupaten && errors.kabupaten}
                    message={errors.kabupaten}
                  />
                  <InputDropdown
                    placeholder={"Kecamatan"}
                    data={dataDistrict}
                    disabled={dataDistrict.length > 0 ? false : true}
                    name="kecamatan"
                    title={"NAME_DISTRICT"}
                    id={"ID_DISTRICT"}
                    onChange={(e) => {
                      setFieldValue("kecamatan", e.target.value);
                    }}
                    onBlur={handleBlur("kecamatan")}
                    value={values.kecamatan}
                    error={errors.kecamatan && touched.kecamatan && errors.kecamatan}
                    message={errors.kecamatan}
                  />
                  <CommonButton
                    type="submit"
                    title="Selanjutnya"
                    disabled={
                      !errors.email &&
                      !errors.password &&
                      !errors.nama &&
                      !errors.noTelp &&
                      !errors.alamat &&
                      !errors.provinsi &&
                      !errors.kabupaten &&
                      !errors.kecamatan
                    }
                  />
                </div>
              </form>
            )}
          </Formik>
          <form onSubmit={onRegister}>
            <div className={`${formVisible ? "hidden" : "visible"} mt-16`}>
              <button type="button" className="font-poppinsSemibold text-3xl" onClick={onNext}>
                <BsArrowLeftCircle />
              </button>
              <div className="flex flex-col w-full mt-5">
                <div className="mb-3">Upload Foto Profil Anda</div>
                <InputImage setData={setDataImg} reset={reset} setReset={setReset} setValue={setImg} img={img} />
              </div>
              <div className="flex flex-col justify-center border-t-2 border-t-gray-300 my-5 w-full self-center" />
              <div className="flex flex-col w-full mt-5">
                <div className="mb-3">Upload Scan / Foto KTP Anda</div>
                <InputImage setValue={setKtp} setData={setDataKtp} img={ktp} reset={reset} setReset={setReset} />
              </div>
              <div className="flex flex-col justify-center border-t-2 border-t-gray-300 my-5 w-full self-center" />
              <div className="flex flex-col w-full mt-5">
                <div className="mb-3">Upload Foto Selfie Anda dengan KTP</div>
                <InputImage setValue={setSelfieKtp} setData={setDataSelfieKtp} img={selfieKtp} reset={reset} setReset={setReset} />
              </div>
              <CommonButton type="submit" customStyle={"mb-8"} title="Daftar" disabled={true} />
              {/* <CommonButton type="submit" title="Lain kali" customStyle={"my-0 mb-8"} theme="secondary" disabled={true} /> */}
            </div>
          </form>
          <div className="flex flex-col justify-center border-t-2 pt-4 border-t-black  w-3/4 self-center">
            <span className="font-poppinsMedium text-center w-100 ">Sudah punya akun?</span>
            <span className="font-poppinsBold text-center w-100">
              <Link to={"../masuk"}>Masuk</Link>
            </span>
          </div>
        </div>
      </div>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
      <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
    </>
  );
};

export default FormRegister;
