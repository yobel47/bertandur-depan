import { Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AlertModal,
  CommonButton,
  InputCurrency,
  InputDropdown,
  InputNumber,
  InputText,
  LoadingModal,
  Main,
  SuccessModal,
  Title,
  InputMultipleImg,
} from "../../components";
import { addProducts, loadDetailProducts, updateProducts } from "../../redux/actions";
import { resetError, resetSuccess } from "../../redux/slice/productSlice";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import { productValidationSchema } from "../../utils/validation/validationSchema";
import { getProductCategory } from "../../service/Api";

function AddTandurMarket() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fileGallery, setFileGallery] = useState([]);
  const [dataType, setDataType] = useState([]);
  const [edit, setEdit] = useState(true);
  const formikRef = useRef();
  const gallery = useRef();

  const dataCategory = [
    { CATEGORY_ID: 1, CATEGORY_NAME: "Tandur Market" },
    { CATEGORY_ID: 2, CATEGORY_NAME: "Ground Garden" },
  ];

  const dataCondition = [
    { CONDITION_ID: 1, CONDITION_NAME: "Baru" },
    { CONDITION_ID: 2, CONDITION_NAME: "Bekas" },
  ];

  const { status, detail, success, error } = useSelector((state) => state.product);

  let { id } = useParams();

  const dispatch = useDispatch();

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
    formdata.append("weight", values.weight);
    const gal = gallery.current.getFiles();
    gal.map((e, i) => {
      return formdata.append("gallery_" + (i + 1), e);
    });
    if (edit) {
      formdata.append("rating", detail?.RATING_PRODUCT);
      formdata.append("id_product", detail?.ID_PRODUCT);
      dispatch(updateProducts(formdata));
    } else {
      formdata.append("rating", "0");
      dispatch(addProducts(formdata));
    }
  };

  const getDataCategory = async (id) => {
    try {
      let response = await getProductCategory(id);
      setDataType(response.data.data);
    } catch (e) {}
  };

  useEffect(() => {
    if (success) {
      formikRef.current.resetForm();
      gallery.current.setFiles([]);
      setDataType([]);
      if (edit) {
        navigate("/my-product");
      }
    }
  }, [success]);

  useEffect(() => {
    if (location.pathname.includes("ubah")) {
      dispatch(loadDetailProducts(id));
      getDataCategory("");
    } else {
      setEdit(false);
    }
  }, []);

  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate replace to="/market" />;
  }

  return (
    <>
      <Title text={`Tandur | ${edit ? "Ubah" : "Tambah"} Barang`} />
      <Main header={false} footer={true}>
        <div className="flex flex-col items-center justify-evenly w-full bg-gray-100">
          <div className="flex w-full lg:w-5/6 items-center flex-row bg-white pt-16 pb-10">
            <div className="px-4 lg:px-20 pt-6 w-full font-poppins">
              <div className="font-poppinsSemibold text-2xl ml-3 mt-5"> {edit ? "Ubah" : "Jual"} Barang</div>
              <div className="border-t-gray-300 border-2 w-full my-4"></div>
              {edit ? (
                detail && (
                  <Formik
                    innerRef={formikRef}
                    validationSchema={productValidationSchema}
                    initialValues={{
                      name: edit ? detail?.NAME_PRODUCT : "",
                      stock: edit ? detail?.STOCK_PRODUCT : "0",
                      condition: edit ? detail?.CONDITION_PRODUCT : "Baru",
                      price: edit ? currencyFormat(revertCurrency(detail?.PRICE_PRODUCT.toString()), "Rp. 0") : "Rp. 0",
                      desc: edit ? detail?.DESC_PRODUCT : "",
                      note: edit ? detail?.NOTE_PRODUCT : "",
                      kategori: "",
                      type: edit ? detail?.ID_PCAT : "",
                      weight: edit ? detail?.WEIGHT_PRODUCT : "",
                    }}
                    onSubmit={(values) => {
                      onAdd(values);
                    }}
                  >
                    {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid, setFieldValue }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/2 mr-4">
                            <div className="font-poppinsSemibold text-lg mt-6 ml-3">Nama barang</div>
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
                            {!edit && (
                              <>
                                <div className="font-poppinsSemibold text-lg mt-6 ml-3">Kategori</div>
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
                              </>
                            )}
                            <div className="font-poppinsSemibold text-lg mt-6 ml-3">Jenis</div>
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
                            <div className="font-poppinsSemibold text-lg mt-6 ml-3">Harga</div>
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
                                <div className="font-poppinsSemibold text-lg mt-6 ml-3">Stok</div>
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
                                <div className="font-poppinsSemibold text-lg mt-6 ml-3">Kondisi</div>
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
                            <div className="font-poppinsSemibold text-lg mt-7 md:mt-14 ml-3">Deskripsi Barang</div>
                            <textarea
                              value={values.desc}
                              onChange={handleChange("desc")}
                              onBlur={handleBlur("desc")}
                              rows="4"
                              className={`mt-3 w-full text-base px-3 py-3  border-2 rounded-lg placeholder-slate-400
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
                            <div className="font-poppinsSemibold text-lg mt-4 ml-3">Catatan Penjual</div>
                            <textarea
                              value={values.note}
                              onChange={handleChange("note")}
                              onBlur={handleBlur("note")}
                              rows="4"
                              className={`mt-3 w-full text-base px-3 py-3 border-2 rounded-lg placeholder-slate-400
                              focus:outline-none  focus:ring-tandur
                              disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                              ${
                                errors.note && touched.note && errors.note
                                  ? "focus:border-pink-500 border-pink-500"
                                  : "focus:border-tandur border-slate-400"
                              }`}
                              placeholder="Catatan penjual"
                            ></textarea>
                            {errors.note && touched.note && errors.note && <p className="ml-3 text-pink-500 pt-2 pl-2">{errors.note}</p>}
                            <div className="flex flex-row space-x-6 w-50 font-poppins">
                              <div className="flex flex-col w-full">
                                <div className="font-poppinsSemibold text-lg mt-4 mb-3 ml-3">Foto Barang</div>
                                <InputMultipleImg
                                  inputType={"multiple"}
                                  maxFiles={5}
                                  label={""}
                                  name={"gallery"}
                                  ref={gallery}
                                  setFilesGallery={setFileGallery}
                                  labelStyles="!mt-5"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <CommonButton
                          type="submit"
                          title={"Ubah"}
                          disabled={
                            !errors.name &&
                            !errors.stock &&
                            !errors.condition &&
                            !errors.price &&
                            !errors.desc &&
                            !errors.note &&
                            values.price !== "Rp. 0" &&
                            values.price !== "Rp. "
                          }
                        />
                      </form>
                    )}
                  </Formik>
                )
              ) : (
                <Formik
                  innerRef={formikRef}
                  validationSchema={productValidationSchema}
                  initialValues={{
                    name: "",
                    stock: "0",
                    condition: "Baru",
                    price: "Rp. 0",
                    desc: "",
                    note: "",
                    kategori: "",
                    type: "",
                    weight: "",
                  }}
                  onSubmit={(values) => {
                    onAdd(values);
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 mr-4">
                          <div className="font-poppinsSemibold text-lg mt-6 ml-3">Nama barang</div>
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
                          <div className="font-poppinsSemibold text-lg mt-6 ml-3">Kategori</div>
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
                          <div className="font-poppinsSemibold text-lg mt-6 ml-3">Jenis</div>
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
                          <div className="font-poppinsSemibold text-lg mt-6 ml-3">Harga</div>
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
                              <div className="font-poppinsSemibold text-lg mt-6 ml-3">Stok</div>
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
                              <div className="font-poppinsSemibold text-lg mt-6 ml-3">Kondisi</div>
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
                          <div className="font-poppinsSemibold text-lg mt-7 md:mt-14 ml-3">Deskripsi Barang</div>
                          <textarea
                            value={values.desc}
                            onChange={handleChange("desc")}
                            onBlur={handleBlur("desc")}
                            rows="4"
                            className={`mt-3 w-full text-base px-3 py-3  border-2 rounded-lg placeholder-slate-400
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
                          <div className="font-poppinsSemibold text-lg mt-4 ml-3">Catatan Penjual</div>
                          <textarea
                            value={values.note}
                            onChange={handleChange("note")}
                            onBlur={handleBlur("note")}
                            rows="4"
                            className={`mt-3 w-full text-base px-3 py-3 border-2 rounded-lg placeholder-slate-400
                          focus:outline-none  focus:ring-tandur
                          disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                          ${
                            errors.note && touched.note && errors.note
                              ? "focus:border-pink-500 border-pink-500"
                              : "focus:border-tandur border-slate-400"
                          }`}
                            placeholder="Catatan penjual"
                          ></textarea>
                          {errors.note && touched.note && errors.note && <p className="ml-3 text-pink-500 pt-2 pl-2">{errors.note}</p>}
                          <div className="flex flex-row space-x-6 w-50 font-poppins">
                            <div className="flex flex-col w-full">
                              <div className="font-poppinsSemibold text-lg mt-4 mb-3 ml-3">Foto Barang</div>
                              <InputMultipleImg
                                inputType={"multiple"}
                                maxFiles={5}
                                label={""}
                                name={"gallery"}
                                ref={gallery}
                                setFilesGallery={setFileGallery}
                                labelStyles="!mt-5"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <CommonButton
                        type="submit"
                        title={"Tambah"}
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
              )}
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

export default AddTandurMarket;
