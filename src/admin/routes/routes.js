import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
// layouts
import DashboardLayout from "../layouts/dashboard";
import Page404 from "../pages/Page404";

import Land from "../pages/Land";
import Product from "../pages/Product";
import Tutorial from "../pages/Tutorial";
import DetailTutorial from "../pages/DetailTutorial";
import User from "../pages/User";
import AddUser from "../pages/User/AddUser";
import AddTutorial from "../pages/Tutorial/AddTutorial";
import AddDetailTutorial from "../pages/Tutorial/DetailTutorial/AddDetailTutorial";
import AddProduct from "../pages/Product/AddProduct";
import AddLand from "../pages/Land/AddLand";
import ViewLand from "../pages/Land/ViewLand";
import ViewProduct from "../pages/Product/ViewProduct";
import ViewUser from "../pages/User/ViewUser";
import UrbanFarming from "../pages/Transaction/UrbanFarming";
import ViewTransactionUrban from "../pages/Transaction/UrbanFarming/view";
import TandurMarket from "../pages/Transaction/TandurMarket";
import ViewTransactionMarket from "../pages/Transaction/TandurMarket/view";
import ErrorSomethingWrong from "../pages/Error";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "*",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="dashboard" />, index: true },
        {
          path: "*",
          element: <Page404 />,
        },
        { path: "dashboard", element: <Dashboard /> },
        { path: "haha", element: <ErrorSomethingWrong /> },
        { path: "land", element: <Land /> },
        { path: "land/add", element: <AddLand /> },
        { path: "land/update", element: <AddLand /> },
        { path: "land/view", element: <ViewLand /> },
        { path: "product", element: <Product /> },
        { path: "product/add", element: <AddProduct /> },
        { path: "product/update", element: <AddProduct /> },
        { path: "product/view", element: <ViewProduct /> },
        { path: "tutorial", element: <Tutorial /> },
        { path: "tutorial/add", element: <AddTutorial /> },
        { path: "tutorial/update", element: <AddTutorial /> },
        { path: "tutorial/detail/:id", element: <DetailTutorial /> },
        { path: "tutorial/detail/:id/add", element: <AddDetailTutorial /> },
        { path: "tutorial/detail/:id/update", element: <AddDetailTutorial /> },
        { path: "user", element: <User /> },
        { path: "user/add", element: <AddUser /> },
        { path: "user/update", element: <AddUser /> },
        { path: "user/view", element: <ViewUser /> },
        { path: "transaction/land", element: <UrbanFarming /> },
        { path: "transaction/land/view", element: <ViewTransactionUrban /> },
        { path: "transaction/product", element: <TandurMarket /> },
        { path: "transaction/product/view", element: <ViewTransactionMarket /> },
      ],
    },
  ]);

  return routes;
}
