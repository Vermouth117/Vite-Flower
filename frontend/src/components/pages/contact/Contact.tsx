import { memo } from "react";

import styles from "./Contact.module.scss";

const Contact = memo(() => {
  return (
    <main className={styles.contact}>
      <h2 className={styles.pageTitle}>Contact</h2>
    </main>
  );
});

export default Contact;
