import React from "react";
import doesExist from "@/utilities/doesExist";
import Link from "next/link";
import filter from "@/utilities/filter";

export default function Record(props){
    const {data, regionsData, realmsData} = props

    if(data){
        const item = data[0]
        const name = doesExist(item.name, "Can I get a cheese with Nothin'? Nuthin??")
        const description = doesExist(item.description,"No description yet, poke!")
        const regions_id = doesExist(item.regions_id, null)
        const realms_id = doesExist(item.realms_id, null)
        const dnd_class = doesExist(item.class, null)
        const realmName = realmsData ? filter(realms_id, realmsData) : realms_id    
        const regionName = regionsData ? filter(regions_id, regionsData) : regions_id

        return(
            <>
                <h1>{name}</h1>
                {dnd_class ? <h3>{dnd_class}</h3> : null}
                {regions_id ? <h4>Region: {regionName}</h4> : null}
                {realms_id ? <h4>Realm: {realmName}</h4> : null}
                <Link href="/">Home</Link>
                <p>{description}</p>
            </>
        )
    }
}

