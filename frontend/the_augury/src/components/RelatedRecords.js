import React from "react";
import Link from "next/link";
import capitalizeFirstLetter from "@/utilities/capitalizeFirstLetter";

export default function RelatedRecords(props){
    const {relatedData, dataType} = props
    
    if (relatedData){
        
        return(
            <>
                <h3>{capitalizeFirstLetter(dataType)}</h3>
                {relatedData.length === 0 ? 
                "Nothing Here, Poke!" 
                :
                <ul>
                    {relatedData.map(record => (
                        <li key={record.name}>
                            <Link href={`/tables/${dataType}/${record.id}`}>{record.name}</Link>
                        </li>)
                    )}
                </ul>}
            </>
        )
    }
}