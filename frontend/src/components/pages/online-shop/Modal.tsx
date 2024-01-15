import { ChangeEvent, MouseEvent, memo, useCallback, useReducer } from "react";

import styles from "./Modal.module.scss";
import { ModalProps, OrderFlowerInfo } from "../../../models/types";
import { handleCountUtil } from "../../../utils";

const Modal = memo(({ inputTriggerRef, flowerInfo }: ModalProps) => {
  const [count, dispatch] = useReducer((
    prev: number | null,
    { type, value }: { type: string; value: number | null },
  ) => {
    switch (type) {
      case "decrease":
        return prev !== null && prev >= 1 ? --prev : 0;
      case "increase":
        return prev !== null ? ++prev : null;
      case "update":
        return value === null || isNaN(value) || value <= 0 ? null : value;
      default:
        return null;
    }
  }, 1);

  const handleCount = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const action = handleCountUtil(e);
    action && dispatch({ type: action, value: null });
  }, []);

  const inputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "update", value: parseInt(e.target.value) || null });
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch({ type: "update", value: 1 });
    inputTriggerRef.current?.click();

    if (flowerInfo) {
      const postCartInBody: OrderFlowerInfo = {
        flowerId: flowerInfo.id,
        flowerName: flowerInfo.name,
        customerName: "森﨑陽平",
        price: flowerInfo.price,
        quantity: count!!,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
        pictureUrl: flowerInfo.pictureUrl,
        cart: true,
      };

      await fetch(
        "http://localhost:8080/cartIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postCartInBody),
        }
      );
    }
  };

  const handleClickReset = useCallback(() => {
    dispatch({ type: "update", value: 1 });
  }, []);

  return (
    <main className={styles.modalWrap}>
      <input
        id="trigger"
        className={styles.trigger}
        type="checkbox"
        ref={inputTriggerRef}
        onClick={handleClickReset}
      />
      <article className={styles.modalOverlay}>
        <label htmlFor="trigger" className={styles.modalTrigger}></label>
        <section className={styles.modalContent}>
          <label htmlFor="trigger" className={styles.closeButton}>
            {" "}
            ✖️{" "}
          </label>
          <section className={styles.flowerModal}>
            <div>
              <img
                className={styles.flowerImage}
                src={flowerInfo && flowerInfo["pictureUrl"]}
                alt={flowerInfo && flowerInfo["name"]}
              />
            </div>
            <div className={styles.flowerCard}>
              <h2 className={styles.flowerTitle}>
                {flowerInfo && flowerInfo["name"]}
              </h2>
              <p className={styles.flowerPrice}>
                {flowerInfo &&
                  `¥${flowerInfo["price"]
                    .slice(0, -3)
                    .concat(",", flowerInfo["price"].slice(-3))}`}
              </p>
              <form onSubmit={handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <label
                          htmlFor="quantity"
                          className={styles.quantityLabel}
                        >
                          {" "}
                          個数{" "}
                        </label>
                      </th>
                      <td>
                        <div className={styles.quantityBox}>
                          <button
                            type="button"
                            className={styles.decrease}
                            onClick={handleCount}
                          >
                            −
                          </button>
                          <input
                            id="quantity"
                            name="quantity"
                            type="text"
                            value={count !== null ? count.toString() : ""}
                            className={styles.quantityInput}
                            onChange={(e) => inputChange(e)}
                          />
                          <button
                            type="button"
                            className={styles.increase}
                            onClick={handleCount}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className={styles.cartButton}>カートに入れる</button>
              </form>
            </div>
          </section>
          <p className={styles.description}>
            気品漂う紫色のブーケです。ブーケの中心を飾るのは、気品漂う紫色とフリルのように波打つ花びらが美しい、ラベンダーカラーのトルコキキョウ。約500品種の中から、ブーケの主役に相応しい逸品を厳選し、一輪でも存在感のあるトルコキキョウを贅沢に使用しました。そんなトルコキキョウを引き立てるのは、花姿、花色ともに個性豊かな旬の草花。トルコキキョウの紫を基調に曲線が美しいグリーンを合わせ、絶妙な色彩を織り成す上品なブーケに仕上げました。落ち着いた気品を感じさせる「Violet Night」は、男女問わずお楽しみいただけます。受け取った瞬間心ときめくひと束を、ぜひ大切な方へ贈ってみてはいかがでしょうか。
          </p>
        </section>
      </article>
    </main>
  );
});

export default Modal;
