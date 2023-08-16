import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommonButton, Main, ProductCard, Title, LoadingModal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { loadTutorials } from "../../redux/actions";

function TutorialLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [popularData, setPopularData] = useState([]);

  const { status, tutorials } = useSelector((state) => state.tutorial);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const toSearch = () => {
    navigate("/market/cari?search=" + search);
  };

  useEffect(() => {
    dispatch(loadTutorials());
  }, []);

  useEffect(() => {
    if (tutorials.length > 0) {
      const sortedArray = [...tutorials].sort((a, b) => b.ID_TUTORIAL - a.ID_TUTORIAL);
      const limitedArray = sortedArray.slice(0, 3);
      setPopularData(limitedArray);
    }
  }, [tutorials]);

  return (
    <>
      <Title text={"Tandur | Belajar"} />
      <Main header={false} footer={true}>
        <div className="flex flex-col items-center justify-evenly w-5/6 bg-white mt-20 mb-10">
          {/* <div className="flex w-full items-center flex-row mb-7">
            <form className="w-full px-4" onSubmit={() => toSearch()}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari topik"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="w-full py-2 pl-4 pr-11 text-gray-500 border-2 rounded-full outline-none bg-gray-50 focus:bg-white focus:border-tandur"
                />
                <button type={"submit"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0  w-6 h-6 my-auto text-gray-400 right-4 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            {isLoggedIn && (
              <CommonButton
                type="button"
                onClick={() => navigate("/tutorial/saved")}
                customStyle={"mb-8 w-1/4 mr-4"}
                title="Topik Tersimpan"
                disabled={true}
              />
            )}
          </div> */}

          <div className="flex flex-col w-full">
            <div className="font-poppinsSemibold text-2xl px-4 mb-5">Topik Terbaru</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-6">
              {popularData?.map((e, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      navigate("/tutorial/" + e.ID_TUTORIAL);
                    }}
                    className="shadow rounded-lg overflow-hidden hidden md:block cursor-pointer"
                  >
                    <img src={e.URLIMG_TUTORIAL} className="h-44 object-cover w-full" />
                    <div className="p-5">
                      <div className="text-xl font-poppinsSemibold text-tandur">{e.TITLE_TUTORIAL}</div>
                      {/* <div className="text-base font-poppinsMedium text-[#828282] mt-8">8 Pelajaran</div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-evenly w-full h-auto bg-gray-100 pt-8 pb-10">
          <div className="flex flex-col w-5/6">
            <div className="font-poppinsSemibold text-2xl px-4 mb-5">Topik Lainnya</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 gap-6">
              {tutorials?.map((e, i) => {
                if (i < 8) {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        navigate("/tutorial/" + e.ID_TUTORIAL);
                      }}
                      className="shadow rounded-lg overflow-hidden bg-white cursor-pointer"
                    >
                      <img src={e.URLIMG_TUTORIAL} className="h-44 object-cover w-full " />
                      <div className="p-5">
                        <div className="text-lg font-poppinsSemibold text-tandur">{e.TITLE_TUTORIAL}</div>
                        {/* <div className="text-md font-poppinsMedium text-[#828282] mt-12">8 Pelajaran</div> */}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
    </>
  );
}

export default TutorialLayout;
