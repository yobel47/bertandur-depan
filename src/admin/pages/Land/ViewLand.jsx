import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AlertModal, LoadingModal, SuccessModal, CommonButton, ConfirmModal } from "../../../components";
import { loadLandDetail, verifLands } from "../../../redux/actions";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify";
import { currencyFormat, revertCurrency } from "../../../utils/currencyFormat";
import { resetSuccess, resetError } from "../../../redux/slice/landSlice";
import RViewerJS from "viewerjs-react";

const ViewLand = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const viewData = location.state ? location.state.values : null;
  const [modalVerif, setModalVerif] = useState(false);

  const { detail, status, success, error } = useSelector((state) => state.land);

  const dispatch = useDispatch();

  const onVerif = (values) => {
    dispatch(verifLands(values));
  };

  useEffect(() => {
    if (viewData) {
      dispatch(loadLandDetail(viewData.ID_LAND));
    }
  }, []);

  useEffect(() => {
    if (success) {
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

          <Card className="px-8 pt-6 pb-6">
            <div>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mr-4">
                  <div className="font-poppinsSemibold text-2xl ml-3">Informasi Lahan</div>
                  <div className="flex flex-row space-x-4">
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Nama lahan</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Harga sewa lahan</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6">{viewData.NAME_LAND}</div>
                      <div className="font-poppinsSemibold text-md mt-6">
                        {currencyFormat(revertCurrency(viewData.PRICE_LAND.toString()), "Rp. ")}
                      </div>
                    </div>
                  </div>
                  <div className="font-poppinsSemibold text-2xl mt-6 ml-3">Lokasi Lahan</div>
                  <div className="flex flex-row space-x-4">
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Alamat </div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Provinsi </div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Kabupaten / kota </div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Kecamatan </div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.ADDRESS_LAND}</div>
                      <div className="font-poppinsSemibold text-md mt-6">{viewData?.NAME_PROVINCE}</div>
                      <div className="font-poppinsSemibold text-md mt-6">{viewData?.NAME_CITY}</div>
                      <div className="font-poppinsSemibold text-md mt-6">{viewData?.NAME_DISTRICT}</div>
                    </div>
                  </div>
                  <div className="font-poppinsSemibold text-2xl mt-6 ml-3">Foto Lahan</div>
                  <div className="flex flex-row space-x-6 w-50 mt-4 font-poppins">
                    <div className="flex flex-col w-full ml-3">
                      <div className=" flex flex-col  w-full h-32 border-4 bg-gray-100 rounded-lg items-center justify-center border-gray-300 border-dashed hover:bg-gray-200 hover:border-gray-300">
                        <RViewerJS options={{ navbar: false, button: false }}>
                          <div className="overflow-x-scroll flex flex-row gap-4">
                            {viewData?.URLGALLERY_LAND.map(
                              (e, i) => e !== "-" && <img key={i} src={e} alt="" className={`${e == null ? "hidden" : "block"} w-28 h-28`} />
                            )}
                          </div>
                        </RViewerJS>
                      </div>
                      <div className="mb-3 text-center mt-2 font-poppinsSemibold text-md">Foto Lahan</div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 mt-7 md:mt-0 md:ml-4">
                  <div className="font-poppinsSemibold text-2xl ml-3 mt-4">Data Pemilik Lahan</div>
                  <div className="flex flex-row space-x-4">
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Nama Pemilik</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">No Telp</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.OWNNAME_LAND}</div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.TELP_USER}</div>
                    </div>
                  </div>
                  <div className="font-poppinsSemibold text-2xl mt-6 ml-3">Detail Lahan</div>
                  <div className="flex flex-col">
                    <div className="flex flex-row w-full">
                      <div className="font-poppinsSemibold text-md mt-6 ml-3 w-18">Ukuran lahan</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3 mr-0 w-8">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 w-full">
                        {viewData.WIDTH_LAND} x {viewData.LENGTH_LAND}
                      </div>
                    </div>
                    <div className="flex flex-row w-full">
                      <div className="font-poppinsSemibold text-md mt-6 ml-3 w-18">Aturan lahan</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3 mr-0 w-8">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 w-full">{detail?.RULE_LAND}</div>
                    </div>
                  </div>
                </div>
              </div>
              {viewData.IS_ACTIVE == 0 && (
                <CommonButton
                  onClick={() => {
                    setModalVerif(true);
                  }}
                  title={"Verifikasi"}
                  disabled={true}
                  customStyle={"my-4"}
                />
              )}
            </div>
          </Card>
        </Container>
      </div>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
      <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
      <SuccessModal error={success} data={success} onClose={() => dispatch(resetSuccess())} styles={"z-[1300]"} />
      <ConfirmModal
        visible={modalVerif}
        setVisible={setModalVerif}
        onVerif={() => {
          onVerif(viewData.ID_LAND);
        }}
        styles={"z-[1300]"}
        title={"lahan"}
      />
    </>
  );
};

export default ViewLand;
