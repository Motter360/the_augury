"use client"

import React from "react";
import styles from "./realms.module.css"
import useFetchData from "@/utilities/UseFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";
import CreateForm from "@/components/CreateForm";

export default function RealmsTable(){
    const {data, loading, error} = useFetchData("realms")

    const [creatingRecord, setCreatingRecord]= React.useState(false)

    if(!creatingRecord){ 
    return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <button onClick={() => {setCreatingRecord(true)}}>Create New Entry</button>
                <Table 
                    data = {data} 
                    tableName = "realms"
                    />
            </div>
        );
    } else {
        return (
            <CreateForm 
                tableName="realms"
            />
        )
    }
}