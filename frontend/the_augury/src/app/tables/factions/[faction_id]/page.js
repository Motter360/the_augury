"use client"

import React from "react";
import Record from "@/components/Record";
import useFetchData from "@/utilities/UseFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";
import RelatedRecords from "@/components/RelatedRecords";
import EditRecord from "@/components/EditForm";

export default function Faction() {
    const params = useParams()
    const path = "factions/" + params.faction_id
    const relatedDataPath = `queryJoinTable/npc_factions/faction_id/npc_id/${params.faction_id}`
    const {data, loading, error} = useFetchData(path)
    const relatedNPCs = useFetchData(relatedDataPath)
    const npcsData = useFetchData('npcs')
    const [edit, setEdit] = React.useState(false)
    const toggleEdit = () => setEdit((bool) => !bool)
    
    if(edit === false){
        return( 
            <>
                <Loading  loading={loading}/>
                <Error error={error} />
                <button onClick={toggleEdit}>Edit</button>
                <Record data = {data} />
                <RelatedRecords 
                    relatedData = {relatedNPCs.data}
                    dataType = "npcs"
                />
            </>
        )
    } else {
        return(
            <EditRecord 
                path={path}
                data={data}
                relatedNPCs={relatedNPCs.data}
                npcsData={npcsData.data}
            />
        )
    }
}