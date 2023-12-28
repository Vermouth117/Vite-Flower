import { memo } from "react";

import styles from "./Home.module.scss";

const Home = memo(() => {
  return (
    <main>
      <div className={styles.homeImage}></div>
    </main>
  );
});

export default Home;
