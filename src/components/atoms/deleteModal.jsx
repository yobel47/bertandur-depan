import React from "react";
import { Error } from "../../assets";
import lottie from "lottie-web";

function DeleteModal(props) {
  const [visible, setFormVisible] = React.useState(props.visible);

  React.useEffect(() => {
    setFormVisible(props.visible);
  }, [props.visible]);

  const onClose = () => {
    setFormVisible(!visible);
    props.setVisible(!visible);
  };

  const onDelete = () => {
    props.onDelete();
    setFormVisible(!visible);
    props.setVisible(!visible);
  };

  const animation = React.useRef(null);
  React.useEffect(() => {
    lottie.loadAnimation({
      container: animation.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Error,
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
            <div ref={animation} className="w-1/2"></div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah anda yakin ingin menghapus data {props.title} ini?</h3>
            <div className="mb-5">
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={onDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Ya, saya yakin
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={onClose}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                Tidak, batalkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
