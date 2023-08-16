import React from "react";
import { useEffect, useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { CommonButton, LandCard2, LoadingModal, Main, Title } from "../../components";
import { loadLands } from "../../redux/actions";
import debounce from "lodash/debounce";

function UrbanFarming() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [terbaru, setTerbaru] = useState(true);
  const [terlama, setTerlama] = useState(false);

  const { status, success, lands, detail, error } = useSelector((state) => state.land);

  useEffect(() => {
    const params = { search: searchParams.get("search"), sort: searchParams.get("sort") };
    dispatch(loadLands(params));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (search !== "") {
      const debouncedAPICall = debounce(() => {
        onSearch();
      }, 2000);

      debouncedAPICall();
      return () => {
        debouncedAPICall.cancel();
      };
    }
  }, [search]);

  useEffect(() => {
    onSearch();
  }, [terbaru, terlama]);

  const changeParams = () => {
    window.history.replaceState(
      null,
      null,
      search !== "null" && search !== "" ? "?search=" + search + "&sort=" + checkSort() : "?sort=" + checkSort()
    );
  };

  const checkSort = () => {
    if (terbaru) {
      return "2";
    } else if (terlama) {
      return "1";
    } else {
      return "2";
    }
  };

  const onSearch = () => {
    changeParams();
    const params = { search: search, sort: checkSort() };
    dispatch(loadLands(params));
  };

  return (
    <>
      <Title text={"Tandur | Urban Farming"} />
      <Main header={false} footer={false}>
        <div className="flex flex-col items-center justify-evenly w-5/6 bg-white mt-20 mb-10">
          <div className="flex w-full items-center flex-col lg:flex-row mb-7">
            <form
              className="w-full px-4"
              onSubmit={(e) => {
                e.preventDefault();
                onSearch();
              }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari lahan"
                  value={search || ""}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="w-full py-2 pl-4 pr-11 text-gray-500 border-2 rounded-full outline-none bg-gray-50 focus:bg-white focus:border-tandur"
                />
                <button type={"button"} onClick={() => onSearch()}>
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
                onClick={() => navigate("/land/tambah")}
                customStyle={"mb-8 w-full lg:w-1/4 mx-4"}
                title="Tambah Lahan"
                disabled={true}
              />
            )}
          </div>
          <div className="border-t-gray-300 border-2 w-full mb-4"></div>
          <div className="flex flex-row w-full text-[#4A4A4A]">
            <div className="w-full">
              <div className="flex md:flex-row flex-col items-center p-2">
                <div className="text-xl font-poppinsSemibold mb-4">Urutkan:</div>
                <div
                  onClick={(e) => {
                    if (!terbaru) {
                      setTerbaru(!terbaru);
                    }
                    setTerlama(false);
                  }}
                  className={`cursor-pointer text-lg font-poppinsSemibold mb-4 rounded-lg ml-3 px-2 py-1 ${
                    terbaru ? "text-white bg-tandur" : "text-font-primary bg-[#F2F2F2]"
                  } `}
                >
                  Terbaru
                </div>
                <div
                  onClick={(e) => {
                    if (!terlama) {
                      setTerlama(!terlama);
                    }
                    setTerbaru(false);
                  }}
                  className={`cursor-pointer text-lg font-poppinsSemibold mb-4 rounded-lg ml-3 px-2 py-1 ${
                    terlama ? "text-white bg-tandur" : "text-font-primary bg-[#F2F2F2]"
                  } `}
                >
                  Terlama
                </div>
              </div>
              <div
                className={`${lands.length !== 0 ? "grid" : "flex"} grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden ${
                  lands.length > 4 && "justify-center"
                } `}
              >
                {lands.map((val, i) => (
                  <div key={i}>
                    <LandCard2 data={val} />
                  </div>
                ))}
                {lands.length == 0 && <div className="w-full text-center font-poppinsSemibold text-2xl py-12">Data tidak ditemukan</div>}
              </div>
            </div>
          </div>
        </div>
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
    </>
  );
}

export default UrbanFarming;
