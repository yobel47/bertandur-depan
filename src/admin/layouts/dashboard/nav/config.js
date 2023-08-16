import React from "react";
import { BiHome, BiLandscape, BiShoppingBag, BiUser, BiVideo, BiDollar } from "react-icons/bi";

const navConfig = [
  {
    subheader: "app",
    items: [
      {
        title: "dasbor",
        path: "dashboard",
        icon: <BiHome size={20} />,
      },
      {
        title: "lahan",
        path: "land",
        icon: <BiLandscape size={20} />,
      },
      {
        title: "produk",
        path: "product",
        icon: <BiShoppingBag size={20} />,
      },
      {
        title: "tutorial",
        path: "tutorial",
        icon: <BiVideo size={20} />,
      },
      {
        title: "pengguna",
        path: "user",
        icon: <BiUser size={20} />,
      },
      {
        title: "transaksi",
        path: "transaction",
        icon: <BiDollar size={20} />,
        children: [
          { title: "lahan", path: "transaction/land" },
          { title: "produk", path: "transaction/product" },
        ],
      },
    ],
  },
];

export default navConfig;
