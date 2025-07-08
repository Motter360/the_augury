"use client"

import React from "react";
import Record from "@/components/Record";
import useFetchData from "@/utilities/UseFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useParams } from "next/navigation";
import RelatedRecords from "@/components/RelatedRecords";
import EditRecord from "@/components/EditForm";

export default function Realm() {
    const params = useParams()
    const path = "realms/" + params.realm_id
    const {data, loading, error} = useFetchData(path)
    const rawRegionsData = useFetchData("regions")
    const regionsData = rawRegionsData.data ? 
        rawRegionsData.data.filter(
            (region) => (region.realms_id === parseInt(params.realm_id))
        ) : null
    const [edit, setEdit] = React.useState(false)
    const toggleEdit = () => setEdit((bool) => !bool)
            
    if(edit === false){
        return( 
            <>
                <Loading  loading={loading} />
                <Error error={error} />
                <button onClick={toggleEdit}>Edit</button>
                <Record data={data} />
                <RelatedRecords 
                    relatedData={regionsData}
                    dataType = "regions"
                />
            </>
        )
    } else {
            return(
                <EditRecord 
                    path={path}
                    data={data}
                />
            )
        }
    }