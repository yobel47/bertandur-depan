import { Formik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCity, getDistrict, getProvince } from "../../../service/Api";
import { registerValidationSchema, updateUserValidationSchema } from "../../../utils/validation/validationSchema";
import CommonButton from "../../../components/atoms/commonButton";
import InputDropdown from "../../../components/atoms/inputDropdown";
import InputText from "../../../components/atoms/inputText";
import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import InputPassword from "../../../components/atoms/inputPassword";
import { addUsers, updateUsers } from "../../../redux/actions/usersAction";
import { AlertModal, InputImage, InputMaskCustom, LoadingModal, SuccessModal } from "../../../components";
import { resetError, resetSuccess } from "../../../redux/slice/usersSlice";
import Iconify from "../../components/iconify";

const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const updateData = location.state ? location.state.values : null;
  const [dataProvince, setDataProvince] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [img, setImg] = useState(null);
  const [ktp, setKtp] = useState(null);
  const [selfieKtp, setSelfieKtp] = useState(null);
  const [dataImg, setDataImg] = useState(null);
  const [dataKtp, setDataKtp] = useState(null);
  const [dataSelfieKtp, setDataSelfieKtp] = useState(null);
  const [reset, setReset] = useState(false);
  const formikRef = useRef();

  const { status, success, error } = useSelector((state) => state.users);

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
    formdata.append("id_district", values.kecamatan);
    formdata.append("id_city", values.kabupaten);
    formdata.append("id_province", values.provinsi);
    formdata.append("email", values.email);
    formdata.append("ktp", values.noKtp);
    formdata.append("name", values.nama);
    if (values.password !== "") {
      formdata.append("password", values.password);
    }
    formdata.append("telp", values.noTelp.replace(/[^0-9 ]/g, ""));
    formdata.append("address", values.alamat);
    formdata.append("long", 32131231);
    formdata.append("lat", 41241251);
    formdata.append("img_user", dataImg);
    formdata.append("img_ktp", dataKtp);
    formdata.append("img_ktp_selfie", dataSelfieKtp);
    formdata.append("token", "0");
    formdata.append("otpverif", "0");
    if (updateData) {
      formdata.append("user_id", updateData.ID_USER);
      dispatch(updateUsers(formdata));
    } else {
      dispatch(addUsers(formdata));
    }
  };

  useEffect(() => {
    getDataProvince();
    if (updateData) {
      getDataCity(updateData.ID_PROVINCE);
      getDataDistrict(updateData.ID_CITY);
      setKtp(updateData.IMG_KTP);
      setSelfieKtp(updateData.IMG_SELFIE_KTP);
      setImg(updateData.IMG_USER);
    }
  }, []);

  useEffect(() => {
    if (success) {
      setKtp(null);
      setSelfieKtp(null);
      setReset(true);
      formikRef.current.resetForm();
    }
    if (success && updateData) {
      navigate("/admin/user");
    }
  }, [success]);

  return (
    <>
      <div className="">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="" mb={3}>
            <IconButton size="large" color="inherit" onClick={() => navigate("/admin/user")}>
              <Iconify icon={"mdi:arrow-left"} />
            </IconButton>
            <Typography variant="h4" gutterBottom className="mt-[8px] font-poppinsSemibold font-bold" ml={2}>
              Pengguna
            </Typography>
          </Stack>

          <Card className="px-8 pt-6">
            <Formik
              innerRef={formikRef}
              validationSchema={updateData ? updateUserValidationSchema : registerValidationSchema}
              initialValues={{
                email: updateData ? updateData.EMAIL_USER : "",
                password: "",
                nama: updateData ? updateData.NAME_USER : "",
                noTelp: updateData ? updateData.TELP_USER : "",
                noKtp: updateData ? updateData.KTP_USER : "",
                alamat: updateData ? updateData.ADDRESS_USER : "",
                provinsi: updateData ? updateData.ID_PROVINCE : "",
                kabupaten: updateData ? updateData.ID_CITY : "",
                kecamatan: updateData ? updateData.ID_DISTRICT : "",
              }}
              onSubmit={(values) => {
                onAdd(values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <div className="font-poppinsSemibold text-2xl ml-3">Informasi Pengguna</div>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 mr-4">
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Email</div>
                      <InputText
                        styles="mt-1"
                        placeholder={"Email"}
                        type={"email"}
                        name="email"
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        error={errors.email && touched.email && errors.email}
                        message={errors.email}
                      />
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Password</div>
                      {updateData ? (
                        <InputPassword
                          styles={"mt-1"}
                          placeholder={"Password"}
                          name="password"
                          onChange={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                        />
                      ) : (
                        <InputPassword
                          styles={"mt-1"}
                          placeholder={"Password"}
                          name="password"
                          onChange={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                          error={errors.password && touched.password && errors.password}
                          message={errors.password}
                        />
                      )}

                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Nama Lengkap</div>
                      <InputText
                        styles={"mt-1"}
                        placeholder={"Nama Lengkap"}
                        type={"text"}
                        name="nama"
                        onChange={handleChange("nama")}
                        onBlur={handleBlur("nama")}
                        value={values.nama}
                        error={errors.nama && touched.nama && errors.nama}
                        message={errors.nama}
                      />
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">No KTP</div>
                      <InputMaskCustom
                        styles={"mt-1"}
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
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">No Telp</div>
                      <InputMaskCustom
                        styles={"mt-1"}
                        placeholder={"No KTP"}
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
                    </div>
                    <div className="w-full md:w-1/2 md:ml-4">
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Alamat</div>
                      <InputText
                        styles={"mt-1"}
                        placeholder={"Alamat"}
                        type={"text"}
                        name="alamat"
                        onChange={handleChange("alamat")}
                        onBlur={handleBlur("alamat")}
                        value={values.alamat}
                        error={errors.alamat && touched.alamat && errors.alamat}
                        message={errors.alamat}
                      />
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Provinsi</div>
                      <InputDropdown
                        styles={"mt-1"}
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
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Kabupaten / Kota</div>
                      <InputDropdown
                        styles={"mt-1"}
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
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Kecamatan</div>
                      <InputDropdown
                        styles={"mt-1"}
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
                      <div className="flex flex-col w-full mt-3">
                        <div className="mb-3 font-poppinsSemibold text-md mt-3 ml-3">Upload Foto Profil</div>
                        <InputImage setData={setDataImg} reset={reset} setReset={setReset} setValue={setImg} img={updateData && img} />
                      </div>
                    </div>
                  </div>
                  <div className="border-t-2 border-gray-400 my-8"></div>
                  <div className="flex flex-col md:flex-row md:space-x-6 font-poppins">
                    <div className="flex flex-col w-full">
                      <div className="mb-3 font-poppinsSemibold text-md mt-3 ml-3">Upload Scan / Foto KTP Anda</div>
                      <InputImage setData={setDataKtp} reset={reset} setReset={setReset} setValue={setKtp} img={updateData && ktp} />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="mb-3 font-poppinsSemibold text-md mt-3 ml-3">Upload Foto Selfie Anda dengan KTP</div>
                      <InputImage
                        setData={setDataSelfieKtp}
                        reset={reset}
                        setReset={setReset}
                        setValue={setSelfieKtp}
                        img={updateData && selfieKtp}
                      />
                    </div>
                  </div>

                  <CommonButton
                    type="submit"
                    title={updateData ? "Ubah" : "Tambah"}
                    disabled={
                      !errors.email && !errors.nama && !errors.noTelp && !errors.alamat && !errors.provinsi && !errors.kabupaten && !errors.kecamatan
                    }
                  />
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

export default AddUser;
