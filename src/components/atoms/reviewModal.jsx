import React, { useState } from "react";
import { Question } from "../../assets";
import lottie from "lottie-web";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { addReviewProduct, addReviewLand } from "../../redux/actions";
import InputText from "./inputText";
import CommonButton from "./commonButton";

function ReviewModal(props) {
  const [visible, setFormVisible] = React.useState(props.visible);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setFormVisible(props.visible);
  }, [props.visible]);

  const onClose = () => {
    setFormVisible(!visible);
    props.setVisible(!visible);
  };

  const [rating, setRating] = useState(0);
  const [trueRating, setTrueRating] = useState(0);

  const handleMouseOver = (index) => {
    if (index + 1 < trueRating) {
      if (trueRating == 0) {
        setRating(index + 1);
      }
    } else {
      setRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    setRating(trueRating);
  };

  const handleClick = (index) => {
    setTrueRating(index + 1);
  };

  const animation = React.useRef(null);
  React.useEffect(() => {
    lottie.loadAnimation({
      container: animation.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Question,
    });
    return () => lottie.stop();
  }, []);

  return (
    <div
      tabIndex="-1"
      className={`${props.styles} ${
        visible ? "visible" : "hidden "
      } transition font-poppins ease-in-out duration-1000 delay-500 flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 bg-opacity-50 bg-gray-600 right-0 left-0 bottom-0 md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-[#FFA500] hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Tutup</span>
          </button>
          <div className="p-6 text-center flex flex-col items-center justify-center">
            <h3 className="my-4 text-2xl font-poppinsSemibold text-[#828282]">Berikan Ulasan</h3>
            <div className="flex flex-row">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    size={40}
                    color={rating >= starValue ? "#ffc107" : "#e4e5e9"}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                    style={{ marginRight: 10, cursor: "pointer" }}
                  />
                );
              })}
            </div>
            <Formik
              initialValues={{ title: "", desc: "" }}
              onSubmit={(values) => {
                if (props.type == "land") {
                  dispatch(
                    addReviewLand({
                      id_rent: props.idTransaction,
                      id_land: props.id,
                      rating: trueRating,
                      review_title: values.title,
                      review_content: values.desc,
                    })
                  );
                } else {
                  dispatch(
                    addReviewProduct({
                      id_purchase: props.idTransaction,
                      id_product: props.id,
                      rating: trueRating,
                      review_title: values.title,
                      review_content: values.desc,
                    })
                  );
                }

                onClose();
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid }) => (
                <form onSubmit={handleSubmit} className="w-full mx-12">
                  <InputText
                    placeholder={"Judul"}
                    type={"title"}
                    name="title"
                    onChange={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                    error={errors.title && touched.title && errors.title}
                    message={errors.title}
                    styles="my-4"
                  />
                  <InputText
                    placeholder={"Deskripsi"}
                    type={"desc"}
                    name="desc"
                    onChange={handleChange("desc")}
                    onBlur={handleBlur("desc")}
                    value={values.desc}
                    error={errors.desc && touched.desc && errors.desc}
                    message={errors.desc}
                    styles="mb-4 !mt-0"
                  />
                  <CommonButton
                    customStyle="!my-0 !mt-4"
                    type="submit"
                    title="Kirim Ulasan"
                    disabled={isValid && !errors.email && !errors.password && touched}
                  />
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
