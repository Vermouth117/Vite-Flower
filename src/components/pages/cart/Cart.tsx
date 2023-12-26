import { ChangeEvent, Fragment, MouseEvent, memo, useCallback, useContext, useEffect, useReducer, useState } from "react";

import "./Cart.css";
import { MyContext } from "../../../router/HomeRoutes";

const Cart = memo(() => {
  const [buyCount, setBuyCount, buyFlowerList, setBuyFlowerList] =
    useContext(MyContext);
  const [totalPriceList, setTotalPriceList] = useState<number[]>([]);

  useEffect(() => {
    const savedBuyFlowerList = localStorage.getItem("buyFlowerList");
    const restoredBuyCount = savedBuyFlowerList
      ? JSON.parse(savedBuyFlowerList)
      : null;
    setBuyFlowerList(restoredBuyCount);
  }, []);

  console.log(buyFlowerList);

  useEffect(() => {
    const savedBuyCount = localStorage.getItem("buyCount");
    const restoredBuyCount = savedBuyCount ? JSON.parse(savedBuyCount) : null;
    setBuyCount(restoredBuyCount);
  }, []);

  useEffect(() => {
    dispatch({ type: "update", value: buyCount });
  }, [buyCount]);

  const [count, dispatch] = useReducer(
    (
      prev: number | null,
      { type, value }: { type: string; value: number | null }
    ) => {
      switch (type) {
        case "decrease":
          return prev !== null ? --prev : null;
        case "increase":
          return prev !== null ? ++prev : null;
        case "update":
          return value === null || isNaN(value) ? null : value;
        default:
          return null;
      }
    },
    buyCount
  );

  useEffect(() => {
    setTotalPriceList(
      buyFlowerList.map((flowerInfo) => {
        return parseInt(flowerInfo.price) * (count ? count : 1);
      })
    );
  }, [count]);

  console.log(totalPriceList);

  const handleCount = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      console.log((e.currentTarget as HTMLButtonElement).getAttribute("class"));
      const action = (e.currentTarget as HTMLButtonElement).getAttribute(
        "class"
      );
      action && dispatch({ type: action, value: null });
    },
    []
  );

  const inputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log("inputChange", e.target.value);
    dispatch({ type: "update", value: parseInt(e.target.value) || null });
  }, []);

  const handleSubmitPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await Promise.all(
      buyFlowerList.map(async (flowerInfo, index) => {
        const postObj = {
          flower_id: flowerInfo["id"],
          flower_name: flowerInfo["name"],
          customer_name: "森﨑陽平",
          picture_url: flowerInfo["picture_url"],
          price: totalPriceList[index],
          quantity: buyCount,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,
        };
        const postData = await fetch(
          // "/order",
          "http://localhost:8080/order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postObj),
          }
        ).then((data) => data.json());
        console.log(postData);
        setBuyFlowerList([]);
        setTotalPriceList([]);
        localStorage.setItem("buyFlowerList", JSON.stringify([]));
      })
    );
  };

  return (
    <main className="cart-list">
      <h2 className="cart-title">Cart</h2>
      <form className="cart-form" onSubmit={handleSubmitPost}>
        <table className="cart-table">
          <thead>
            <tr>
              <th colSpan={2}></th>
              <th>価格</th>
              <th>個数</th>
              <th>合計</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ height: "auto" }}>
              <td
                style={{ padding: 0, borderTop: "1px solid #f1f1f1" }}
                colSpan={5}
              ></td>
            </tr>
            {buyFlowerList.map((flowerInfo, index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <td>
                      <img
                        className="cart-table-flower"
                        src={flowerInfo["picture_url"]}
                        alt="花束"
                      />
                    </td>
                    <td className="col2">
                      <h3 className="cart-table-flower-title">
                        {flowerInfo["name"]}
                      </h3>
                      <div>
                        <button type="button" className="deleteButton">
                          削除
                        </button>
                      </div>
                    </td>
                    <td>
                      <p className="online-shop-flower-price">
                        {flowerInfo &&
                          `¥${flowerInfo["price"]
                            .slice(0, -3)
                            .concat(",", flowerInfo["price"].slice(-3))}`}
                      </p>
                    </td>
                    <td>
                      <div className="cart-table-box">
                        <button
                          type="button"
                          className="decrease"
                          onClick={(e) => handleCount(e)}
                        >
                          −
                        </button>
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          value={count !== null ? count.toString() : ""}
                          className="quantity"
                          onChange={(e) => inputChange(e)}
                        />
                        <button
                          type="button"
                          className="increase"
                          onClick={(e) => handleCount(e)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <p className="online-shop-flower-price">
                        {totalPriceList[0] &&
                          `¥${totalPriceList[index]
                            .toString()
                            .slice(0, -3)
                            .concat(
                              ",",
                              totalPriceList[index].toString().slice(-3)
                            )}`}
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "auto" }}>
                    <td
                      style={{ padding: 0, borderTop: "1px solid #f1f1f1" }}
                      colSpan={5}
                    ></td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
        <section className="total-box">
          <div className="total-box-title">合計金額</div>
          <p className="online-shop-flower-price">{`¥${totalPriceList
            .reduce((prev, curr) => prev + curr, 0)
            .toString()
            .slice(0, -3)
            .concat(
              ",",
              totalPriceList
                .reduce((prev, curr) => prev + curr, 0)
                .toString()
                .toString()
                .slice(-3)
            )}`}</p>
        </section>
        <div className="cart-buy-button">
          <button>購入</button>
        </div>
      </form>
    </main>
  );
});

export default Cart;
