import { memo } from "react";

import styles from "./Page404.module.scss";

const Page404 = memo(() => {
  return (
    <main className={styles.page404}>
      <h2 className={styles.pageTitle}>Page404</h2>
    </main>
  );
});

export default Page404;
