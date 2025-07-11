"use client"

import React from "react";
import styles from "./cities.module.css"
import useFetchData from "@/utilities/UseFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";
import CreateForm from "@/components/CreateForm"

export default function CitiesTable(){
    const {data, loading, error} = useFetchData("cities")
    const regionsData = useFetchData("regions")
    const npcsData = useFetchData('npcs')

    const [creatingRecord, setCreatingRecord]= React.useState(false)

    if(!creatingRecord){
        return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <button onClick={() => {setCreatingRecord(true)}}>Create New Entry</button>
                <Table 
                    data = {data}
                    tableName = "cities" 
                    />
            </div>
        );
    } else {
        return (
            <CreateForm 
                regionsData={regionsData.data}
                npcsData={npcsData.data}
                tableName="cities"
            />
        )
    }
    
}
