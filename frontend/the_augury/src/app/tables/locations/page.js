"use client"

import React from "react";
import styles from "./locations.module.css"
import useFetchData from "@/utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";

export default function locationsTable(){
    const {data, loading, error} = useFetchData("locations")

    return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <Table 
                    data = {data}
                    tableName = "locations"
                    />
            </div>
        );
}