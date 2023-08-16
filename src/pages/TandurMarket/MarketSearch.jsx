import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { LoadingModal, Main, ProductCard, Title } from "../../components";
import { loadProductCategory, loadProducts } from "../../redux/actions";
import debounce from "lodash/debounce";

function MarketSearch() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categoryParams, setCategory] = useState(searchParams.get("category") || "");
  const dispatch = useDispatch();
  const [terbaru, setTerbaru] = useState(true);
  const [terlama, setTerlama] = useState(false);

  const { status, products, category } = useSelector((state) => state.product);

  useEffect(() => {
    const params = { search: searchParams.get("search"), sort: searchParams.get("sort"), category: searchParams.get("category") };
    dispatch(loadProducts(params));
    dispatch(loadProductCategory(""));
  }, []);

  useEffect(() => {
    if (search !== "") {
      const debouncedAPICall = debounce(() => {
        changeParams();
        onSearch();
      }, 2000);

      debouncedAPICall();
      return () => {
        debouncedAPICall.cancel();
      };
    }
  }, [search]);

  useEffect(() => {
    changeParams();
    onSearch();
  }, [terbaru, terlama, categoryParams]);

  const changeParams = () => {
    window.history.replaceState(null, null, "?search=" + search + "&sort=" + checkSort() + "&category=" + categoryParams);
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
    const params = { search: search, sort: checkSort(), category: categoryParams };
    dispatch(loadProducts(params));
  };

  return (
    <>
      <Title text={"Tandur | Cari Produk"} />
      <Main header={false} footer={true}>
        <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-evenly  w-full  lg:w-5/6 bg-white pt-20 px-4 lg:px-16 pb-10 shadow-lg">
            <div className="flex w-full items-center flex-row mb-7">
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
                    placeholder="Cari produk"
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
            </div>
            <div className="border-t-gray-300 border-2 w-full mb-8"></div>
            <div className="flex flex-row w-full text-[#4A4A4A]">
              <div className="w-full lg:w-1/5">
                <div className="text-2xl font-poppinsSemibold mb-4">Filter</div>
                <div className="flex flex-col gap-2">
                  {category.map((e, i) => (
                    <label key={i} className="text-md font-poppins">
                      <input
                        type="radio"
                        name="category"
                        value={e.ID_PCAT}
                        checked={categoryParams == e.ID_PCAT}
                        onChange={() => setCategory(e.ID_PCAT)}
                        className="mr-2"
                      />
                      {e.NAME_PCAT}
                    </label>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-4/5 ">
                <div className="flex flex-row items-center p-2">
                  <div className="text-xl font-poppinsSemibold mb-4 mr-4">Urutkan:</div>
                  <div
                    onClick={(e) => {
                      if (!terbaru) {
                        setTerbaru(!terbaru);
                      }
                      setTerlama(false);
                    }}
                    className={`cursor-pointer text-lg font-poppinsSemibold mb-4 rounded-lg ml-4 px-2 py-1 ${
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
                    className={`cursor-pointer text-lg font-poppinsSemibold mb-4 rounded-lg ml-4 px-2 py-1 ${
                      terlama ? "text-white bg-tandur" : "text-font-primary bg-[#F2F2F2]"
                    } `}
                  >
                    Terlama
                  </div>
                </div>
                <div className={`flex flex-wrap gap-4 ${products.length > 3 && "justify-center"} `}>
                  {products.map((val, i) => (
                    <div key={i}>
                      <ProductCard data={val} />
                    </div>
                  ))}
                  {products.length == 0 && <div className="font-poppinsSemibold text-center w-full text-2xl py-12">Data tidak ditemukan</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
    </>
  );
}

export default MarketSearch;
