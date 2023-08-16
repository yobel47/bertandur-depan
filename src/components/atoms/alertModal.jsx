import React from "react";
import Lottie from "lottie-react";
import { Error } from "../../assets";

function AlertModal(props) {
  const [visible, setFormVisible] = React.useState(props.error);

  React.useEffect(() => {
    setFormVisible(props.error);
  }, [props.error]);

  const onClose = () => {
    setFormVisible(!visible);
    props.onClose();
  };

  return (
    <div
      tabIndex="-1"
      className={`${props.styles} ${
        visible ? "visible" : "hidden "
      } transition ease-in-out duration-1000 delay-500 flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 bg-opacity-50 bg-gray-600 right-0 left-0 bottom-0 md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-red-500 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            <Lottie animationData={Error} style={{ width: "50%" }} />
            <h3 className="mb-5 text-xl font-poppinsSemibold dark:text-gray-400">{props.data && props.data.status_message}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
