import { Fragment, memo, useCallback, useEffect, useState } from "react";

import "./User.css";

export type Props = {
  flower_id: number;
  flower_name: string;
  customer_name: string;
  picture_url: string;
  price: string;
  quantity: number;
  date: string;
};

const User = memo(() => {
  const [orderFlowerList, setOrderFlowerList] = useState<Props[]>([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    (async () => {
      const orderFlowerList = await fetch(
        // "/order"
        "http://localhost:8080/order"
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
      console.log(orderFlowerList[index]);
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
    <main className="user-info">
      <h2 className="user-title">History</h2>
      <form className="cart-form">
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
            {orderFlowerList.map((flowerInfo, index) => (
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
                      {flowerInfo["flower_name"]}
                    </h3>
                    <button
                      type="button"
                      className="deleteButton"
                      onClick={() => handleCancel(index)}
                    >
                      キャンセル
                    </button>
                  </td>
                  <td>
                    <p className="online-shop-flower-price">{`¥${(
                      parseInt(flowerInfo["price"]) / flowerInfo["quantity"]
                    )
                      .toString()
                      .slice(0, -3)
                      .concat(
                        ",",
                        (parseInt(flowerInfo["price"]) / flowerInfo["quantity"])
                          .toString()
                          .slice(-3)
                      )}`}</p>
                  </td>
                  <td>
                    <div className="history-table-box">
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        className="quantity"
                        defaultValue={flowerInfo["quantity"]}
                      />
                    </div>
                  </td>
                  <td>
                    <p className="online-shop-flower-price">{`¥${flowerInfo[
                      "price"
                    ]
                      .slice(0, -3)
                      .concat(",", flowerInfo["price"].slice(-3))}`}</p>
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
        <section className="total-box">
          <div className="total-box-title">合計金額</div>
          <p className="online-shop-flower-price">{`¥${orderFlowerList
            .reduce((prev, curr) => prev + parseInt(curr["price"]), 0)
            .toString()
            .slice(0, -3)
            .concat(
              ",",
              orderFlowerList
                .reduce((prev, curr) => prev + parseInt(curr["price"]), 0)
                .toString()
                .slice(-3)
            )}`}</p>
        </section>
      </form>
    </main>
  );
});

export default User;
