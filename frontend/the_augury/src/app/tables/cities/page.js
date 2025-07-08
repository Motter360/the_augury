"use client"

import React from "react";
import styles from "./cities.module.css"
import useFetchData from "@/utilities/UseFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";

export default function CitiesTable(){
    const {data, loading, error} = useFetchData("cities")

    const [creatingRecord, setCreatingRecord]= React.useState(false)

    return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <Table 
                    data = {data}
                    tableName = "cities" 
                    />
            </div>
        );
}
