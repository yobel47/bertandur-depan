import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AlertModal, LoadingModal, SuccessModal } from "../../../components";
import { resetSuccess, resetError } from "../../../redux/slice/usersSlice";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify";
import RViewerJS from "viewerjs-react";
import { getProvince, getCity, getDistrict } from "../../../service/Api";

const ViewUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const viewData = location.state ? location.state.values : null;
  const [img, setImg] = useState(null);
  const [ktp, setKtp] = useState(null);
  const [selfieKtp, setSelfieKtp] = useState(null);
  const [dataCity, setDataCity] = useState(null);
  const [dataDistrict, setDataDistrict] = useState(null);
  const [province, setProvince] = useState(null);

  const { status, success, error } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const getDataProvince = async () => {
    try {
      let response = await getProvince();
      if (viewData) {
        setProvince(response.data.data.find((x) => x.ID_PROVINCE == viewData.ID_PROVINCE));
      }
    } catch (e) {}
  };

  const getDataCity = async (id) => {
    try {
      let response = await getCity(id);
      setDataCity(response.data.data.find((val) => val.ID_CITY == viewData.ID_CITY));
    } catch (e) {}
  };

  const getDataDistrict = async (id) => {
    try {
      let response = await getDistrict(id);
      setDataDistrict(response.data.data.find((x) => x.ID_DISTRICT == viewData.ID_DISTRICT));
    } catch (e) {}
  };

  useEffect(() => {
    getDataProvince();
    if (viewData) {
      getDataCity(viewData.ID_PROVINCE);
      getDataDistrict(viewData.ID_CITY);
      setKtp(viewData.IMG_KTP);
      setSelfieKtp(viewData.IMG_SELFIE_KTP);
      setImg(viewData.IMG_USER);
    }
  }, []);

  useEffect(() => {
    if (success) {
      navigate("/admin/user");
    }
  }, [success]);

  return (
    <>
      <Helmet>
        <title> Pengguna | Tandur Admin </title>
      </Helmet>
      <div className="font-poppins">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="" mb={3}>
            <IconButton size="large" color="inherit" onClick={() => navigate("/admin/user")}>
              <Iconify icon={"mdi:arrow-left"} />
            </IconButton>
            <Typography variant="h4" gutterBottom className="mt-[8px] font-poppinsSemibold font-bold" ml={2}>
              Pengguna
            </Typography>
          </Stack>

          <Card className="px-8 pt-6 pb-12">
            <div>
              <div className="font-poppinsSemibold text-2xl ml-3">Informasi Pengguna</div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mr-4">
                  <div className="flex flex-row space-x-4">
                    <table>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Email</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{viewData.EMAIL_USER}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Nama Lengkap</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{viewData.NAME_USER}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">No KTP</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{viewData.KTP_USER}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">No Telp</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{viewData.TELP_USER}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Provinsi</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{province?.NAME_PROVINCE}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Kabupaten / kota</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{dataCity?.NAME_CITY}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Kecamatan</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{dataDistrict?.NAME_DISTRICT}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Foto profil pengguna</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">
                          <RViewerJS options={{ navbar: false, button: false }}>
                            <div className="flex flex-col w-auto h-32 border-4 bg-gray-100 rounded-lg items-center justify-center border-gray-300 border-dashed hover:bg-gray-200 hover:border-gray-300">
                              <img src={img} alt="" className={`${img == null ? "hidden" : "block"} w-28 h-28`} />
                            </div>
                          </RViewerJS>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="w-full md:w-1/2 mt-7 md:mt-0 md:ml-4">
                  <div className="font-poppinsSemibold text-md mt-6 ml-3">Foto KTP</div>
                  <div className="flex flex-col w-full mt-5">
                    <RViewerJS options={{ navbar: false, button: false }}>
                      <div className="flex flex-col w-full h-32 border-4 bg-gray-100 rounded-lg items-center justify-center border-gray-300 border-dashed hover:bg-gray-200 hover:border-gray-300">
                        <img src={ktp} alt="" className={`${ktp == null ? "hidden" : "block"} w-28 h-28`} />
                      </div>
                    </RViewerJS>
                  </div>
                  <div className="font-poppinsSemibold text-md mt-6 ml-3">Foto selfie dengan KTP </div>
                  <div className="flex flex-col w-full mt-5">
                    <RViewerJS options={{ navbar: false, button: false }}>
                      <div className="flex flex-col w-full h-32 border-4 bg-gray-100 rounded-lg items-center justify-center border-gray-300 border-dashed hover:bg-gray-200 hover:border-gray-300">
                        <img src={selfieKtp} alt="" className={`${selfieKtp == null ? "hidden" : "block"} w-28 h-28`} />
                      </div>
                    </RViewerJS>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </div>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
      <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
      <SuccessModal error={success} data={success} onClose={() => dispatch(resetSuccess())} styles={"z-[1300]"} />
    </>
  );
};

export default ViewUser;
