import { memo, useCallback, useEffect, useRef, useState } from "react";

import "./OnlineShop.css";
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
    <main className="online-shop">
      <h2 className="online-shop-title">Flower</h2>
      <article className="online-shop-flower-cardList">
        {FlowerList.map((flowerInfo: FlowerInfo, index) => {
          return (
            <section
              key={flowerInfo.id}
              className="online-shop-flower-card"
              onClick={() => handleClick(index)}
            >
              <div>
                <img
                  className="online-shop-flower-image"
                  src={flowerInfo["picture_url"]}
                  alt={flowerInfo["name"]}
                />
              </div>
              <h3 className="online-shop-flower-title">{flowerInfo["name"]}</h3>
              <p className="online-shop-flower-price">
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
