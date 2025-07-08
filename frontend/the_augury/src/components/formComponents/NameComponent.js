import React from "react";

export default function NameComponent(props){
    const {record} = props

    return(
        <>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Name" defaultValue={record.name} required/>
        </>
    )
}