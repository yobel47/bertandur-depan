import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AlertModal, LoadingModal, SuccessModal, CommonButton, ConfirmModal } from "../../../../components";
import { loadLandDetailTransaction, verifProducts } from "../../../../redux/actions";
import { Helmet } from "react-helmet-async";
import Iconify from "../../../components/iconify";
import { currencyFormat } from "../../../../utils/currencyFormat";
import { resetSuccess, resetError } from "../../../../redux/slice/landSlice";

const ViewTransactionUrban = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const viewData = location.state ? location.state.values : null;
  const [modalVerif, setModalVerif] = useState(false);

  const { status, success, error, detail } = useSelector((state) => state.land);

  const dispatch = useDispatch();

  const onVerif = (values) => {
    dispatch(verifProducts(values));
  };

  useEffect(() => {
    if (viewData) {
      dispatch(loadLandDetailTransaction(viewData.ID_RENT));
    }
  }, []);

  useEffect(() => {
    if (success) {
      navigate("/admin/product");
    }
  }, [success]);

  return (
    <>
      <Helmet>
        <title> Transaksi | Tandur Admin </title>
      </Helmet>
      <div className="font-poppins">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="" mb={3}>
            <IconButton size="large" color="inherit" onClick={() => navigate("/admin/transaction/land")}>
              <Iconify icon={"mdi:arrow-left"} />
            </IconButton>
            <Typography variant="h4" gutterBottom className="mt-[8px] font-poppinsSemibold font-bold" ml={2}>
              Transaksi Urban Farming
            </Typography>
          </Stack>

          <Card className="px-8 pt-6 pb-12">
            <div>
              <div className="flex flex-col md:flex-row">
                <div className="w-1/2 mr-4">
                  <div className="font-poppinsSemibold text-2xl ml-3">Informasi Transaksi</div>
                  <div className="flex flex-row space-x-4">
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Nama lahan</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Durasi sewa</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Mulai sewa</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Sewa berakhir </div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Total transaksi</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Status Pembayaran</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Waktu Pembayaran</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.NAME_LAND}</div>
                      <div className="font-poppinsSemibold text-md mt-6">{viewData.DURATION_RENT} Bulan</div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.STARTDATE_RENT}</div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.ENDDATE_RENT}</div>
                      <div className="font-poppinsSemibold text-md mt-6">
                        {currencyFormat(detail?.PAYMENT_DETAIL ? detail?.PAYMENT_DETAIL[0].total_price.toString() : (0).toString(), "Rp. ")}
                      </div>
                      <div className="font-poppinsSemibold text-md mt-6">
                        {detail?.PAYMENT_DETAIL
                          ? detail?.PAYMENT_DETAIL[0]?.status == "settlement"
                            ? "Pembayaran Berhasil"
                            : "Pembayaran Gagal"
                          : "-"}
                      </div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.PAYMENT_DETAIL ? detail?.PAYMENT_DETAIL[0].created_at : "-"}</div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 mr-4">
                  <div className="font-poppinsSemibold text-2xl ml-3">Informasi Penyewa</div>
                  <div className="flex flex-row space-x-4">
                    <table>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Nama penyewa</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.NAME_USER}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Alamat penyewa</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.ADDRESS_USER}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Email penyewa</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.EMAIL_USER}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">No telepon penyewa</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.TELP_USER}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              {viewData.STATUS_TRANSACTION == 0 && (
                <CommonButton
                  onClick={() => {
                    setModalVerif(true);
                  }}
                  title={"Verifikasi"}
                  disabled={true}
                  customStyle={"mt-8 mb-0"}
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
          onVerif(viewData.ID_PRODUCT);
        }}
        styles={"z-[1300]"}
        title={"barang"}
      />
    </>
  );
};

export default ViewTransactionUrban;
