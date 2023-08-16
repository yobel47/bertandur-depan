import { Formik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { productValidationSchema } from "../../../utils/validation/validationSchema";
import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertModal,
  InputCurrency,
  InputNumber,
  InputDropdown,
  LoadingModal,
  CommonButton,
  InputText,
  SuccessModal,
  InputMultipleImg,
} from "../../../components";
import { addProducts, loadDetailProducts, updateProducts } from "../../../redux/actions";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify";
import { currencyFormat, revertCurrency } from "../../../utils/currencyFormat";
import { resetSuccess, resetError } from "../../../redux/slice/productSlice";
import { getProductCategory } from "../../../service/Api";

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const updateData = location.state ? location.state.values : null;
  const [dataType, setDataType] = useState([]);
  const [fileGallery, setFileGallery] = useState([]);

  const gallery = useRef();
  const formikRef = useRef();

  const dataCategory = [
    { CATEGORY_ID: 1, CATEGORY_NAME: "Tandur Market" },
    { CATEGORY_ID: 2, CATEGORY_NAME: "Ground Garden" },
  ];
  const dataCondition = [
    { CONDITION_ID: 1, CONDITION_NAME: "Baru" },
    { CONDITION_ID: 2, CONDITION_NAME: "Bekas" },
  ];

  const { status, success, error, detail } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const getDataCategory = async (id) => {
    try {
      let response = await getProductCategory(id);
      setDataType(response.data.data);
    } catch (e) {}
  };

  const onAdd = (values) => {
    const formdata = new FormData();
    formdata.append("id_product_category", values.type);
    formdata.append("id_product_condition", values.condition);
    formdata.append("name_product", values.name);
    formdata.append("stock", values.stock);
    formdata.append("condition", values.condition);
    formdata.append("price", revertCurrency(values.price));
    formdata.append("desc", values.desc);
    formdata.append("note", values.note);
    const gal = gallery.current.getFiles();
    gal.map((e, i) => {
      return formdata.append("gallery_" + (i + 1), e);
    });
    formdata.append("weight", values.weight);
    if (updateData) {
      formdata.append("rating", detail?.RATING_PRODUCT);
      formdata.append("id_product", updateData.ID_PRODUCT);
      dispatch(updateProducts(formdata));
    } else {
      formdata.append("rating", "0");
      dispatch(addProducts(formdata));
    }
  };

  useEffect(() => {
    if (updateData) {
      dispatch(loadDetailProducts(updateData.ID_PRODUCT));
      getDataCategory(updateData.CATEGORY == "Tandur Market" ? "1" : "2");
    }
  }, []);

  useEffect(() => {
    if (success) {
      formikRef.current.resetForm();
      gallery.current.setFiles([]);
      setDataType([]);
    }
    if (success && updateData) {
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

          <Card className="px-8 pt-6">
            <Formik
              innerRef={formikRef}
              validationSchema={productValidationSchema}
              initialValues={{
                name: updateData ? updateData.NAME_PRODUCT : "",
                stock: updateData ? detail?.STOCK_PRODUCT : "0",
                condition: updateData ? detail?.CONDITION_PRODUCT : "Baru",
                price: updateData ? currencyFormat(revertCurrency(updateData.PRICE_PRODUCT.toString()), "Rp. 0") : "Rp. 0",
                desc: updateData ? detail?.DESC_PRODUCT : "",
                note: updateData ? detail?.NOTE_PRODUCT : "",
                kategori: updateData ? (updateData.CATEGORY == "Tandur Market" ? 1 : 2) : "",
                type: updateData ? detail?.ID_PCAT : "",
                weight: updateData ? detail?.WEIGHT_PRODUCT : "",
              }}
              onSubmit={(values) => {
                onAdd(values);
                // console.log(values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 mr-4">
                      <div className="font-poppinsSemibold text-2xl ml-3">Informasi Barang</div>
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Nama barang</div>
                      <InputText
                        styles={"mt-1"}
                        placeholder={"Nama barang"}
                        type={"text"}
                        name="name"
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        error={errors.name && touched.name && errors.name}
                        message={errors.name}
                      />
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Kategori</div>
                      <InputDropdown
                        styles={"mt-1"}
                        placeholder={"Kategori"}
                        data={dataCategory}
                        name="kategori"
                        title={"CATEGORY_NAME"}
                        id={"CATEGORY_ID"}
                        onChange={(e) => {
                          setFieldValue("kategori", e.target.value);
                          getDataCategory(e.target.value);
                          setDataType([]);
                          setFieldValue("type", "");
                        }}
                        onBlur={handleBlur("kategori")}
                        value={values.kategori}
                        error={errors.kategori && touched.kategori && errors.kategori}
                        message={errors.kategori}
                      />
                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Jenis</div>
                      <InputDropdown
                        styles={"mt-1"}
                        placeholder={"Jenis"}
                        data={dataType}
                        disabled={dataType.length > 0 ? false : true}
                        name="type"
                        title={"NAME_PCAT"}
                        id={"ID_PCAT"}
                        onChange={(e) => {
                          setFieldValue("type", e.target.value);
                        }}
                        onBlur={handleBlur("type")}
                        value={values.type}
                        error={errors.type && touched.type && errors.type}
                        message={errors.type}
                      />

                      <div className="font-poppinsSemibold text-md mt-6 ml-3">Harga</div>
                      <InputCurrency
                        type={"text"}
                        styles={"mt-1"}
                        placeholder={"Harga barang"}
                        onChange={handleChange("price")}
                        onBlur={handleBlur("price")}
                        value={values.price}
                        error={errors.price && touched.price && errors.price}
                        message={errors.price}
                      />
                      <div className="font-poppinsSemibold text-lg mt-6 ml-3">Berat</div>
                      <div className="flex flex-row gap-4 items-center">
                        <div className="w-full">
                          <InputNumber
                            styles={"mt-1"}
                            placeholder={"Berat"}
                            type={"number"}
                            name="number"
                            onChange={handleChange("weight")}
                            onBlur={handleBlur("weight")}
                            value={values.weight}
                            error={errors.weight && touched.weight && errors.weight}
                            message={errors.weight}
                          />
                        </div>
                        kg
                      </div>

                      <div className={"flex flex-row space-x-6"}>
                        <div className="w-1/2">
                          <div className="font-poppinsSemibold text-md mt-6 ml-3">Stok</div>
                          <InputNumber
                            styles={"mt-1"}
                            placeholder={"Stok"}
                            type={"number"}
                            name="stock"
                            onChange={handleChange("stock")}
                            onBlur={handleBlur("stock")}
                            value={values.stock}
                            error={errors.stock && touched.stock && errors.stock}
                            message={errors.stock}
                          />
                        </div>
                        <div className="w-1/2">
                          <div className="font-poppinsSemibold text-md mt-6 ml-3">Kondisi</div>
                          <InputDropdown
                            styles={"mt-1"}
                            data={dataCondition}
                            name="condition"
                            title={"CONDITION_NAME"}
                            id={"CONDITION_NAME"}
                            onChange={(e) => {
                              setFieldValue("condition", e.target.value);
                            }}
                            onBlur={handleBlur("condition")}
                            value={values.condition}
                            error={errors.condition && touched.condition && errors.condition}
                            message={errors.condition}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 md:ml-4">
                      <div className="font-poppinsSemibold text-md mt-7 md:mt-14 ml-3">Deskripsi Barang</div>
                      <textarea
                        value={values.desc}
                        onChange={handleChange("desc")}
                        onBlur={handleBlur("desc")}
                        rows="4"
                        className={`mt-3 w-full text-sm px-3 py-3 text-md border-2 rounded-lg placeholder-slate-400
                              focus:outline-none  focus:ring-tandur
                              disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                              ${
                                errors.desc && touched.desc && errors.desc
                                  ? "focus:border-pink-500 border-pink-500"
                                  : "focus:border-tandur border-slate-400"
                              }`}
                        placeholder="Deskripsi barang"
                      ></textarea>
                      {errors.desc && touched.desc && errors.desc && <p className="ml-3 text-pink-500 pt-2 pl-2">{errors.desc}</p>}
                      <div className="font-poppinsSemibold text-md mt-4 ml-3">Catatan Penjual</div>
                      <textarea
                        value={values.note}
                        onChange={handleChange("note")}
                        onBlur={handleBlur("note")}
                        rows="4"
                        className={`mt-3 w-full text-sm px-3 py-3 text-md border-2 rounded-lg placeholder-slate-400
                              focus:outline-none  focus:ring-tandur
                              disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                              ${
                                errors.note && touched.note && errors.note
                                  ? "focus:border-pink-500 border-pink-500"
                                  : "focus:border-tandur border-slate-400"
                              }`}
                        placeholder="Catatan barang"
                      ></textarea>
                      {errors.note && touched.note && errors.note && <p className="ml-3 text-pink-500 pt-2 pl-2">{errors.note}</p>}
                      <div className="flex flex-row space-x-6 w-50 font-poppins">
                        <div className="flex flex-col w-full">
                          <div className="font-poppinsSemibold text-md mt-4 mb-3 ml-3">Foto Barang</div>
                          <InputMultipleImg
                            inputType={"multiple"}
                            maxFiles={5}
                            label={""}
                            name={"gallery"}
                            ref={gallery}
                            setFilesGallery={setFileGallery}
                            galleryUrl={updateData ? detail?.PHOTO_PRODUCT : []}
                            labelStyles="!mt-5"
                          />
                          {/* <InputImage setData={setDataImg} reset={reset} setReset={setReset} setValue={setImg} img={updateData && img} /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CommonButton
                    type="submit"
                    title={updateData ? "Ubah" : "Tambah"}
                    disabled={
                      !errors.name &&
                      !errors.stock &&
                      !errors.condition &&
                      !errors.price &&
                      !errors.desc &&
                      !errors.note &&
                      fileGallery.length !== 0 &&
                      values.price !== "Rp. 0" &&
                      values.price !== "Rp. "
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

export default AddProduct;
