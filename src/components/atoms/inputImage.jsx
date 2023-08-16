import Compressor from "compressorjs";
import React, { useEffect, useState } from "react";
import { BiCamera } from "react-icons/bi";
import AlertModal from "./alertModal";

function InputImage(props) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type == "image/png" || event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/jpeg") {
        const image = event.target.files[0];
        new Compressor(image, {
          quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
          success: (compressedResult) => {
            // compressedResult has the compressed file.
            // Use the compressed file to upload the images to your server.
            setImage(URL.createObjectURL(compressedResult));
            props.setReset(false);
            props.setData(compressedResult);
            props.setValue(URL.createObjectURL(compressedResult));
          },
        });
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  useEffect(() => {
    if (props.reset) {
      setImage(null);
    }
  }, [props.reset]);

  useEffect(() => {
    if (props.img) {
      setImage(props.img);
    }
  }, [props.img]);

  return (
    <>
      <label className="flex flex-col w-full h-32 border-4 bg-gray-100 rounded-lg items-center justify-center border-gray-300 border-dashed hover:bg-gray-200 hover:border-gray-300">
        <img src={image} alt="" className={`${image == null ? "hidden" : "block"} w-28 h-28`} />
        <div className={`${image != null ? "hidden" : "flex"} flex-col items-center h-full justify-center m-4 rounded-lg`}>
          <BiCamera size={32} className={"text-gray-400"} />
        </div>
        <input type="file" onChange={onImageChange} className="filetype hidden" accept="image/png, image/jpg, image/jpeg" />
      </label>
      <AlertModal error={error} data={{ status_message: "Harap masukkan gambar!" }} onClose={() => {}} styles={"z-[1300]"} />
    </>
  );
}

export default InputImage;
