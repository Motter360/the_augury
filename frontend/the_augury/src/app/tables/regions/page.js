"use client"

import React from "react";
import styles from "./regions.module.css"
import useFetchData from "@/utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";
import CreateForm from "@/components/CreateForm";

export default function RegionsTable(){
    const {data, loading, error} = useFetchData("regions")

    const [creatingRecord, setCreatingRecord]= React.useState(false)

    if(!creatingRecord){ 
    return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <button onClick={() => {setCreatingRecord(true)}}>Create New Entry</button>
                <Table 
                    data = {data} 
                    tableName = "regions"
                    />
            </div>
        );
    } else {
        return (
            <CreateForm 
                tableName="regions"
            />
        )
    }
}