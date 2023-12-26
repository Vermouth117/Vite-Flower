import { Dispatch, SetStateAction, createContext, useState } from "react";

import About from "../components/pages/about/About";
import Cart from "../components/pages/cart/Cart";
import Contact from "../components/pages/contact/Contact";
import Home from "../components/pages/home/Home";
import OnlineShop from "../components/pages/online-shop/OnlineShop";
import Order from "../components/pages/order/Order";
import Page404 from "../components/pages/404/Page404";
import User from "../components/pages/user/User";
import { FlowerInfo } from "../models/types";

type Props = [
  buyCount: number | null,
  setBuyCount: Dispatch<SetStateAction<number | null>>,
  buyFlowerList: FlowerInfo[],
  setBuyFlowerList: Dispatch<SetStateAction<FlowerInfo[]>>
];

export const MyContext = createContext<Props>([null, () => {}, [], () => {}]);

export const CartRoutes = () => {
  const [buyCount, setBuyCount] = useState<number | null>(null);
  const [buyFlowerList, setBuyFlowerList] = useState<FlowerInfo[]>([]);

  return (
    <>
      <MyContext.Provider
        value={[buyCount, setBuyCount, buyFlowerList, setBuyFlowerList]}
      >
        <Cart />
      </MyContext.Provider>
    </>
  );
};

export const OnlineShopRoutes = () => {
  const [buyCount, setBuyCount] = useState<number | null>(null);
  const [buyFlowerList, setBuyFlowerList] = useState<FlowerInfo[]>([]);

  return (
    <>
      <MyContext.Provider
        value={[buyCount, setBuyCount, buyFlowerList, setBuyFlowerList]}
      >
        <OnlineShop />
      </MyContext.Provider>
    </>
  );
};

export const homeRoutes = [
  {
    path: "/",
    children: <Home />,
  },
  {
    path: "/about",
    children: <About />,
  },
  {
    path: "/cart",
    children: <CartRoutes />,
  },
  {
    path: "/contact",
    children: <Contact />,
  },
  {
    path: "/online-shop",
    children: <OnlineShopRoutes />,
  },
  {
    path: "/order",
    children: <Order />,
  },
  {
    path: "/user",
    children: <User />,
  },
  {
    path: "*",
    children: <Page404 />,
  },
];
