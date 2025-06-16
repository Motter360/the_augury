"use client"

import React from "react";
import styles from "./regions.module.css"
import useFetchData from "@/utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";

export default function regionsTable(){
    const {data, loading, error} = useFetchData("regions")

    return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <Table data = {data} />
            </div>
        );
}