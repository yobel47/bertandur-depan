import React from "react";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";

function TrackModal(props) {
  const [visible, setFormVisible] = React.useState(props.show);

  React.useEffect(() => {
    setFormVisible(props.show);
  }, [props.show]);

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
            <h3 className="mb-5 text-xl font-poppinsSemibold dark:text-gray-400"> Kurir Pengiriman </h3>
            <div className="flex gap-4 w-full">
              <div className="flex flex-1 flex-col">
                {props.jne?.map((e, i) => {
                  return (
                    <button
                      className="w-full mb-4"
                      onClick={() => {
                        props.setShip({ ...e, ship: "jne" });
                        onClose();
                      }}
                      key={i}
                    >
                      <div className="text-lg bg-[#FCF9F9] border border-[#E0E0E0] rounded-lg py-2 px-4 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                          <div className="text-[#828282] font-poppins">JNE</div>
                          <div className="text-[#4A4A4A] font-poppins">
                            {e.service} <span className="text-md"> {e.cost[0].etd} hari</span>
                          </div>
                        </div>
                        <div className="text-[#4A4A4A] font-poppinsSemibold">
                          {currencyFormat(revertCurrency(e.cost[0].value.toString() || ""), "Rp. ")}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackModal;
