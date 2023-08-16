import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoadingModal, Main, Title } from "../../components";
import { loadTutorials, loadTutorialsDetail } from "../../redux/actions";

function DetailTutorial() {
  const dispatch = useDispatch();
  const [tutorialData, setTutorialData] = useState();
  const [activeData, setActiveData] = useState();

  let { id } = useParams();

  const { status, tutorials, details } = useSelector((state) => state.tutorial);

  useEffect(() => {
    dispatch(loadTutorials());
    dispatch(loadTutorialsDetail(id));
  }, []);

  useEffect(() => {
    setTutorialData(tutorials.find((item) => item.ID_TUTORIAL == id));
  }, [tutorials]);

  useEffect(() => {
    setActiveData(details[0]);
  }, [details]);

  return (
    <>
      <Title text={"Tandur | Detail Belajar"} />
      <Main header={false} footer={true}>
        <div className="flex flex-col items-center justify-evenly w-5/6 bg-white mt-20 mb-10">
          <div className=" flex flex-row gap-8 w-full">
            <div className="w-7/12 py-6 flex flex-col justify-between">
              <div className="flex flex-col w-full">
                <div className="text-tandur font-poppinsSemibold text-3xl">{tutorialData?.TITLE_TUTORIAL}</div>
                <div className="text-[#4A4A4A] text-font-poppins text-xl mt-10">{tutorialData?.DESC_TUTORIAL}</div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div>&nbsp;</div>
                <div className="text-base font-poppinsMedium text-[#828282] mt-12">{details?.length} Pelajaran</div>
              </div>
            </div>
            <div className="w-5/12 py-5">
              <img alt="" src={tutorialData?.URLIMG_TUTORIAL} className="rounded-lg h-full object-cover w-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-evenly w-full h-auto bg-gray-100 pt-8 pb-10">
          <div className="flex flex-col w-11/12">
            <div className="flex flex-row gap-6">
              <div className="w-9/12 rounded-lg overflow-hidden">
                <iframe
                  title={activeData?.URLVIDEO_TD}
                  width="100%"
                  height="480"
                  src={activeData?.URLVIDEO_TD.replace("watch?v=", "embed/")}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="w-3/12 h-[480px] gap-6 overflow-auto">
                {details?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className={`flex flex-row rounded-lg overflow-hidden shadow mb-6 mr-2 ${activeData?.ID_TD !== e.ID_TD && "cursor-pointer"}`}
                      onClick={() => {
                        setActiveData(e);
                      }}
                    >
                      <div className="w-2/12 bg-[#BCEB3C]/50 font-poppinsBold text-[#7CBD1E] flex items-center justify-center">{i + 1}</div>
                      <div
                        className={`w-10/12 ${
                          activeData?.ID_TD == e.ID_TD ? "bg-[#BCEB3C]/80 " : "bg-white hover:bg-[#BCEB3C]/80"
                        }  font-poppinsSemibold text-[#7CBD1E] p-4`}
                      >
                        {e.TITLE_TD}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
    </>
  );
}

export default DetailTutorial;
