import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AlertModal, LoadingModal, SuccessModal, CommonButton, ConfirmModal } from "../../../components";
import { loadDetailProducts, verifProducts } from "../../../redux/actions";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify";
import { currencyFormat, revertCurrency } from "../../../utils/currencyFormat";
import { resetSuccess, resetError } from "../../../redux/slice/productSlice";
import RViewerJS from "viewerjs-react";

const ViewProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const viewData = location.state ? location.state.values : null;
  const [modalVerif, setModalVerif] = useState(false);

  const { detail, status, success, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const onVerif = (values) => {
    dispatch(verifProducts(values));
  };

  useEffect(() => {
    if (viewData) {
      dispatch(loadDetailProducts(viewData.ID_PRODUCT));
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
        <title> Barang | Tandur Admin </title>
      </Helmet>
      <div className="font-poppins">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="" mb={3}>
            <IconButton size="large" color="inherit" onClick={() => navigate("/admin/product")}>
              <Iconify icon={"mdi:arrow-left"} />
            </IconButton>
            <Typography variant="h4" gutterBottom className="mt-[8px] font-poppinsSemibold font-bold" ml={2}>
              Barang
            </Typography>
          </Stack>

          <Card className="px-8 pt-6 pb-12">
            <div>
              <div className="font-poppinsSemibold text-2xl ml-3">Informasi Barang</div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mr-4">
                  <div className="flex flex-row space-x-4">
                    <table>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Nama barang</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{viewData.NAME_PRODUCT}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Harga barang</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">
                          {currencyFormat(revertCurrency(viewData.PRICE_PRODUCT.toString()), "Rp. ")}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Kategori</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{viewData.CATEGORY}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Jenis</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.NAME_PCAT}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Stok</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.STOCK_PRODUCT}</td>
                      </tr>
                      <tr>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">Kondisi</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">:</td>
                        <td className="font-poppinsSemibold text-md pt-6 pl-3 align-top">{detail?.CONDITION_PRODUCT}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="w-full md:w-1/2 mt-7 md:mt-0 md:ml-4">
                  <div className="flex flex-row space-x-4">
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Deskripsi</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Catatan penjual</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">:</div>
                    </div>
                    <div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.DESC_PRODUCT}</div>
                      <div className="font-poppinsSemibold text-md mt-6">{detail?.NOTE_PRODUCT}</div>
                    </div>
                  </div>
                  <div className="font-poppinsSemibold text-md mt-6 ml-3">Foto barang</div>
                  <div className="flex flex-col w-full mt-5">
                    <div className=" flex flex-col  w-full h-32 border-4 bg-gray-100 rounded-lg items-center justify-center border-gray-300 border-dashed hover:bg-gray-200 hover:border-gray-300">
                      <RViewerJS options={{ navbar: false, button: false }}>
                        <div className="overflow-x-scroll flex flex-row gap-4">
                          {detail?.PHOTO_PRODUCT.map(
                            (e, i) => e !== "-" && <img key={i} src={e} alt="" className={`${e == null ? "hidden" : "block"} w-28 h-28`} />
                          )}
                        </div>
                      </RViewerJS>
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

export default ViewProduct;
