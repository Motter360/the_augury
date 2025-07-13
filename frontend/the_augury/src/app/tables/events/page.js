"use client"

import React from "react";
import styles from "./events.module.css"
import useFetchData from "@/utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";

export default function EventsTable(){
    const {data, loading, error} = useFetchData("events")

    return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <Table data = {data} />
            </div>
        );
}