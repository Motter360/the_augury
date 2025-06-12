"use client"

import React from "react";
import styles from "./page.module.css";
import getDataFromAPI from "./utilities/getDataFromAPI";


export default function Home() {

  const data = getDataFromAPI("players")
  console.log(data.value)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
       <div>{data === null ? "no data dummy!" : "data is not null"}</div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
