"use client"

import React from "react";
import styles from "./factions.module.css"
import useFetchData from "@/utilities/UseFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";

export default function FactionsTable(){
    const {data, loading, error} = useFetchData("factions")

    return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <Table 
                    data = {data}
                    tableName = "factions" 
                    />
            </div>
        );
}