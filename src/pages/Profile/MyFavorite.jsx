import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main, ProductCard, ProfileSidebar, Title, LandCard } from "../../components";
import { loadProductsUser } from "../../redux/actions";

function MyFavorite() {
  const dispatch = useDispatch();
  const { products, lands } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(loadProductsUser());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Title text={"Tandur | Favorit Saya"} />
      <Main header={false} footer={true}>
        <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-evenly w-full lg:w-5/6 bg-white  shadow-lg">
            <div className="w-full flex flex-row">
              <div className="w-full text-[#828282] mr-0 lg:mr-8 pt-20 px-4 lg:pl-16 pb-10">
                <div className="text-3xl text-[#4A4A4A] font-poppinsSemibold">Profil</div>
                <div className="border-t-gray-300 border-2 mt-4 mb-8 pr-4"></div>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-3/12">
                    <ProfileSidebar />
                  </div>
                  <div className="w-full lg:w-9/12  rounded-lg shadow-md border px-8 py-6">
                    <div className="text-[#4A4A4A] font-poppinsSemibold text-2xl">Urban Farming Favorit</div>
                    {lands.length > 0 ? (
                      <div className="my-6 grid grid-cols-3 gap-4">
                        {lands.map((e, i) => (
                          <LandCard key={i} data={e} customStyle={"w-[225px]"} />
                        ))}
                      </div>
                    ) : (
                      <div className="w-full text-xl text-center py-12 font-poppinsSemibold">Tidak ada favorit!</div>
                    )}
                    <div className="text-[#4A4A4A] font-poppinsSemibold text-2xl">Barang Pasar Tandur Favorit</div>
                    {products.length > 0 ? (
                      <div className="my-6 grid grid-cols-3 gap-4">
                        {products.map((e, i) => (
                          <ProductCard key={i} data={e} customStyle={"w-[225px]"} />
                        ))}
                      </div>
                    ) : (
                      <div className="w-full text-xl text-center py-12 font-poppinsSemibold">Tidak ada favorit!</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
      {/* <LoadingModal loading={status == "loading"} styles={"z-[1300]"} /> */}
    </>
  );
}

export default MyFavorite;
