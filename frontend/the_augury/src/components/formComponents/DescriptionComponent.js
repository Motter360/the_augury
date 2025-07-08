import React from "react";

export default function DescriptionComponent(props){
    const {record} = props
    return(
        <>
            <label htmlFor="description">Discription</label>
            <textarea 
                className="descriptionInput"
                name="description"
                id="description" 
                placeholder="Descprition" 
                defaultValue={record.description}/>
        </>
    )
}