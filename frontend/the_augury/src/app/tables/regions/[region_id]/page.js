"use client"

import React from "react";
import Record from "@/components/Record";
import useFetchData from "@/utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";
import RelatedRecords from "@/components/RelatedRecords";
import EditRecord from "@/components/EditForm";

export default function Region() {
    const params = useParams()
    const path = "regions/" + params.region_id
    const {data, loading, error} = useFetchData(path)

    const realmsData = useFetchData("realms")
    const rawCitiesData = useFetchData("cities")

    const citiesData = rawCitiesData.data ? 
        rawCitiesData.data.filter(
            (city) => (city.regions_id === parseInt(params.region_id))
        ) : null

    const [edit, setEdit] = React.useState(false)
    const toggleEdit = () => setEdit((bool) => !bool)
                
    if(edit === false){
        return( 
            <>
                <Loading  loading={loading}/>
                <Error error={error}/>
                <button onClick={toggleEdit}>Edit</button>
                <Record 
                    data={data}
                    realmsData={realmsData.data}
                />
                <RelatedRecords 
                    relatedData={citiesData}
                    dataType="cities"
                />
            </>
        )
    } else {
        return(
            <EditRecord 
                path={path}
                data={data}
                realmsData={realmsData.data}
            />
        )
    }  
}