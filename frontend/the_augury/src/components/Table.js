import React from "react";
import Link from "next/link";
import capFirstLetter from "@/utilities/capitalizeFirstLetter";

export default function Table(props){
    const {data, tableName} = props
    if(data){
        if(data.length > 0){ 
            return(
            <>
                <h1>{capFirstLetter(tableName)}</h1>
                <Link href="/">Home</Link>
                <ul>
                    {data.map((record) =>(
                        <li key={record.id}>
                            <Link href={`/tables/${tableName}/${record.id}`}>{capFirstLetter(record.name)}</Link>
                        </li>
                    ))}
                </ul> 
            </>
            )
        } else {
            return(
                <>
                    <h1>{tableName}</h1>
                    <Link href="/">Home</Link>
                    <p>This Table Is Empty, Poke!</p>
                </>
            )
        }
        }
    }
