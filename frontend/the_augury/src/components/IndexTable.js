import React from "react";
import capFirstLetter from "@/utilities/capitalizeFirstLetter";

export default function IndexTable(props){
    const {data} = props
    if(data){
        return(
            <ul>
                {data.map((table) =>(
                    <li key={table.name}>
                        <a href={`/tables/${table.name}`}>{capFirstLetter(table.name)}</a>
                    </li>
                ))}
            </ul> 
        ) 
        }
    }
