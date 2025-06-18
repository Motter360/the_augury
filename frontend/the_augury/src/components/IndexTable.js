import React from "react";

export default function IndexTable(props){
    const {data} = props
    if(data){
        console.log(data)
        return(
            <ul>
                {data.map((table) =>(
                    <li key={table.name}>
                        <a href={`/tables/${table.name}`}>{table.name}</a>
                    </li>
                ))}
            </ul> 
        ) 
        }
    }
