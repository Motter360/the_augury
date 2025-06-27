"use client"

import React from "react";
import Record from "@/components/Record";
import useFetchData from "@/utilities/UseFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";
import RelatedRecords from "@/components/RelatedRecords";

export default function Faction() {
    const params = useParams()
    const path = "factions/" + params.faction_id
    const relatedDataPath = `queryJoinTable/npc_factions/faction_id/npc_id/${params.faction_id}`
    const {data, loading, error} = useFetchData(path)
    const relatedData = useFetchData(relatedDataPath)

    return( 
        <>
            <Loading  loading={loading}/>
            <Error error={error} />
            <Record 
                data = {data}
            />

            <RelatedRecords 
                relatedData = {relatedData.data}
                dataType = "npcs"
            />


        </>
    )
   
}