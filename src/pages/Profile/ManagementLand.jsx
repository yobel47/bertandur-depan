import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import { AiFillStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { TbClockPlay } from "react-icons/tb";
import { BsCheck2Circle } from "react-icons/bs";
import { LoadingModal, Main, ProfileSidebar, Title } from "../../components";
import { loadLandTransaction, loadLandsUser } from "../../redux/actions";
import { isBefore } from "date-fns";

function ManagementLand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [active, setActive] = useState(1);

  const { status, lands, transaction } = useSelector((state) => state.land);

  useEffect(() => {
    dispatch(loadLandTransaction());
    dispatch(loadLandsUser());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const checkDate = (targetDate) => {
    return isBefore(new Date(targetDate), new Date());
  };

  const sortDate = (date) => {
    return date.slice().sort((a, b) => new Date(b.ENDDATE_RENT) - new Date(a.ENDDATE_RENT));
  };

  return (
    <>
      <Title text={"Tandur | Lahan Saya"} />
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
                    <div className="text-[#4A4A4A] font-poppinsSemibold text-2xl">Manajemen Lahan</div>
                    <div className="flex flex-row items-center gap-4 justify-center mt-8 mb-6">
                      <div
                        onClick={(e) => {
                          setActive(1);
                        }}
                        className={`flex-1 cursor-pointer text-lg font-poppinsSemibold mb-4 rounded-2xl text-center ml-3 px-2 py-2 ${
                          active == 1 ? "text-white bg-tandur" : "text-font-primary bg-[#F2F2F2]"
                        } `}
                      >
                        Lahan Milik Saya
                      </div>
                      <div
                        onClick={(e) => {
                          setActive(2);
                        }}
                        className={`flex-1 cursor-pointer text-lg font-poppinsSemibold mb-4 rounded-2xl text-center ml-3 px-2 py-2 ${
                          active == 2 ? "text-white bg-tandur" : "text-font-primary bg-[#F2F2F2]"
                        } `}
                      >
                        Yang Saya Sewa
                      </div>
                    </div>
                    <div className="">
                      {active == 1 ? (
                        lands.length > 0 ? (
                          lands.map((e, i) => (
                            <div
                              key={i}
                              className="rounded-lg p-6 shadow-lg border flex flex-row gap-4 mt-8  cursor-pointer hover:shadow-xl"
                              onClick={() => navigate("/my-land/" + e.ID_LAND.substring(5))}
                            >
                              <div className="overflow-hidden">
                                <img
                                  src={e.URLGALLERY_LAND[0]}
                                  style={{ filter: e.IS_ACTIVE == 2 && "grayscale(100%)" }}
                                  className="w-96 h-36 rounded-lg object-fill"
                                  alt=""
                                />
                              </div>
                              <div className="w-full h-auto flex flex-col justify-between">
                                <div>
                                  <div className={`font-poppinsSemibold ${e.IS_ACTIVE == 2 ? "text-[#828282]" : "text-tandur"}  text-2xl`}>
                                    {e.NAME_LAND}
                                  </div>
                                  <div className="font-poppinsSemibold text-[#828282] text-lg">
                                    {currencyFormat(revertCurrency(e.PRICE_LAND.toString() || ""), "Rp. ")}
                                  </div>
                                  <div className="flex flex-row gap-6 mt-4">
                                    <div className="flex">
                                      <AiFillStar size={24} color={` ${e.IS_ACTIVE == 2 ? "#BDBDBD" : "#F8E064"}`} />
                                      <div
                                        className={` ${
                                          e.IS_ACTIVE == 2 ? "text-[#BDBDBD]" : "text-[#828282]"
                                        }  text-[#828282] ml-1 font-poppins align-top`}
                                      >
                                        {e.RATING_LAND} / 5
                                      </div>
                                    </div>
                                    <div className="flex flex-row">
                                      <IoLocationSharp size={24} className={` ${e.IS_ACTIVE == 2 ? "text-[#BDBDBD]" : "text-tandur"} `} />
                                      <div className="text-[#828282] font-poppins ml-1">{e.NAME_CITY}</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-row gap-2">
                                  {e.IS_ACTIVE == 2 ? (
                                    <>
                                      <TbClockPlay size={24} className={` "text-tandur" `} />
                                      <div className="text-md font-poppinsSemibold text-[#828282]">Sedang disewa</div>
                                    </>
                                  ) : (
                                    <>
                                      <BsCheck2Circle size={24} fill={`#7CBD1E`} />
                                      <div className="text-md font-poppinsSemibold text-tandur">Tersedia</div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-xl text-center pt-8 font-poppinsSemibold">Tidak ada lahan</div>
                        )
                      ) : transaction.length > 0 ? (
                        sortDate(transaction).map((e, i) => (
                          <div key={i} className="rounded-lg p-6 shadow-lg border flex flex-row gap-4 mt-8">
                            <div className="overflow-hidden">
                              <img
                                src={e.URLGALLERY_LAND[0]}
                                style={{ filter: checkDate(e.ENDDATE_RENT) && "grayscale(100%)" }}
                                className="w-96 h-36 rounded-lg object-fill"
                                alt=""
                              />
                            </div>
                            <div className="w-full h-auto flex flex-col justify-between">
                              <div>
                                <div className={`font-poppinsSemibold ${checkDate(e.ENDDATE_RENT) ? "text-[#828282]" : "text-tandur"}  text-2xl`}>
                                  {e.NAME_LAND}
                                </div>
                                <div className="font-poppinsSemibold text-[#828282] text-lg">
                                  {currencyFormat(revertCurrency(e.PRICE_LAND.toString() || ""), "Rp. ")}
                                </div>
                                <div className="flex flex-row gap-6 mt-4">
                                  <div className="flex">
                                    <AiFillStar size={24} color={` ${checkDate(e.ENDDATE_RENT) ? "#BDBDBD" : "#F8E064"}`} />
                                    <div
                                      className={` ${
                                        checkDate(e.ENDDATE_RENT) ? "text-[#BDBDBD]" : "text-[#828282]"
                                      }  text-[#828282] ml-1 font-poppins align-top`}
                                    >
                                      {e.RATING_LAND} / 5
                                    </div>
                                  </div>
                                  <div className="flex flex-row">
                                    <IoLocationSharp size={24} className={` ${checkDate(e.ENDDATE_RENT) ? "text-[#BDBDBD]" : "text-tandur"} `} />
                                    <div className="text-[#828282] font-poppins ml-1">{e.NAME_CITY}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-row gap-2">
                                {checkDate(e.ENDDATE_RENT) ? (
                                  <>
                                    <BsCheck2Circle size={24} fill={`#828282`} />
                                    <div className="text-md font-poppinsSemibold text-[#828282]">Sewa berakhir</div>
                                  </>
                                ) : (
                                  <>
                                    <TbClockPlay size={24} className={`text-tandur`} />
                                    <div className="text-md font-poppinsSemibold text-tandur ">Sedang berlangsung</div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xl text-center pt-8 font-poppinsSemibold">Tidak ada lahan</div>
                      )}
                    </div>
                  </div>
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

export default ManagementLand;
