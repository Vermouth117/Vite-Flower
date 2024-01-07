import { ChangeEvent, Fragment, MouseEvent, memo, useCallback, useContext, useEffect, useReducer, useState } from "react";

import styles from "./Cart.module.scss";
import { MyContext } from "../../../router/HomeRoutes";

const Cart = memo(() => {

  const [buyCount, setBuyCount, buyFlowerList, setBuyFlowerList] = useContext(MyContext);
  const [totalPriceList, setTotalPriceList] = useState<number[]>([]);

  useEffect(() => {
    const savedBuyFlowerList = localStorage.getItem("buyFlowerList");
    const restoredBuyCount = savedBuyFlowerList
      ? JSON.parse(savedBuyFlowerList)
      : null;

    setBuyFlowerList(restoredBuyCount);
  }, []);

  useEffect(() => {
    const savedBuyCount = localStorage.getItem("buyCount");
    const restoredBuyCount = savedBuyCount
      ? JSON.parse(savedBuyCount)
      : null;

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

  const handleCount = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const buttonClass = (e.currentTarget as HTMLButtonElement).getAttribute("class");

    if (buttonClass) {
      const firstUnderscoreIndex = buttonClass.indexOf("_");
      const secondUnderscoreIndex = buttonClass.indexOf("_", firstUnderscoreIndex + 1);
      const action = buttonClass.substring(firstUnderscoreIndex + 1, secondUnderscoreIndex);

      action && dispatch({ type: action, value: null });
    }
  }, []);

  const inputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
          picture_url: flowerInfo["pictureUrl"],
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

  console.log(count);

  return (
    <main className={styles.cartList}>
      <h2 className={styles.pageTitle}>Cart</h2>
      <form onSubmit={handleSubmitPost}>
        <table>
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
                        className={styles.flowerImage}
                        src={flowerInfo["pictureUrl"]}
                        alt="花束"
                      />
                    </td>
                    <td className={styles.col2}>
                      <h3 className={styles.flowerTitle}>
                        {flowerInfo["name"]}
                      </h3>
                      <div>
                        <button type="button" className={styles.deleteButton}>
                          削除
                        </button>
                      </div>
                    </td>
                    <td>
                      <p className={styles.flowerPrice}>
                        {flowerInfo &&
                          `¥${flowerInfo["price"]
                            .slice(0, -3)
                            .concat(",", flowerInfo["price"].slice(-3))}`}
                      </p>
                    </td>
                    <td>
                      <div className={styles.quantityBox}>
                        <button
                          type="button"
                          className={styles.decrease}
                          onClick={(e) => handleCount(e)}
                        >
                          −
                        </button>
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          value={count !== null ? count.toString() : ""}
                          className={styles.quantityInput}
                          onChange={(e) => inputChange(e)}
                        />
                        <button
                          type="button"
                          className={styles.increase}
                          onClick={(e) => handleCount(e)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <p className={styles.flowerPrice}>
                        {totalPriceList[0] &&
                          `¥${totalPriceList[index]
                            .toString()
                            .slice(0, -3)
                            .concat(",", totalPriceList[index].toString().slice(-3))}`}
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
        <section className={styles.totalBox}>
          <div className={styles.totalTitle}>合計金額</div>
          <p className={styles.totalFlowerPrice}>
            {`¥${totalPriceList
              .reduce((prev, curr) => prev + curr, 0)
              .toString()
              .slice(0, -3)
              .concat(",", totalPriceList
                .reduce((prev, curr) => prev + curr, 0)
                .toString()
                .toString()
                .slice(-3))}`}
          </p>
        </section>
        <div className={styles.buyButtonBox}>
          <button>購入</button>
        </div>
      </form>
    </main>
  );
});

export default Cart;
