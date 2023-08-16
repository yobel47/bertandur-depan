import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { LoadingModal } from "../components";
import { useDispatch, useSelector } from "react-redux";

const Admin = lazy(() => import("../pages/Admin"));
const Login = lazy(() => import("../pages/Auth/login"));
const PageNotFound = lazy(() => import("../pages/pageNotFound"));
const Register = lazy(() => import("../pages/Auth/Register"));
const Home = lazy(() => import("../pages/Home"));
const Verification = lazy(() => import("../pages/Auth/Verification"));
const TandurMarket = lazy(() => import("../pages/TandurMarket/TandurMarket"));
const Verify = lazy(() => import("../pages/Auth/Verify"));
const AddTandurMarket = lazy(() => import("../pages/TandurMarket/AddTandurMarket"));
const SuccessVerif = lazy(() => import("../pages/Auth/SuccessVerif"));
const Maps = lazy(() => import("../pages/Maps/Maps"));
const MarketSearch = lazy(() => import("../pages/TandurMarket/MarketSearch"));
const DetailProduct = lazy(() => import("../pages/TandurMarket/DetailProduct"));
const ConfirmOrder = lazy(() => import("../pages/TandurMarket/ConfirmOrder"));
const DetailOrder = lazy(() => import("../pages/TandurMarket/DetailOrder"));
const ProfileLayout = lazy(() => import("../pages/Profile/ProfileLayout"));
const CompleteOrder = lazy(() => import("../pages/TandurMarket/CompleteOrder"));
const CartLayout = lazy(() => import("../pages/Cart"));
const TutorialLayout = lazy(() => import("../pages/Tutorial/TutorialLayout"));
const DetailTutorial = lazy(() => import("../pages/Tutorial/DetailTutorial"));
const SavedTutorial = lazy(() => import("../pages/Tutorial/SavedTutorial"));
const UrbanFarming = lazy(() => import("../pages/UrbanFarming/UrbanFarming"));
const DetailLand = lazy(() => import("../pages/UrbanFarming/DetailLand"));
const ConfirmOrderLand = lazy(() => import("../pages/UrbanFarming/ConfirmOrderLand"));
const DetailRent = lazy(() => import("../pages/UrbanFarming/DetailRent"));
const AddUrbanFarming = lazy(() => import("../pages/UrbanFarming/AddUrbanFarming"));
const Transaction = lazy(() => import("../pages/Profile/Transaction"));
const Favorite = lazy(() => import("../pages/Profile/MyFavorite"));
const ManagementLand = lazy(() => import("../pages/Profile/ManagementLand"));
const MyProduct = lazy(() => import("../pages/Profile/MyProduct"));
const PreviewProduct = lazy(() => import("../pages/TandurMarket/PreviewProduct"));
const PreviewLand = lazy(() => import("../pages/UrbanFarming/PreviewLand"));

function MainRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Suspense fallback={<LoadingModal loading={true} styles={"z-[1300]"} />}>
        <Routes>
          <Route path="masuk" element={<Login />} />
          <Route path="daftar" element={<Register />} />
          <Route path="daftar/verifikasi" element={<Verification />} />
          <Route path="daftar/verify" element={<Verify />} />
          <Route path="daftar/verifikasiBerhasil" element={<SuccessVerif />} />
          <Route path="market" element={<TandurMarket />} />
          <Route path="market/tambah" element={<AddTandurMarket />} />
          <Route path="market/ubah/:id" element={<AddTandurMarket />} />
          <Route path="market/cari" element={<MarketSearch />} />
          <Route path="market/:id" element={<DetailProduct />} />
          <Route path="market/order/:id" element={<ConfirmOrder />} />
          <Route path="market/order/complete" element={<CompleteOrder />} />
          <Route path="transaction/market/:id" element={<DetailOrder />} />
          <Route path="transaction/land/:id" element={<DetailRent />} />
          <Route path="land" element={<UrbanFarming />} />
          <Route path="land/:id" element={<DetailLand />} />
          <Route path="land/order/:id" element={<ConfirmOrderLand />} />
          <Route path="land/tambah" element={<AddUrbanFarming />} />
          <Route path="land/ubah/:id" element={<AddUrbanFarming />} />
          <Route path="tutorial" element={<TutorialLayout />} />
          <Route path="tutorial/:id" element={<DetailTutorial />} />
          <Route path="tutorial/saved" element={<SavedTutorial />} />
          <Route path="cart" element={<CartLayout />} />
          <Route path="profile" element={<ProfileLayout />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="my-land" element={<ManagementLand />} />
          <Route path="my-land/:id" element={<PreviewLand />} />
          <Route path="my-product" element={<MyProduct />} />
          <Route path="my-product/:id" element={<PreviewProduct />} />
          <Route path="maps" element={<Maps />} />
          <Route path="/" element={<Home />} />
          {userInfo?.IS_ADMIN == "1" && <Route path="admin/*" element={<Admin />} />}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default MainRoute;
