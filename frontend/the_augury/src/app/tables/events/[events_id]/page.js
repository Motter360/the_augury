"use client"

import React from "react";
import Record from "@/components/Record";
import useFetchData from "@/utilities/UseFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";

export default function Event() {
    const params = useParams()
    const path = "events/" + params.event_id
    const {data, loading, error} = useFetchData(path)

    return( 
        <>
            <Loading  loading={loading}/>
            <Error error={error} />
            <Record 
                data={data}
            />
        </>
    )
   
}