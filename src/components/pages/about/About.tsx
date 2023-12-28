import { memo } from "react";

import styles from "./About.module.scss";

const About = memo(() => {
  return (
    <main className={styles.about}>
      <h2 className={styles.title}>About</h2>
    </main>
  );
});

export default About;
