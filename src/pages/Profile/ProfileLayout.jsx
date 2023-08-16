import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { getCity, getDistrict, getProvince } from "../../service/Api";
import { useDispatch, useSelector } from "react-redux";
import { resetError, resetSuccess } from "../../redux/slice/usersSlice";
import { CommonButton, LoadingModal, Main, Title, InputText, ProfileSidebar, InputDropdown, AlertModal, SuccessModal } from "../../components";
import { loadUsers, updateUsers } from "../../redux/actions/usersAction";
import { BiCamera } from "react-icons/bi";

function ProfileLayout() {
  const dispatch = useDispatch();
  const [dataProvince, setDataProvince] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [imgUser, setImgUser] = useState(null);
  const [edit, setEdit] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { status, success, error, users } = useSelector((state) => state.users);

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(loadUsers(userInfo?.ID_USER));
      return data;
    };
    fetchData();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (users) {
      getDataProvince();
      getDataCity(users[0]?.ID_PROVINCE);
      getDataDistrict(users[0]?.ID_CITY);
    }
  }, [users]);

  useEffect(() => {
    dispatch(loadUsers(userInfo?.ID_USER));
  }, [success]);

  const onEditUser = (values) => {
    const formdata = new FormData();
    formdata.append("id_district", values.district);
    formdata.append("id_city", values.city);
    formdata.append("id_province", values.province);
    formdata.append("email", values.email);
    formdata.append("ktp", values.noKtp);
    formdata.append("name", values.name);
    formdata.append("telp", values.noHp.replace(/[^0-9 ]/g, ""));
    formdata.append("address", values.address);
    formdata.append("user_id", userInfo?.ID_USER);
    if (imgUser) {
      formdata.append("img_user", imgUser);
    }
    dispatch(updateUsers(formdata));
  };

  return (
    <>
      <Title text={"Tandur | Profil"} />
      <Main header={false} footer={true}>
        <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-evenly w-full lg:w-5/6 bg-white  shadow-lg">
            <div className="w-full flex flex-row">
              <div className="w-full text-[#828282] mr-0 lg:mr-8 pt-20 px-4 lg:pl-16 pb-10">
                <div className="text-3xl text-[#4A4A4A] font-poppinsSemibold">Profil</div>
                <div className="border-t-gray-300 border-2 mt-4 mb-8 pr-4"></div>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-3/12">
                    <ProfileSidebar />
                  </div>
                  <div className="w-full lg:w-9/12  rounded-lg shadow-md border px-8 py-6">
                    <div className="text-[#4A4A4A] font-poppinsSemibold text-2xl">Detail Profil</div>
                    <div className="flex flex-col items-center gap-4 justify-center my-4 mb-8">
                      {edit ? (
                        <label className="w-64 h-64 rounded-full hover:cursor-pointer relative overflow-hidden">
                          <img src={imgUser ? URL.createObjectURL(imgUser) : users[0]?.IMG_USER} alt="" className={`w-64 h-64 rounded-full`} />
                          <div className="absolute inset-0 bg-black opacity-50"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BiCamera size={32} className={"text-white"} />
                          </div>

                          <input
                            type="file"
                            onChange={(e) => setImgUser(e.target.files[0])}
                            className="filetype hidden"
                            accept="image/png, image/jpg, image/jpeg"
                          />
                        </label>
                      ) : (
                        <>
                          <img src={users[0]?.IMG_USER} alt="" className={`w-64 h-64 rounded-full`} />
                          <div className="text-[#4A4A4A] font-poppinsSemibold text-2xl">{users[0]?.NAME_USER}</div>
                        </>
                      )}
                    </div>
                    {users.length > 0 && (
                      <Formik
                        initialValues={{
                          name: users[0]?.NAME_USER ? users[0]?.NAME_USER : "",
                          noKtp: users[0]?.KTP_USER ? users[0]?.KTP_USER : "",
                          noHp: users[0]?.TELP_USER ? users[0]?.TELP_USER : "",
                          email: users[0]?.EMAIL_USER ? users[0]?.EMAIL_USER : "",
                          province: users[0]?.ID_PROVINCE ? users[0]?.ID_PROVINCE : "",
                          city: users[0]?.ID_CITY ? users[0]?.ID_CITY : "",
                          district: users[0]?.ID_DISTRICT ? users[0]?.ID_DISTRICT : "",
                          address: users[0]?.ADDRESS_USER ? users[0]?.ADDRESS_USER : "",
                        }}
                        onSubmit={(values) => {
                          setEdit(!edit);
                          if (edit) {
                            onEditUser(values);
                          }
                        }}
                      >
                        {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid, setFieldValue }) => (
                          <form onSubmit={handleSubmit}>
                            <div className="font-poppinsSemibold text-lg text-black pl-3">Nama Lengkap</div>
                            <InputText
                              placeholder={"Nama Lengkap"}
                              type={"name"}
                              name="name"
                              onChange={handleChange("name")}
                              onBlur={handleBlur("name")}
                              value={values.name}
                              error={errors.name && touched.name && errors.name}
                              message={errors.name}
                              styles={"mt-1"}
                              disabled={!edit}
                            />
                            <div className="font-poppinsSemibold text-lg text-black pl-3 mt-4">No KTP</div>
                            <InputText
                              placeholder={"No KTP"}
                              type={"noKtp"}
                              name="noKtp"
                              onChange={handleChange("noKtp")}
                              onBlur={handleBlur("noKtp")}
                              value={values.noKtp}
                              error={errors.noKtp && touched.noKtp && errors.noKtp}
                              message={errors.noKtp}
                              styles={"mt-1"}
                              disabled={!edit}
                            />
                            <div className="font-poppinsSemibold text-lg text-black pl-3 mt-4">No HP</div>
                            <InputText
                              placeholder={"No HP"}
                              type={"noHp"}
                              name="noHp"
                              onChange={handleChange("noHp")}
                              onBlur={handleBlur("noHp")}
                              value={values.noHp}
                              error={errors.noHp && touched.noHp && errors.noHp}
                              message={errors.noHp}
                              styles={"mt-1"}
                              disabled={!edit}
                            />
                            <div className="font-poppinsSemibold text-lg text-black pl-3 mt-4">Email</div>
                            <InputText
                              placeholder={"Email"}
                              type={"email"}
                              name="email"
                              onChange={handleChange("email")}
                              onBlur={handleBlur("email")}
                              value={values.email}
                              error={errors.email && touched.email && errors.email}
                              message={errors.email}
                              styles={"mt-1"}
                              disabled={!edit}
                            />
                            <div className="font-poppinsSemibold text-lg text-black pl-3 mt-4">Provinsi</div>
                            <InputDropdown
                              placeholder={"Provinsi"}
                              data={dataProvince}
                              disabled={!edit}
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
                              styles={"mt-1"}
                            />
                            <div className="font-poppinsSemibold text-lg text-black pl-3 mt-4">Kabupaten / Kota</div>
                            <InputDropdown
                              placeholder={"Kabupaten/Kota"}
                              data={dataCity}
                              disabled={dataCity.length > 0 && edit ? false : true}
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
                              styles={"mt-1"}
                            />
                            <div className="font-poppinsSemibold text-lg text-black pl-3 mt-4">Kecamatan</div>
                            <InputDropdown
                              placeholder={"Kecamatan"}
                              data={dataDistrict}
                              disabled={dataDistrict.length > 0 && edit ? false : true}
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
                              styles={"mt-1"}
                            />
                            <div className="font-poppinsSemibold text-lg text-black pl-3 mt-4">Alamat</div>
                            <InputText
                              placeholder={"Alamat"}
                              type={"address"}
                              name="address"
                              onChange={handleChange("address")}
                              onBlur={handleBlur("address")}
                              value={values.address}
                              error={errors.address && touched.address && errors.address}
                              message={errors.address}
                              styles={"mt-1"}
                              disabled={!edit}
                            />
                            <CommonButton
                              type="submit"
                              title={!edit ? "Ubah Profil" : "Simpan Data"}
                              disabled={isValid && !errors.email && !errors.password && touched}
                            />
                          </form>
                        )}
                      </Formik>
                    )}
                  </div>
                </div>
              </div>
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

export default ProfileLayout;
