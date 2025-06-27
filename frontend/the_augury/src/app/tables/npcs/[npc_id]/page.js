"use client"

import React from "react";
import Record from "@/components/Record";
import useFetchData from "@/utilities/UseFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";
import RelatedRecords from "@/components/RelatedRecords";

export default function Npc() {
    const params = useParams()
    const path = "npcs/" + params.npc_id

        //'/queryJoinTable/:table/:feildYouHave/:feildYouWant/:id'
    const relatedFactionDataPath = `queryJoinTable/npc_factions/npc_id/faction_id/${params.npc_id}`
    const relatedCityDataPath = `queryJoinTable/npc_cities/npc_id/city_id/${params.npc_id}`
    const {data, loading, error} = useFetchData(path)
    const relatedCityData = useFetchData(relatedCityDataPath)
    const relatedFactionData = useFetchData(relatedFactionDataPath)

    return( 
        <>
            <Loading  loading={loading}/>
            <Error error={error} />
            <Record data = {data} />
            <RelatedRecords 
                relatedData = {relatedCityData.data}
                dataType = "cities"
            />
            <RelatedRecords 
                relatedData = {relatedFactionData.data}
                dataType = "factions"
            />
        </>
    )
   
}