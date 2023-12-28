import { memo, useCallback, useEffect, useRef, useState } from "react";

import styles from "./OnlineShop.module.scss";
import Modal from "./Modal";
import { FlowerInfo } from "../../../models/types";

const OnlineShop = memo(() => {
  const [FlowerList, setFlowerList] = useState([]);
  const [flowerInfo, setFlowerInfo] = useState<FlowerInfo | undefined>();
  const inputTriggerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const FlowerList = await fetch(
        // "/flowerList"
        "http://localhost:8080/flowerList"
      ).then((data) => data.json());

      setFlowerList(FlowerList);
    })();
  }, []);

  const handleClick = useCallback(
    (index: number) => {
      setFlowerInfo(FlowerList[index]);
      inputTriggerRef.current?.click();
    },
    [FlowerList]
  );

  return (
    <main className={styles.onlineShop}>
      <h2 className={styles.title}>Flower</h2>
      <article className={styles.flowerCardList}>
        {FlowerList.map((flowerInfo: FlowerInfo, index) => {
          return (
            <section
              key={flowerInfo.id}
              className={styles.flowerCard}
              onClick={() => handleClick(index)}
            >
              <div>
                <img
                  className={styles.flowerImage}
                  src={flowerInfo["picture_url"]}
                  alt={flowerInfo["name"]}
                />
              </div>
              <h3 className={styles.flowerTitle}>{flowerInfo["name"]}</h3>
              <p className={styles.flowerPrice}>
                {`¥${flowerInfo["price"]
                  .slice(0, -3)
                  .concat(",", flowerInfo["price"].slice(-3))}`}
              </p>
            </section>
          );
        })}
      </article>
      <Modal inputTriggerRef={inputTriggerRef} flowerInfo={flowerInfo} />
    </main>
  );
});

export default OnlineShop;
