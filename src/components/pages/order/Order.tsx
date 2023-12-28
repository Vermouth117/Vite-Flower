import { memo } from "react";

import styles from "./Order.module.scss";

const Order = memo(() => {
  return (
    <main className={styles.order}>
      <h2 className={styles.title}>Order</h2>
    </main>
  );
});

export default Order;
