import React from "react";
import { Main, HomeSlider, Title, LoadingModal } from "../components";
import { HomeIllus, TandurMarket, UrbanFarming, BelajarNandurIcon, TandurMarketIcon, UrbanFarmingIcon, GooglePlay, BgBelajarNandur } from "../assets";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLandsGuest, loadProductsGuest } from "../redux/actions";
// import RequestPermission from "../firebase-get-token.js";
// import "../firebase-get-token.js";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, lands, products } = useSelector((state) => state.guest);

  useEffect(() => {
    dispatch(loadLandsGuest());
    dispatch(loadProductsGuest());
  }, []);

  useEffect(() => {
    // if (!notif) {
    //   const fetchToken = async () => {
    //     try {
    //       const token = await RequestPermission();
    //       dispatch(sendToken({ user_token: token }));
    //     } catch (error) {
    //       console.log("An error occurred while retrieving token. ", error);
    //     }
    //   };
    //   fetchToken();
    // }
  }, []);

  return (
    <>
      <Title text={"Tandur"} />
      <Main header={true} footer={true}>
        <div className="w-full bg-white flex justify-center">
          <div className="flex items-center justify-evenly w-5/6 h-full md:h-[95vh] bg-white mt-20 md:mt-4">
            <div className="flex flex-col justify-center w-full items-center md:items-start md:w-1/2 h-full">
              <span className="text-5xl font-poppinsBold">Tandur</span>
              <img className="md:hidden w-1/2 my-4" fill="black" src={HomeIllus} alt="" />
              <div className="mt-4 md:mt-8 ">
                <a href="https://drive.google.com/file/d/1P376Dj1Lwdfe6WA-Nv5zKjA9iy1Zpr81/view?usp=sharing" className="hover:shadow-md">
                  <img src={GooglePlay} alt="download" className="w-36" />
                </a>
              </div>
            </div>
            <div className="md:flex items-center justify-center w-1/2 h-full hidden">
              <img className="h-[85%]" fill="black" src={HomeIllus} alt="" />
            </div>
          </div>
        </div>
        <div className="w-full h-full md:h-56 flex flex-col md:flex-row items-center pt-8 ">
          <button
            onClick={() => {
              navigate("/land");
            }}
            className="w-full md:w-1/3 h-56 md:h-full border-gray-100 border-r-2 border-t-2 hover:bg-[#d1fc95] bg-white active:bg-[#ebffcf]  cursor-pointer flex flex-row items-center  justify-center"
          >
            <div>
              <img src={UrbanFarmingIcon} alt="" className="w-16" />
            </div>
            <div className="ml-5">
              <div className="space-y-0 text-start font-poppinsSemibold break-words leading-tight text-3xl ml-2">
                Urban <span className="text-tandur">farming</span>
              </div>
              <div className="space-y-0 text-start font-poppinsSemibold w-56 leading-tight text-lg ml-2">
                Sewa menyewa lahan untuk <span className="text-tandur">bertandur</span>
              </div>
            </div>
          </button>
          <button
            onClick={() => {
              navigate("/market");
            }}
            className="w-full md:w-1/3 h-56 md:h-full border-gray-100 border-t-2 hover:bg-[#d1fc95] bg-white active:bg-[#ebffcf]  cursor-pointer flex flex-row items-center  justify-center"
          >
            <div>
              <img src={TandurMarketIcon} alt="" className="w-14" />
            </div>
            <div className="ml-5">
              <div className="space-y-0 text-start font-poppinsSemibold break-words leading-tight text-3xl ml-2">
                Pasar <span className="text-tandur">Tandur</span>
              </div>
              <div className="space-y-0 text-start font-poppinsSemibold w-56 leading-tight text-lg ml-2">
                Jual beli hasil dari <span className="text-tandur">bertandur</span>
              </div>
            </div>
          </button>
          <button
            onClick={() => {
              navigate("/tutorial");
            }}
            className="w-full md:w-1/3 h-56 md:h-full border-gray-100 border-l-2 border-t-2 hover:bg-[#d1fc95] bg-white active:bg-[#ebffcf]  cursor-pointer flex flex-row items-center  justify-center"
          >
            <div>
              <img src={BelajarNandurIcon} alt="" className="w-16" />
            </div>
            <div className="ml-5">
              <div className="space-y-0 text-start font-poppinsSemibold break-words leading-tight text-3xl ml-2">
                Belajar <span className="text-tandur">Nandur</span>
              </div>
              <div className="space-y-0 text-start font-poppinsSemibold w-56 leading-tight text-lg ml-2">
                Menambah <span className="text-tandur">ilmu</span> untuk <span className="text-tandur">bertandur</span>
              </div>
            </div>
          </button>
        </div>

        {/* URBAN FARMING */}
        <div className="w-full lg:h-[100%] flex flex-row justify-center bg-gray-100">
          <div className="w-5/6 flex flex-row justify-center p-6">
            <div className="lg:flex flex-col items-center space-y-4 pt-2 w-1/2 hidden">
              <div className="font-poppinsSemibold text-2xl">
                Lahan Urban <span className="text-tandur">Farming</span> Tersedia
              </div>
              <div className="flex flex-row h-[90%] items-center justify-center">
                <img className="w-4/6" src={UrbanFarming} alt="" />
              </div>
            </div>
            <HomeSlider
              type="urban"
              controller="justify-end"
              onClick={() => navigate("land")}
              data={lands ? lands.slice(0, 4) : []}
              title={["Lahan Urban ", <span className="text-tandur">Farming</span>, " Tersedia."]}
            />
          </div>
        </div>
        {/* TANDUR MARKET */}
        <div className="w-full h-[100%] flex flex-row justify-center ">
          <div className="w-5/6 flex flex-row-reverse justify-center p-6">
            <div className="lg:flex flex-col items-center space-y-4 pt-2 w-1/2 hidden">
              <div className="font-poppinsSemibold text-2xl">
                Barang <span className="text-tandur">Pasar Tandur</span> Tersedia
              </div>
              <div className="flex flex-row h-[90%] items-center justify-center">
                <img className="h-[80%]" src={TandurMarket} alt="" />
              </div>
            </div>
            <HomeSlider
              type="market"
              controller="justify-start"
              onClick={() => navigate("market")}
              data={products ? products.slice(0, 4) : []}
              title={["Barang ", <span className="text-tandur">Pasar Tandur</span>, " Tersedia."]}
            />
          </div>
        </div>
        {/* BELAJAR NANDUR */}
        <div className="h-80 w-full bg-gray-900 relative overflow-hidden">
          <img className="absolute inset-0 h-full w-full object-cover" src={BgBelajarNandur} alt="" />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>
          <div className="flex flex-col h-full items-center justify-center relative space-y-4 text-white">
            <span className="text-3xl text-center font-poppinsSemibold">
              Butuh <span className="text-tandur">peralatan</span> kebutuhan untuk <span className="text-tandur">berkebun</span>?
            </span>
            <button className="text-xl border-2 p-3 rounded-xl hover:text-tandur hover:border-tandur font-poppinsSemibold">Cari Disini</button>
          </div>
        </div>
      </Main>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
    </>
  );
}

export default Home;
