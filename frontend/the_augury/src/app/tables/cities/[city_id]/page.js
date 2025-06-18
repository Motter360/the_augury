"use client"

import React from "react";
import Record from "@/components/Record";
import useFetchData from "@/utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";

export default function City() {
    const params = useParams()
    const path = "cities/" + params.city_id
    const relatedDataPath = `queryJoinTable/npc_cities/city_id/npc_id/${params.city_id}`
    const {data, loading, error} = useFetchData(path)
    const { relatedData, relatedLoading, relatedError} = useFetchData(relatedDataPath)

    console.log(relatedData)

    return( 
        <>
            <Loading  loading={loading}/>
            <Error error={error} />
            <Record 
                data={data}
                relatedData = {relatedData}
                relatedLoading = {relatedLoading}
                relatedError = {relatedError}
            />
        </>
    )
   
}