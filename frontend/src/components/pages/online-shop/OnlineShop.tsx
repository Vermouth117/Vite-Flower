import { memo, useCallback, useEffect, useRef, useState } from "react";

import Modal from "./Modal";
import styles from "./OnlineShop.module.scss";
import { FlowerInfo } from "../../../models/types";

const OnlineShop = memo(() => {
  const [flowerList, setFlowerList] = useState<FlowerInfo[]>([]);
  const [flowerInfo, setFlowerInfo] = useState<FlowerInfo | undefined>();
  const inputTriggerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const flowerList = await fetch(
        // "/flowerList"
        "http://localhost:8080/flowerList"
      ).then((data) => data.json());
      setFlowerList(flowerList);
    })();
  }, []);

  const handleClick = useCallback((index: number) => {
      setFlowerInfo(flowerList[index]);
      inputTriggerRef.current?.click();
  }, [flowerList]);

  return (
    <main className={styles.onlineShop}>
      <h2 className={styles.pageTitle}>Flower</h2>
      <article className={styles.flowerCardList}>
        {flowerList.map((flowerInfo: FlowerInfo, index: number) => {
          return (
            <section
              key={flowerInfo.id}
              className={styles.flowerCard}
              onClick={() => handleClick(index)}
            >
              <div>
                <img
                  className={styles.flowerImage}
                  src={flowerInfo.pictureUrl}
                  alt={flowerInfo.name}
                />
              </div>
              <h3 className={styles.flowerTitle}>{flowerInfo.name}</h3>
              <p className={styles.flowerPrice}>
                {`¥ ${flowerInfo.price
                  .slice(0, -3)
                  .concat(",", flowerInfo.price.slice(-3))}`}
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
