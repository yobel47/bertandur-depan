import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AlertModal, LoadingModal, SuccessModal, CommonButton, ConfirmModal } from "../../../../components";
import { loadProductDetailTransaction } from "../../../../redux/actions";
import { Helmet } from "react-helmet-async";
import Iconify from "../../../components/iconify";
import { resetSuccess, resetError } from "../../../../redux/slice/productSlice";

const ViewTandurMarket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const viewData = location.state ? location.state.values : null;
  const [modalVerif, setModalVerif] = useState(false);
  let totalQty = 0;
  const { status, success, error, detail } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    if (viewData) {
      dispatch(loadProductDetailTransaction(viewData.ID_PURCHASE));
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
            <IconButton size="large" color="inherit" onClick={() => navigate("/admin/transaction/product")}>
              <Iconify icon={"mdi:arrow-left"} />
            </IconButton>
            <Typography variant="h4" gutterBottom className="mt-[8px] font-poppinsSemibold font-bold" ml={2}>
              Transaksi Pasar Tandur
            </Typography>
          </Stack>

          <Card className="px-8 pt-6 pb-12">
            <div>
              <div className="flex flex-col md:flex-row">
                <div className="w-1/2 mr-4">
                  <div className="font-poppinsSemibold text-2xl ml-3">Informasi Transaksi</div>

                  <div className="flex flex-row space-x-4">
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Tanggal transaksi</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Metode Pembayaran</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Metode Pengiriman</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Jumlah barang</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Total transaksi</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6">
                        {detail?.PAYMENT_DETAIL?.length !== 0 ? detail?.PAYMENT_DETAIL[0].created_at : "-"}
                      </div>
                      <div className="font-poppinsSemibold text-md mt-6">
                        {detail?.PAYMENT_DETAIL?.length !== 0
                          ? detail?.PAYMENT_DETAIL[0].payment_type !== "bank_transfer"
                            ? detail?.PAYMENT_DETAIL[0].payment_type
                            : "Bank Transfer"
                          : "-"}
                      </div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.SHIPPING_METHOD}</div>
                      <div className="font-poppinsSemibold text-md mt-6">
                        {detail?.PURCHASE_DETAIL.map((val) => {
                          totalQty = totalQty + val.QTY_PD;
                          return null;
                        })}
                        {totalQty}
                      </div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.TOTPAYMENT_PURCHASE}</div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 mr-4">
                  <div className="font-poppinsSemibold text-2xl ml-3">Informasi Pembeli</div>
                  <div className="flex flex-row space-x-4">
                    <table>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Nama pembeli</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.NAME_USER}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Alamat pembeli</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.ALAMAT_USER}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Email pembeli</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.EMAIL_USER}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">No telepon pembeli</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.TELP_USER}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <div className="font-poppinsSemibold text-2xl ml-3 mt-6">Detail Transaksi</div>
              <div className="flex flex-wrap md:flex-row">
                {detail?.PURCHASE_DETAIL.map((val, i) => {
                  return (
                    <div className="w-1/3" key={i}>
                      <div className="flex flex-row space-x-4">
                        <table>
                          <tr>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Nama</td>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.NAME_USER}</td>
                          </tr>
                          <tr>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Alamat pembeli</td>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{val.NAME_PRODUCT}</td>
                          </tr>
                          <tr>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Jumlah</td>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{val.QTY_PD}</td>
                          </tr>
                          <tr>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Total</td>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                            <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{val.TOTAL_PRICE}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  );
                })}
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
        // onVerif={() => {
        //   onVerif(viewData.ID_PRODUCT);
        // }}
        styles={"z-[1300]"}
        title={"barang"}
      />
    </>
  );
};

export default ViewTandurMarket;
