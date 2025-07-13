"use client"

import React from "react";
import styles from "./npcs.module.css"
import useFetchData from "@/utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";
import CreateForm from "@/components/CreateForm";

export default function NpcsTable(){
    const {data, loading, error} = useFetchData("npcs")
    const citiesData = useFetchData("cities")
    const factionsData = useFetchData("factions")

    const [creatingRecord, setCreatingRecord]= React.useState(false)

    if(!creatingRecord){ 
    return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <button onClick={() => {setCreatingRecord(true)}}>Create New Entry</button>
                <Table 
                    data = {data}
                    tableName = 'npcs'
                    />
            </div>
        );
    } else {
        return (
            <CreateForm 
                citiesData={citiesData.data}
                factionsData={factionsData.data}
                dndClass={true}
                tableName="npcs"
            />
        )
    }
}