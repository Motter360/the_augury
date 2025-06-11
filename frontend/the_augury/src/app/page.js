"use client"

import React from "react";
import styles from "./page.module.css";


export default function Home() {

  const [data, setData] = React.useState(null);

  React.useEffect(()=>{

    let tables = []

    setData(async()=>{
      let response = await fetch("http://localhost:4000/");
      response = await response.json();
      console.log(response)
      //response.map((table)=> tables.push(table.name));
      return response
    })

    console.log(tables)

  },[])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
       <div>{data === null ? "no data dummy!" : data}</div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
