import React from "react";

export default function DndClassComponent(props){
    const {record} = props

    return(
        <>
            <label htmlFor="DndClass">Class</label>
            <input type="text" id="DndClass" name="DndClass" placeholder="Class" defaultValue={record.class} required/>
        </>
    )
}