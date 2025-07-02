import React from "react";

export default function DescriptionComponent(props){
    const {record} = props
    return(
        <>
            <label htmlFor="description">Discription</label>
            <textarea 
                className="descriptionInput"
                id="description" 
                placeholder="Descprition" 
                defaultValue={record.description}/>
        </>
    )
}