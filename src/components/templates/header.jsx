import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../../assets";
import { logout } from "../../redux/slice/authSlice";
import { IoNotifications } from "react-icons/io5";
import { HiShoppingCart } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { removeCart } from "../../redux/slice/cartSlice";
import { currencyFormat, revertCurrency } from "../../utils/currencyFormat";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const Header = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { userInfo, isLoggedIn } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);

  const ref = useRef();
  const cartRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 100) {
        setAnimateHeader(true);
      } else setAnimateHeader(false);
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current?.contains(event?.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!cartRef.current?.contains(event?.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [cartRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!notifRef.current?.contains(event?.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [notifRef]);

  const [fcmResponse, setFcmResponse] = useState(null);

  useEffect(() => {
    const firebaseApp = initializeApp({
      apiKey: "AIzaSyBMWN8r5j2J3l96q33BJjjjQDmhen_iIak",
      authDomain: "push-notification-dc501.firebaseapp.com",
      projectId: "push-notification-dc501",
      storageBucket: "push-notification-dc501.appspot.com",
      messagingSenderId: "685051197232",
      appId: "1:685051197232:web:7e817e03efe7f815affaf5",
      measurementId: "G-GJLMJSMRXN",
    });
    const messaging = getMessaging(firebaseApp);
    onMessage(messaging, (payload) => {
      setFcmResponse(payload.notification);
    });
  }, []);

  const username = () => {
    const user = userInfo.NAME_USER;
    const splitUser = user.split(" ");
    return splitUser[0];
  };

  return (
    <nav
      className={`w-full bg-white font-poppinsSemibold fixed z-10 trasition ease-in-out duration-100 
      ${pathname == "/" ? (animateHeader ? "border border-b-2" : "border-0") : "border border-b-2"}`}
    >
      <div className="justify-between mx-auto md:items-center md:flex md:px-8 ">
        <div>
          <div className="flex items-center justify-between py-3 px-3 md:py-3 md:block">
            <div className="flex">
              <Link to="/">
                <button className="flex" onClick={() => {}}>
                  <img className="h-8" fill="black" src={Logo} alt="" />
                  <span className="text-[#7CBD1E] font-bold text-2xl pl-2 font-poppins">TANDUR</span>
                </button>
              </Link>
            </div>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                {navbarOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={` flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbarOpen ? "block mx-5" : "hidden"} ${
              props.header && "mt-3"
            }`}
          >
            <ul className={`items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 ${props.header && "!hidden"} `}>
              <li
                className={`${
                  pathname.match("/land") && "!text-tandur !font-poppinsBold "
                } text-font-primary font-poppinsSemibold text-lg hover:text-gray-900 `}
              >
                <button
                  onClick={() => {
                    navigate("/land");
                  }}
                >
                  Urban Farming
                </button>
              </li>
              <li
                className={`${
                  pathname.match("/market") && "!text-tandur !font-poppinsBold "
                } text-font-primary font-poppinsSemibold text-lg hover:text-gray-900 `}
              >
                <button
                  onClick={() => {
                    navigate("/market");
                  }}
                >
                  Pasar Tandur
                </button>
              </li>
              <li
                className={`${
                  pathname.match("/tutorial") && "!text-tandur !font-poppinsBold "
                } text-font-primary font-poppinsSemibold text-lg hover:text-gray-900 `}
              >
                <button
                  onClick={() => {
                    navigate("/tutorial");
                  }}
                >
                  Belajar Nandur
                </button>
              </li>
            </ul>
            <div
              className={`md:hidden md:flex-col justify-center border-t-2 border-t-gray-300 my-5 w-full self-center ${props.header && "hidden"}`}
            />

            {isLoggedIn ? (
              <>
                <div className={`md:hidden sm:inline-block text-font-primary my-7 font-poppinsSemibold text-lg `}>
                  <button
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    Keranjang
                  </button>
                </div>
                <div className={`md:hidden sm:inline-block text-font-primary mb-7 font-poppinsSemibold text-lg `}>
                  <button
                    onClick={() => {
                      navigate("/notification");
                    }}
                  >
                    Notifikasi
                  </button>
                </div>
                <div className="w-full my-3 space-y-2 md:hidden sm:inline-block">
                  <div className="w-full relative inline-block text-left" ref={ref}>
                    <div className={`block`}>
                      <div className="py-1 pb-3 overflow-hidden" role="none">
                        {userInfo.IS_ADMIN == 1 && (
                          <>
                            <Link to={"/admin"}>
                              <button className="text-font-primary w-full text-left block rounded-lg text-lg mb-7">Dasbor Admin</button>
                            </Link>
                          </>
                        )}
                        <div className="block w-full px-4 pt-2 text-left text-sm border-t-2"></div>
                        <Link to={"/profile"}>
                          <button className="text-font-primary w-full text-left block rounded-lg text-lg my-7">Profile Saya</button>
                        </Link>
                        <div className="block w-full px-4 pt-2 text-left text-sm border-t-2"></div>
                        <Link
                          to={"/"}
                          onClick={() => {
                            dispatch(logout());
                          }}
                        >
                          <button type="submit" className="text-red-500 w-full text-left block rounded-lg text-lg mt-2 mb-2">
                            Keluar
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-3 space-y-2 md:hidden sm:inline-block">
                <Link to="/masuk">
                  <button className="py-1 text-black">Masuk</button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="hidden space-x-2 md:flex gap-3">
          {isLoggedIn ? (
            <>
              <div className="relative inline-block" ref={cartRef}>
                <div className="h-full flex">
                  <button type="button" onClick={() => setCartOpen(!cartOpen)}>
                    <HiShoppingCart size={25} className="relative text-[#7A7A7A] hover:text-tandur" />
                    {cartList.length > 0 && <span className="text-xs bg-red-300 absolute rounded-full py-[5px] px-[5px] top-2 -right-1"></span>}
                  </button>
                </div>

                <div
                  className={` ${
                    cartOpen ? "block" : "hidden"
                  } absolute right-0 z-10 -mr-20 mt-3 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <div className="p-4 overflow-hidden" role="none">
                    <div className="text-lg mb-4">Keranjang</div>
                    {cartList.length == 0 ? (
                      <div className="text-[#7A7A7A] text-md text-center py-8">Keranjang anda kosong!</div>
                    ) : (
                      cartList.slice(-5).map((item, id) => (
                        <div key={id} className="flex justify-between group/cart hover:bg-gray-200 rounded-lg px-4 py-2">
                          <div>
                            {item.qty}x {item.name}
                          </div>
                          <div className="flex gap-3">
                            <div>{currencyFormat(revertCurrency(item.total.toString() || ""), "Rp. ")}</div>
                            <div className="hidden group-hover/cart:flex ">
                              <button
                                type={"button"}
                                onClick={() => {
                                  dispatch(removeCart(item.id));
                                }}
                              >
                                <MdDeleteOutline size={24} className=" text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    {cartList.length !== 0 && (
                      <button
                        type={"button"}
                        onClick={() => {
                          navigate("/cart");
                        }}
                        className={` text-tandur text-md bg-white border-2 border-tandur hover:bg-gray-100 active:bg-gray-100 active:text-tandur focus:outline-none disabled:bg-gray-300 w-full mt-3 py-2 rounded-2xl `}
                      >
                        Lihat Semua
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="relative inline-block" ref={notifRef}>
                <div className="h-full flex">
                  <button type="button" onClick={() => setNotifOpen(!notifOpen)}>
                    <IoNotifications size={25} className="relative text-[#7A7A7A] hover:text-tandur" />
                    {fcmResponse && <span className="text-xs bg-red-300 absolute rounded-full py-[5px] px-[5px] top-2 -right-1"></span>}
                  </button>
                </div>

                <div
                  className={` ${
                    notifOpen ? "block" : "hidden"
                  } absolute right-0 z-10 -mr-20 mt-3 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <div className="p-4 overflow-hidden" role="none">
                    <div className="text-lg mb-4">Notifikasi</div>
                    {fcmResponse ? (
                      <div className="flex flex-col group/cart hover:bg-gray-200 rounded-lg px-4 py-2">
                        <div className="text-lg">{fcmResponse.title}</div>
                        <div className="text-[#7A7A7A] text-sm">{fcmResponse.body}</div>
                      </div>
                    ) : (
                      <div className="text-[#7A7A7A] text-md text-center py-8">Belum ada notifikasi!</div>
                    )}
                    {/* <button
                      type={"button"}
                      onClick={() => {}}
                      className={` text-tandur text-md bg-white border-2 border-tandur hover:bg-gray-100 active:bg-gray-100 active:text-tandur focus:outline-none disabled:bg-gray-300 w-full mt-3 py-2 rounded-2xl `}
                    >
                      Lihat Semua
                    </button> */}
                  </div>
                </div>
              </div>

              <div className="relative inline-block text-left" ref={ref}>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center items-center rounded-md"
                    onClick={() => setAvatarOpen(!avatarOpen)}
                  >
                    <img src={userInfo.IMG_USER} alt="" className="w-[35px] h-[35px] my-2 mr-2 img-fluid rounded-full" />
                    {username()}
                  </button>
                </div>
                <div
                  className={` ${
                    avatarOpen ? "block" : "hidden"
                  } absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <div className="py-1 pb-3 overflow-hidden" role="none">
                    {userInfo.IS_ADMIN == 1 && (
                      <>
                        <Link to={"/admin"}>
                          <button className="text-gray-700 w-[93%] text-left block px-4 py-2 rounded-lg text-sm mt-2 mx-2 mb-2 pr-2 pl-2 hover:bg-gray-100">
                            Dasbor Admin
                          </button>
                        </Link>
                        <div className="text-red-500 block w-full px-4 pb-2 text-left text-sm border-t-2"></div>
                      </>
                    )}

                    <Link to={"/profile"}>
                      <button
                        className={`${
                          userInfo.IS_ADMIN !== "1" && "mt-2"
                        } text-gray-700 w-[93%] text-left block px-4 py-2 rounded-lg text-sm mx-2 mb-2 pr-2 pl-2 hover:bg-gray-100`}
                      >
                        Profil Saya
                      </button>
                    </Link>
                    <div className="text-red-500 block w-full px-4 pb-2 text-left text-sm border-t-2"></div>
                    <Link
                      to={"/"}
                      onClick={() => {
                        dispatch(logout());
                      }}
                    >
                      <button type="submit" className="text-red-500 rounded-lg block w-[93%] mx-2 pr-2 pl-2 py-2 text-left text-sm hover:bg-red-200">
                        Keluar
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link to="/masuk">
              <button className="px-4 py-1 text-black border-gray-600 border-2 rounded-md shadow hover:bg-gray-200">Masuk</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
