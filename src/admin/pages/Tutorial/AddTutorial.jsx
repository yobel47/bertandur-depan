import { Formik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { tutorialValidationSchema } from "../../../utils/validation/validationSchema";
import CommonButton from "../../../components/atoms/commonButton";
import InputText from "../../../components/atoms/inputText";
import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AlertModal, InputImage, LoadingModal, SuccessModal } from "../../../components";
import { addTutorials, updateTutorials } from "../../../redux/actions";
import Iconify from "../../components/iconify";
import { resetSuccess, resetError } from "../../../redux/slice/tutorialSlice";

const AddTutorial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const updateData = location.state ? location.state.values : null;
  const [img, setImg] = useState(null);
  const [dataImg, setDataImg] = useState(null);
  const [reset, setReset] = useState(false);
  const formikRef = useRef();

  const { status, success, error } = useSelector((state) => state.tutorial);

  const dispatch = useDispatch();

  const onAdd = (values) => {
    const formdata = new FormData();
    formdata.append("title_tutorial", values.title);
    formdata.append("desc", values.desc);
    formdata.append("image", dataImg);
    if (updateData) {
      formdata.append("id_tutorial", updateData.ID_TUTORIAL);
      dispatch(updateTutorials(formdata));
    } else {
      dispatch(addTutorials(formdata));
    }
  };

  useEffect(() => {
    if (updateData) {
      setImg(updateData.URLIMG_TUTORIAL);
    }
  }, []);

  useEffect(() => {
    if (success) {
      setImg(null);
      setReset(true);
      formikRef.current.resetForm();
    }
    if (success && updateData) {
      navigate("/admin/tutorial");
    }
  }, [success]);

  return (
    <>
      <div className="">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="" mb={3}>
            <IconButton size="large" color="inherit" onClick={() => navigate("/admin/tutorial")}>
              <Iconify icon={"mdi:arrow-left"} />
            </IconButton>
            <Typography variant="h4" gutterBottom className="mt-[8px] font-poppinsSemibold font-bold" ml={2}>
              Tutorial
            </Typography>
          </Stack>

          <Card className="px-8 pt-6">
            <Formik
              innerRef={formikRef}
              validationSchema={tutorialValidationSchema}
              initialValues={{
                title: updateData ? updateData.TITLE_TUTORIAL : "",
                desc: updateData ? updateData.DESC_TUTORIAL : "",
              }}
              onSubmit={(values) => {
                onAdd(values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="font-poppinsSemibold text-2xl ml-3">Informasi Tutorial</div>
                    <div className="font-poppinsSemibold text-md mt-6 ml-3">Judul tutorial</div>
                    <InputText
                      styles={"mt-1"}
                      placeholder={"Judul tutorial"}
                      type={"text"}
                      name="title"
                      onChange={handleChange("title")}
                      onBlur={handleBlur("title")}
                      value={values.title}
                      error={errors.title && touched.title && errors.title}
                      message={errors.title}
                    />
                    <div className="font-poppinsSemibold text-md mt-7 ml-3">Deskripsi tutorial</div>
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
                      placeholder="Deskripsi tutorial"
                    ></textarea>
                    {errors.desc && touched.desc && errors.desc && <p className="text-pink-500 pt-2 pl-2">{errors.desc}</p>}
                    <div className="flex flex-row space-x-6 w-50 font-poppins">
                      <div className="flex flex-col w-full mt-3">
                        <div className="font-poppinsSemibold text-md m-4 ml-3">Tutorial Thumbnail</div>
                        <InputImage setData={setDataImg} reset={reset} setReset={setReset} setValue={setImg} img={updateData && img} />
                      </div>
                    </div>
                    <CommonButton type="submit" title={updateData ? "Ubah" : "Tambah"} disabled={!errors.title && !errors.desc && dataImg !== null} />
                  </div>
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

export default AddTutorial;
