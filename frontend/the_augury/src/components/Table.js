import React from "react";

export default function Table(props){
    const {data} = props
    if(data){
        console.log(data)
        if(data.length > 0){ 
            return(
            <ul>
                {data.map((table, index) =>(
                    <li key={table.name}>{table.name}</li>
                ))}
            </ul> 
            )
        } else {
            return(
                <p>Nothing here, Poke!</p>
            )
        }
        }
    }
