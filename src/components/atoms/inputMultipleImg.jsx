import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { BiCamera } from "react-icons/bi";
import AlertModal from "./alertModal";

const InputMultipleImg = forwardRef(({ inputType = "multiple", maxFiles = 5, setFilesGallery, galleryUrl }, ref) => {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [inDropZone, setInDropZone] = useState(false);
  const [fileError, setFileError] = useState(false);

  const onFilesUploadChange = (e) => {
    const fileInput = e.target;
    if (inputType == "file") {
      const file = fileInput.files[0];

      if (!file.type.startsWith("image")) {
        setFileError(true);
        return;
      }

      setPreviewUrl(URL.createObjectURL(file));
    } else if (inputType == "multiple") {
      const validFiles = [];

      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];

        if (!file.type.startsWith("image")) {
          continue;
        }

        validFiles.push(file);
      }

      if (!validFiles.length) {
        setFileError(true);
        return;
      }

      if (files.length < maxFiles) {
        let temp = files.concat(validFiles);
        if (temp.length > maxFiles) {
          const length = temp.length % maxFiles;
          const temp2 = temp.slice(0, -length);
          setPreviewUrls(temp2.map((validFile) => URL.createObjectURL(validFile)));
          setFiles(temp2);
          setFilesGallery(temp2);
        } else {
          setPreviewUrls(previewUrls.concat(validFiles.map((validFile) => URL.createObjectURL(validFile))));
          setFiles(files.concat(validFiles));
          setFilesGallery(files.concat(validFiles));
        }
      }
    }

    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

  const removeImage = (index) => {
    setPreviewUrls(
      previewUrls.filter(function (_obj, i) {
        return i !== index;
      })
    );
    setFiles(
      files.filter(function (_obj, i) {
        return i !== index;
      })
    );
    setFilesGallery(
      files.filter(function (_obj, i) {
        return i !== index;
      })
    );
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZone(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZone(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = "copy";
    setInDropZone(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const fileInput = e.dataTransfer;

    if (inputType == "file") {
      const file = fileInput.files[0];

      if (!file.type.startsWith("image")) {
        setFileError(true);
        return;
      }

      setPreviewUrl(URL.createObjectURL(file));
    } else if (inputType == "multiple") {
      const validFiles = [];

      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];

        if (!file.type.startsWith("image")) {
          continue;
        }

        validFiles.push(file);
      }

      if (!validFiles.length) {
        setFileError(true);
        return;
      }

      if (files.length < maxFiles) {
        let temp = files.concat(validFiles);
        if (temp.length > maxFiles) {
          const length = temp.length % maxFiles;
          const temp2 = temp.slice(0, -length);
          setPreviewUrls(temp2.map((validFile) => URL.createObjectURL(validFile)));
          setFiles(temp2);
          setFilesGallery(temp2);
        } else {
          setPreviewUrls(previewUrls.concat(validFiles.map((validFile) => URL.createObjectURL(validFile))));
          setFiles(files.concat(validFiles));
          setFilesGallery(files.concat(validFiles));
        }
      }
    }

    setInDropZone(false);
  };

  useImperativeHandle(ref, () => ({
    getFiles: () => files,
    setFiles: (e) => {
      setFiles(e);
      setPreviewUrls(e);
    },
  }));

  useEffect(() => {
    if (galleryUrl !== undefined) {
      if (galleryUrl.length > 0) {
        const validUrls = galleryUrl.filter((url) => url !== "-");
        setFiles(validUrls);
        setPreviewUrls(validUrls);
        setFilesGallery(validUrls);
      }
    }
  }, [galleryUrl]);

  const InputFile = () => {
    return (
      <label className="flex flex-col items-center justify-center h-full w-full">
        <div className={`flex flex-col items-center h-full justify-center m-4 rounded-lg`}>
          <BiCamera size={38} className={"text-gray-400"} />

          <div className="font-poppinsMedium text-gray-400 text-lg text-center">{inDropZone ? "Taruh" : "Pilih"} file untuk di upload</div>
        </div>
        <input
          type="file"
          onChange={onFilesUploadChange}
          className="filetype hidden"
          accept="image/png, image/jpg, image/jpeg"
          multiple={inputType == "multiple"}
        />
      </label>
    );
  };

  return (
    <>
      <div
        className={`${
          inputType == "file" && "justify-center"
        } hover:cursor-default mt-2 mx-2 w-auto scrollbar flex flex-row h-36 border-4 overflow-x-auto bg-gray-100 rounded-lg items-center px-2 gap-2 border-gray-300 border-dashed hover:bg-gray-200 hover:border-gray-300`}
        onSubmit={(e) => e.preventDefault()}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}
      >
        {inputType == "file" ? (
          previewUrl ? (
            <div className="w-28 h-28">
              <div className="group/inputImage relative w-28 h-28">
                <img src={previewUrl} className="w-28 h-28 rounded-lg " width={112} height={112} alt="" />
                <div className="absolute top-0 left-0 right-0 bottom-0 z-1  items-center justify-center w-28 h-28 bg-white/[30%] hidden group-hover/inputImage:flex">
                  <button
                    type="button"
                    className={` hidden group-hover/inputImage:flex bg-red-500 text-white rounded-full text-sm p-1.5 justify-center items-center`}
                    onClick={() => {
                      setPreviewUrl(null);
                    }}
                  >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <InputFile />
          )
        ) : previewUrls.length > 0 ? (
          <>
            {previewUrls.map((previewUrl, idx) => (
              <div className="w-28 h-28" key={idx}>
                <div className="group/multipleFile relative w-28 h-28">
                  <img src={previewUrl} className="w-28 h-28 rounded-lg " width={112} height={112} alt="" />
                  <div className="absolute top-0 left-0 right-0 bottom-0 z-1  items-center justify-center w-28 h-28 bg-white/[30%] hidden group-hover/multipleFile:flex">
                    <button
                      type="button"
                      className={` hidden group-hover/multipleFile:flex bg-red-500 text-white rounded-full text-sm p-1.5 justify-center items-center`}
                      onClick={() => {
                        removeImage(idx);
                      }}
                    >
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {previewUrls.length < maxFiles && (
              <label className="flex flex-col items-center justify-center h-full w-full">
                <input type="file" onChange={onFilesUploadChange} className="filetype hidden" accept="image/png, image/jpg, image/jpeg" multiple />
              </label>
            )}
          </>
        ) : (
          <InputFile />
        )}
      </div>
      <AlertModal error={fileError} data={"Tipe file tidak sesuai!"} onClose={() => setFileError(false)} styles={"z-[1300]"} />
    </>
  );
});

export default InputMultipleImg;
