import React from "react";
import styles from "./FetchButton.css"

export default function FetchButton(){  

    return(
    <button 
        onClick={()=>console.log("clicked!", styles.fetchButton)}
        className={styles.fetchButton}
    ></button>
    )
}