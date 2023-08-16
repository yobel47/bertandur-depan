import React from "react";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { CommonButton, LoadingModal, TrackModal, Main, Title } from "../../components";
import { loadDetailProducts, orderProducts } from "../../redux/actions";
import { IoLocationSharp } from "react-icons/io5";
import { TiMinus, TiPlus } from "react-icons/ti";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import { shipCost } from "../../service/Api";
import debounce from "lodash/debounce";

function ConfirmOrder() {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderData = location.state ? location.state.values : null;
  const [ship, setShip] = useState();
  const [jne, setJne] = useState([]);
  const [weight, setWeight] = useState(1000);
  const [counter, setCounter] = useState(orderData?.qty ? orderData.qty : 1);
  const [subtotal, setSubtotal] = useState(orderData?.total_harga ? orderData.total_harga : 1);
  const [show, setShow] = useState(false);
  const [loadingShip, setLoadingShip] = useState(true);
  const [total, setTotal] = useState(0);
  const { status, success, detail } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);
  let { id } = useParams();

  useEffect(() => {
    const getCostJne = {
      origin: "444",
      destination: userInfo?.ID_CITY,
      weight: weight,
      courier: "jne",
    };
    getShipCost(getCostJne, "jne");
    dispatch(loadDetailProducts(id));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (detail) {
      const weightKg = detail?.WEIGHT_PRODUCT * 1000;
      setWeight(weightKg * (orderData?.qty ? orderData.qty : 1));
      setSubtotal(orderData?.total_harga ? orderData.total_harga : detail?.PRICE_PRODUCT);
    }
  }, [detail]);

  const getShipCost = async (payload, ship) => {
    try {
      let response = await shipCost(payload);
      if (ship == "jne") {
        setJne(response.data?.data);
        setShip({ ...response.data?.data[0], ship: "jne" });
      }
      if (response.data) {
        setLoadingShip(false);
      }
    } catch (e) {
    }
  };

  useEffect(() => {
    const debouncedAPICall = debounce(() => {
      const getCostJne = {
        origin: "444",
        destination: userInfo?.ID_CITY,
        weight: weight,
        courier: "jne",
      };
      getShipCost(getCostJne, "jne");
    }, 3000);

    debouncedAPICall();
    return () => {
      debouncedAPICall.cancel();
    };
  }, [weight]);

  useEffect(() => {
    if (success) {
      window.location.href = success.data?.payment_url;
    }
  }, [status]);

  useEffect(() => {
    setTotal(subtotal + ship?.cost[0].value);
  }, [ship]);

  return (
    <>
      <Title text={"Tandur | Konfirmasi Pemesanan"} />
      <Main header={false} footer={true}>
        <div className="bg-[#FCF9F9] w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-evenly w-full  md:w-5/6 bg-white  shadow-lg">
            <div className="w-full flex flex-col md:flex-row">
              <div className="w-6/6 md:w-4/6 text-[#828282] mr-8 pt-20 pl-16 pb-10">
                <div className="text-3xl text-[#4A4A4A] font-poppinsSemibold">Konfirmasi Pemesanan</div>
                <div className="border-t-gray-300 border-2 mt-4 mb-8 pr-4"></div>
                <div className="w-6/6">
                  <div className="flex flex-row">
                    <div>
                      <img src={detail?.PHOTO_PRODUCT[0]} alt="" className={"w-[100px] h-[100px] rounded-lg"} />
                    </div>
                    <div className="ml-4">
                      <div className="text-2xl text-tandur font-poppinsSemibold">{detail?.NAME_PRODUCT}</div>
                      <div className="text-xl text-[#4A4A4A] font-poppinsBold">
                        {currencyFormat(revertCurrency(detail?.PRICE_PRODUCT.toString() || ""), "Rp. ")}
                      </div>
                      <div className="flex flex-row justify-between mt-2 text-[#828282] font-poppins">
                        <div className="flex flex-col">
                          <div className="flex !mt-2">
                            <AiFillStar size={24} color={"#F8E064"} />
                            <div className="text-[#828282] ml-1 mb-2 align-top">{detail?.RATING_PRODUCT}</div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-4">
                          <div className="flex flex-row !mt-2">
                            <IoLocationSharp size={24} className="text-tandur" />
                            <div className="text-[#828282] font-poppins  ml-1">{detail?.ADDRESS_USER}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center mt-4">
                    <div className="font-poppinsSemibold text-xl text-[#4A4A4A]">Qty</div>
                    <div className="flex flex-row items-center bg-[#F2F2F2] rounded-lg p-1 font-poppinsSemibold text-tandur">
                      <button
                        className="bg-[#E0E0E0] p-1 rounded-lg"
                        onClick={() => {
                          counter > 1 && setCounter(counter - 1);
                          counter > 1 && setSubtotal((counter - 1) * detail?.PRICE_PRODUCT);
                          counter > 1 && setTotal((counter - 1) * detail?.PRICE_PRODUCT + ship?.cost[0].value);
                          const weightKg = detail?.WEIGHT_PRODUCT * 1000;
                          counter > 1 && setWeight((counter - 1) * weightKg);
                        }}
                      >
                        <TiMinus size={22} />
                      </button>
                      <span className="mx-3 text-xl">{counter}</span>
                      <button
                        className="bg-[#E0E0E0] p-1 rounded-lg"
                        onClick={() => {
                          if (counter < detail?.STOCK_PRODUCT) {
                            setCounter(counter + 1);
                            setSubtotal((counter + 1) * detail?.PRICE_PRODUCT);
                            setTotal((counter + 1) * detail?.PRICE_PRODUCT + ship?.cost[0].value);
                            const weightKg = detail?.WEIGHT_PRODUCT * 1000;
                            setWeight((counter + 1) * weightKg);
                          }
                        }}
                      >
                        <TiPlus size={22} />
                      </button>
                    </div>
                  </div>
                  {/* <div className="border-t-gray-300 border-2 my-4 pr-4"></div> */}
                  <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Informasi Pembeli</div>
                  <div className="flex flex-col font-poppins my-3">
                    <div className="flex flex-row justify-between mb-2">
                      <span className="text-xl">Nama</span>
                      <span className="text-xl font-poppinsSemibold text-tandur">{userInfo.NAME_USER}</span>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <span className="text-xl">Email</span>
                      <span className="text-xl font-poppinsSemibold text-tandur">{userInfo.EMAIL_USER}</span>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <span className="text-xl">No Telp</span>
                      <span className="text-xl font-poppinsSemibold text-tandur">{userInfo.TELP_USER}</span>
                    </div>
                    <div className="flex flex-row justify-between mb-2">
                      <span className="text-xl">Alamat</span>
                      <span className="text-xl font-poppinsSemibold text-tandur">{userInfo.ADDRESS_USER}</span>
                    </div>
                  </div>
                  <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Kurir Pengirim</div>
                  <button className="w-full mt-4" onClick={() => setShow(!show)}>
                    <div className="text-lg bg-[#FCF9F9] border border-[#E0E0E0] rounded-lg py-4 px-8 flex flex-row items-center justify-between">
                      <div className="flex flex-col">
                        <div className="text-[#828282] font-poppins uppercase">{ship?.ship}</div>
                        <div className="text-[#4A4A4A] font-poppins">
                          {ship?.ship == "pos" ? ship?.service.substring(4) : ship?.service}{" "}
                          <span className="text-md lowercase">
                            {ship?.cost[0].etd} {ship?.ship !== "pos" && "hari"}
                          </span>
                        </div>
                      </div>
                      <div className="text-[#4A4A4A] font-poppinsSemibold">
                        {currencyFormat(revertCurrency(ship?.cost[0].value.toString() || ""), "Rp. ")}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="w-6/6 md:w-2/6 bg-[#F8FCF4] pt-10 md:pt-20 px-12 pb-10 flex flex-col justify-center">
                <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Detail Harga</div>
                <div className="flex flex-col my-4">
                  <div className="flex flex-col lg:flex-row justify-between mt-4 mb-2">
                    <div className="text-[#828282] text-lg font-poppins">
                      {counter}x - {detail?.NAME_PRODUCT}
                    </div>
                    <div> {currencyFormat(revertCurrency(subtotal.toString() || ""), "Rp. ")}</div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between my-2">
                    <div className="text-[#828282] font-poppins text-lg">
                      Ongkos Kirim <span className="uppercase">{ship?.ship}</span>
                    </div>
                    <div> {currencyFormat(revertCurrency(ship?.cost[0].value.toString() || ""), "Rp. ")}</div>
                  </div>
                </div>
                <div className="border-t-gray-300 border-2 mt-4 mb-8 pr-4"></div>
                <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">Total Biaya</div>
                <div className="font-poppinsSemibold text-2xl text-[#4A4A4A] mt-4">
                  {currencyFormat(revertCurrency(total.toString() || ""), "Rp. ")}
                </div>
                <CommonButton
                  type="submit"
                  onClick={() => {
                    const values = {
                      product: [
                        {
                          id_product: orderData.id_product,
                          qty: counter,
                          total_harga: subtotal,
                        },
                      ],
                      shipping_method: "jne",
                      name_user: userInfo.NAME_USER,
                      email_user: userInfo.EMAIL_USER,
                      telp_user: userInfo.TELP_USER,
                      alamat_user: userInfo.ADDRESS_USER,
                      shipping_cost: ship?.cost[0].value,
                      total_payment: total,
                    };
                    dispatch(orderProducts(values));
                  }}
                  title="Pesan"
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Main>
      <LoadingModal loading={loadingShip || status == "loading"} styles={"z-[1300]"} />
      <TrackModal show={show} styles={"z-[1300]"} onClose={() => setShow(!show)} jne={jne} setShip={setShip} />
    </>
  );
}

export default ConfirmOrder;
