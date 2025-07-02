import React from "react";

export default function FactionsComponent(props){
    const {relatedIDs, factionsData} = props
    return(
        <>
        <label>Related Factions</label>
        <div className="checkboxFeild">
            {factionsData.map((faction) => {
                if(relatedIDs.includes(faction.id)){
                    return(
                        <div key={faction.id}>
                            <input 
                                type="checkbox" 
                                id={faction.id} 
                                name={faction.id} 
                                value={faction.id} 
                                defaultChecked
                                />
                            <label htmlFor={faction.id}>{faction.name}</label>
                        </div>
                    )
                } else {
                    return(
                        <div key={faction.id}>
                            <input 
                                type="checkbox" 
                                id={faction.id} 
                                name={faction.id} 
                                value={faction.id}
                                />
                            <label htmlFor={faction.id}>{faction.name}</label>
                        </div>
                    )
                }
            })}
        </div>
        </>
    )
}