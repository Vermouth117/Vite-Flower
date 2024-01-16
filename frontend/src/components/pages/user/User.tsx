import { Fragment, memo, useCallback, useEffect, useState } from "react";

import styles from "./User.module.scss";
import { OrderFlowerInfo } from "../../../models/types";

const User = memo(() => {
  const [orderFlowerList, setOrderFlowerList] = useState<OrderFlowerInfo[]>([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    (async () => {
      const orderFlowerList = await fetch(
        "http://localhost:8080/purchase"
      ).then((data) => data.json());
      setOrderFlowerList(orderFlowerList);
    })();
  }, []);

  useEffect(() => {
    setOrderFlowerList(orderFlowerList);
  }, [flag]);

  console.log(orderFlowerList);

  const handleCancel = useCallback(
    async (index: number) => {
      const deleteData = await fetch(
        // "/deleteOrder",
        "http://localhost:8080/deleteOrder",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderFlowerList[index]),
        }
      ).then((data) => {
        orderFlowerList.splice(index, 1);
        console.log(orderFlowerList);
        setFlag(!flag);
        return data.json();
      });
      console.log(deleteData);
    },
    [orderFlowerList, flag]
  );

  return (
    <main className={styles.userInfo}>
      <h2 className={styles.pageTitle}>History</h2>
      <form>
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
            {orderFlowerList.map((flowerInfo, index) => (
              <Fragment key={index}>
                <tr>
                  <td>
                    <img
                      className={styles.flowerImage}
                      src={flowerInfo.pictureUrl}
                      alt="花束"
                    />
                  </td>
                  <td className={styles.col2}>
                    <h3 className={styles.flowerTitle}>
                      {flowerInfo.flowerName}
                    </h3>
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => handleCancel(index)}
                    >
                      キャンセル
                    </button>
                  </td>
                  <td>
                    <p className={styles.defaultFlowerPrice}>{`¥${(
                      parseInt(flowerInfo.price) / flowerInfo.quantity
                    )
                      .toString()
                      .slice(0, -3)
                      .concat(
                        ",",
                        (parseInt(flowerInfo.price) / flowerInfo.quantity)
                          .toString()
                          .slice(-3)
                      )}`}</p>
                  </td>
                  <td>
                    <div className={styles.historyTableBox}>
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        className={styles.quantityInput}
                        defaultValue={flowerInfo.quantity}
                      />
                    </div>
                  </td>
                  <td>
                    <p className={styles.flowerPrice}>{`¥${flowerInfo.price
                      .toString()
                      .slice(0, -3)
                      .concat(",", flowerInfo.price
                        .toString()
                        .slice(-3))}`}
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
            ))}
          </tbody>
        </table>
        <section className={styles.totalBox}>
          <div className={styles.totalTitle}>合計金額</div>
          <p className={styles.totalFlowerPrice}>
            {`¥ ${orderFlowerList.reduce((prev, curr) => prev + parseInt(curr.price), 0)
              ? orderFlowerList
                .reduce((prev, curr) => prev + parseInt(curr.price), 0)
                .toString()
                .slice(0, -3)
                .concat(
                  ",", orderFlowerList
                    .reduce((prev, curr) => prev + parseInt(curr.price), 0)
                    .toString()
                    .slice(-3))
              : 0}`}
          </p>
        </section>
      </form>
    </main>
  );
});

export default User;
