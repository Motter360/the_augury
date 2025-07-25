"use client"

import React from "react";
import Record from "@/components/Record";
import useFetchData from "@/utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";
import RelatedRecords from "@/components/RelatedRecords";
import EditRecord from "@/components/EditForm";

export default function City() {
    const params = useParams()
    const path = "cities/" + params.city_id
    const relatedDataPath = `queryJoinTable/npc_cities/city_id/npc_id/${params.city_id}`
    const  {data, loading, error} = useFetchData(path)
    const relatedNPCs = useFetchData(relatedDataPath)
    const regionsData = useFetchData("regions")
    const npcsData = useFetchData('npcs')
    const [edit, setEdit] = React.useState(false)
    const toggleEdit = () => setEdit((bool) => !bool)

    if(edit === false){
        return( 
            <>
                <Loading loading={loading}/>
                <Error error={error} />
                <button onClick={toggleEdit}>Edit</button>
                <Record 
                    data={data}
                    regionsData={regionsData.data}
                />
                <RelatedRecords 
                    relatedData = {relatedNPCs.data}
                    dataType = "npcs"
                />
            </>
        )
    } else {
        return(
            <EditRecord 
                data={data}
                path={path}
                regionsData={regionsData.data} 
                relatedNPCs={relatedNPCs.data}
                npcsData={npcsData.data}
            />
        )
    }
}