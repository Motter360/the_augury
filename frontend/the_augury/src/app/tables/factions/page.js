"use client"

import React from "react";
import styles from "./factions.module.css"
import useFetchData from "@/utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";

export default function factionsTable(){
    const {data, loading, error} = useFetchData("factions")

    return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <Table data = {data} />
            </div>
        );
}