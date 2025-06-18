import React from "react";
import doesExist from "@/utilities/doesExist";
import RelatedRecords from "./RelatedRecords";

export default function Record(props){
    const {data, relatedData} = props

    if(data){
        const item = data[0]
        const name = doesExist(item.name, "Can I get a cheese with Nothin'? Nuthin??")
        const description = doesExist(item.description,"No description yet, poke!")
        const regions_id = doesExist(item.regions_id, null)
        const realms_id = doesExist(item.realms_id, null)
        const dnd_class = doesExist(item.class, null)
        return(
            <>
                <h1>{name}</h1>
                {dnd_class ? <h3>{dnd_class}</h3> : null}
                {regions_id ? <h4>Region: {regions_id}</h4> : null}
                {realms_id ? <h4>Realm: {realms_id}</h4> : null}
                <p>{description}</p>
                <RelatedRecords 
                    relatedData = {relatedData}
                />
            </>
        )
    }
}

