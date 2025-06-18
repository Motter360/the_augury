import React from "react";

export default function Table(props){
    const {data, tableName} = props
    if(data){
        console.log(data)
        if(data.length > 0){ 
            return(
            <ul>
                {data.map((record, index) =>(
                    <li key={record.id}>
                        <a  href={`/tables/${tableName}/${record.id}`}>{record.name}</a>
                    </li>
                ))}
            </ul> 
            )
        } else {
            return(
                <p>This Table Is Empty, Poke!</p>
            )
        }
        }
    }
