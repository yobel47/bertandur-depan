import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { CommonButton, LoadingModal, Main, ProductCard, Title } from "../../components";
import { loadProductCategory, loadProducts, loadProductsGuest } from "../../redux/actions";

function TandurMarket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { status, products } = useSelector((state) => state.guest);
  const { category } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(loadProductCategory(""));
    dispatch(loadProducts());
    dispatch(loadProductsGuest());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadProductCategory(""));
    dispatch(loadProducts());
    dispatch(loadProductsGuest());
  }, []);

  const toSearch = (e) => {
    if (e) {
      navigate("/market/cari?search=" + search + "&sort=2&category=" + e.ID_PCAT);
    } else {
      navigate("/market/cari?search=" + search + "&sort=2");
    }
  };

  return (
    <>
      <Title text={"Tandur | Pasar Tandur"} />
      <Main header={false} footer={true}>
        <div className="flex flex-col items-center justify-evenly w-5/6 bg-white mt-20 mb-10">
          <div className="flex w-full items-center flex-col lg:flex-row mb-7">
            <form className="w-full px-4" onSubmit={() => toSearch()}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari barang"
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
                onClick={() => navigate("tambah")}
                customStyle={"mb-8 w-full lg:w-1/4 mx-4"}
                title="Mulai Jualan"
                disabled={true}
              />
            )}
          </div>

          {/* Kategori Barang */}
          <div className="flex flex-col w-full">
            <div className="font-poppinsSemibold text-2xl px-4 mb-5">Kategori barang</div>

            <div className="font-poppinsSemibold text-xl text-white flex flex-wrap md:flex-row h-full justify-center md:space-x-2 px-4 gap-1">
              {category.map((e, i) => (
                <button
                  key={i}
                  onClick={() => toSearch(e)}
                  className="hover:bg-tandur hover:text-white border-2 border-tandur w-20 md:w-52 p-2 md:p-4 flex justify-center md:justify-start text-start text-tandur items-center rounded-md"
                >
                  {e.NAME_PCAT}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-evenly w-full h-auto bg-gray-100 pt-8 pb-10">
          <div className="flex flex-col w-5/6">
            <div className="font-poppinsSemibold text-2xl px-4 mb-5">Rekomendasi untuk anda</div>

            <div className=" flex flex-row h-auto items-center">
              <Swiper
                // slidesPerView={4}
                breakpoints={{
                  // when window width is >= 640px
                  280: {
                    slidesPerView: 1,
                  },
                  // when window width is >= 768px
                  700: {
                    slidesPerView: 2,
                  },
                  999: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}
                // spaceBetween={"auto"}
                centeredSlides={false}
                loop={true}
                className="mySwiper w-full h-auto "
              >
                {products.map((val, i) => {
                  return (
                    <SwiperSlide key={i} className="flex justify-center">
                      <ProductCard key={i} data={val} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
    </>
  );
}

export default TandurMarket;
