import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CommonButton, LoadingModal, Main, ProductCard, Title } from "../../components";
import { loadProducts, loadProductsGuest } from "../../redux/actions";

function SavedTutorial() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  return (
    <>
      <Title text={"Tandur | Belajar"} />
      <Main header={false} footer={true}>
        <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-evenly w-5/6 bg-white  shadow-lg">
            <div className="w-full flex flex-row">
              <div className="w-full text-[#828282] mr-8 pt-20 pl-16 pb-10">
                <div className="text-3xl text-[#4A4A4A] font-poppinsSemibold">Topik Tersimpan</div>
                <div className="border-t-gray-300 border-2 mt-4 mb-8 pr-4"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-6">
                  <div
                    className="shadow rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => {
                      navigate("/tutorial/1");
                    }}
                  >
                    <img src={"https://picsum.photos/1000"} className="h-44 object-cover w-full" />
                    <div className="p-5">
                      <div className="text-xl font-poppinsSemibold text-tandur">Cara membuat pupuk organik dari sampah di rumah</div>
                      <div className="text-base font-poppinsMedium text-[#828282] mt-8">8 Pelajaran</div>
                    </div>
                  </div>
                  <div className="shadow rounded-lg overflow-hidden hidden md:block">
                    <img src={"https://picsum.photos/1000"} className="h-44 object-cover w-full" />
                    <div className="p-5">
                      <div className="text-xl font-poppinsSemibold text-tandur">Cara membuat pupuk organik dari sampah di rumah</div>
                      <div className="text-base font-poppinsMedium text-[#828282] mt-8">8 Pelajaran</div>
                    </div>
                  </div>
                  <div className="shadow rounded-lg overflow-hidden hidden lg:block">
                    <img src={"https://picsum.photos/1000"} className="h-44 object-cover w-full" />
                    <div className="p-5">
                      <div className="text-xl font-poppinsSemibold text-tandur">Cara membuat pupuk organik dari sampah di rumah</div>
                      <div className="text-base font-poppinsMedium text-[#828282] mt-8">8 Pelajaran</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default SavedTutorial;
