"use client"

import React from "react";
import Record from "@/components/Record";
import useFetchData from "@/utilities/UseFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";
import RelatedRecords from "@/components/RelatedRecords";
import EditRecord from "@/components/EditForm";

export default function Npc() {
    const params = useParams()

    const path = "npcs/" + params.npc_id
    const relatedCityDataPath = `queryJoinTable/npc_cities/npc_id/city_id/${params.npc_id}`
    const relatedFactionDataPath = `queryJoinTable/npc_factions/npc_id/faction_id/${params.npc_id}`

    const {data, loading, error} = useFetchData(path)

    const relatedCities = useFetchData(relatedCityDataPath)
    const citiesData = useFetchData("cities")

    const relatedFactions = useFetchData(relatedFactionDataPath)
    const factionsData = useFetchData("factions")

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
                    relatedData = {relatedCities.data}
                    dataType = "cities"
                />
                <RelatedRecords 
                    relatedData = {relatedFactions.data}
                    dataType = "factions"
                />
            </>
        )
    } else {
        return(
            <EditRecord 
                path={path}
                data={data}
                relatedCities={relatedCities.data}
                citiesData={citiesData.data}
                relatedFactions={relatedFactions.data}
                factionsData={factionsData.data}
            />
        )
    }
}