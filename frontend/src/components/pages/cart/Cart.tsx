import {ChangeEvent, Fragment, memo, MouseEvent, useCallback, useEffect, useReducer, useState} from "react";

import styles from "./Cart.module.scss";
import {handleCountUtil} from "../../../utils";
import {OrderFlowerInfo} from "../../../models/types";

const Cart = memo(() => {
  const [cartList, setCartList] = useState<OrderFlowerInfo[]>([]);
  const [totalPriceList, setTotalPriceList] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const cartList = await fetch(
        "http://localhost:8080/cartList"
      ).then((data) => data.json());
      setCartList(cartList);
    })();
  }, []);

  useEffect(() => {
    dispatch({ type: "update", value: cartList.map((cartInfo) => cartInfo.quantity), index: null });
  }, [cartList]);

  const [count, dispatch] = useReducer((
    prev: number[] | null,
    { type, value, index }: { type: string; value: number[] | number | null, index: number | null },
  ): number[] | null => {
    switch (type) {
      case "decrease":
        if (prev && prev[index!] > 0) {
          const updatedPrev = [...prev];
          --updatedPrev[index!];
          return updatedPrev;
        }
        return prev;
      case "increase":
        if (prev) {
          const updatedPrev = [...prev];
          ++updatedPrev[index!];
          return updatedPrev;
        }
        return prev;
      case "update":
        if (Array.isArray(value)) {
          return value;
        } else if (prev) {
          const updatedPrev = [...prev];
          updatedPrev[index!] = value ? value : 0;
          return updatedPrev;
        }
        return prev;
      default:
        return null;
    }
  }, []);

  const handleCount = useCallback((e: MouseEvent<HTMLButtonElement>, index: number) => {
    const action = handleCountUtil(e);
    action && dispatch({ type: action, value: null, index: index });
  }, []);

  const inputChange = useCallback((e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch({ type: "update", value: parseInt(e.target.value) || null, index: index });
  }, []);

  const handleSubmitPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCartList([])
    await Promise.all(
      cartList.map(async (cartInfo, index) => {
        const patchObj: OrderFlowerInfo = {
          id: cartInfo.id,
          flowerId: cartInfo.flowerId,
          flowerName: cartInfo.flowerName,
          customerName: "森﨑陽平",
          price: totalPriceList[index].toString(),
          quantity: cartInfo.quantity,
          date: `${new Date().getFullYear()
          }-${new Date().getMonth() + 1
          }-${new Date().getDate()}`,
          pictureUrl: cartInfo.pictureUrl,
          cart: false,
        };

        await fetch(
          "http://localhost:8080/purchase",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(patchObj),
          }
        );
        setTotalPriceList([]);
      })
    );
  };

  const handleDelete = useCallback(
    async (index: number) => {
      await fetch(
        "http://localhost:8080/deleteInCart",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartList[index]),
        }
      );
      setCartList((prev) => {
        const newCartList = [...prev]
        newCartList.splice(index, 1)
        return newCartList
      });
    },
    [cartList]
  );

  useEffect(() => {
    setTotalPriceList(
      cartList.map((cartInfo, index) => {
        return parseInt(cartInfo.price) * count![index];
      })
    );
  }, [cartList, count]);

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
              <th style={{ width: "130px" }}>合計</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ height: "auto" }}>
              <td
                style={{ padding: 0, borderTop: "1px solid #f1f1f1" }}
                colSpan={5}
              ></td>
            </tr>
            {cartList.map((cartInfo, index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <td>
                      <img
                        className={styles.flowerImage}
                        src={cartInfo.pictureUrl}
                        alt="花束"
                      />
                    </td>
                    <td className={styles.col2}>
                      <h3 className={styles.flowerTitle}>
                        {cartInfo.flowerName}
                      </h3>
                      <div>
                        <button
                          type="button"
                          className={styles.deleteButton}
                          onClick={() => handleDelete(index)}
                        >
                          削除
                        </button>
                      </div>
                    </td>
                    <td>
                      <p className={styles.defaultFlowerPrice}>
                        {cartInfo &&
                          `¥ ${cartInfo.price
                            .toString()
                            .slice(0, -3)
                            .concat(",", cartInfo.price
                              .toString()
                              .slice(-3))}`}
                      </p>
                    </td>
                    <td>
                      <div className={styles.quantityBox}>
                        <button
                          type="button"
                          className={styles.decrease}
                          onClick={(e) => handleCount(e, index)}
                        >
                          −
                        </button>
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          value={count && count[index] !== undefined ? count[index] : ""}

                          className={styles.quantityInput}
                          onChange={(e) => inputChange(e, index)}

                        />
                        <button
                          type="button"
                          className={styles.increase}
                          onClick={(e) => handleCount(e, index)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <p className={styles.flowerPrice}>
                        {totalPriceList[index]
                          ? `¥ ${totalPriceList[index]
                            .toString()
                            .slice(0, -3)
                            .concat(",", totalPriceList[index].toString().slice(-3))}`
                          : "¥ 0"}
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
            {`¥ ${totalPriceList.reduce((prev, curr) => prev + curr, 0)
              ? totalPriceList
                .reduce((prev, curr) => prev + curr, 0)
                .toString()
                .slice(0, -3)
                .concat(",", totalPriceList
                  .reduce((prev, curr) => prev + curr, 0)
                  .toString()
                  .slice(-3))
              : 0}`}
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
