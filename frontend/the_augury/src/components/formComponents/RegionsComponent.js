import React from "react";

export default function RegionsComponent(props){
    const {record, regionsData} = props
    return(
        <>
            <label htmlFor="regions">Region</label>
            <select id="regions" required>
                {regionsData.map((region) => {
                    if(region.id === record.regions_id){
                        return(<option 
                                    key={region.id} 
                                    selected
                                >{region.name}</option>)
                    } else {
                        return(<option 
                                key={region.id} 
                                >{region.name}</option>)
                    }})}
            </select>
        </>
    )
}