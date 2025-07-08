import React from "react";

export default function NpcsComponent(props){
    const {relatedIDs, npcsData} = props
    console.log(relatedIDs)
    return(
        <>
        <label>Related Npcs</label>
        <div name="relatedNPCs" className="checkboxFeild">
            {npcsData.map((npc) => {
                if(relatedIDs.includes(npc.id)){
                    return(
                        <div  key={npc.id}>
                            <input 
                                type="checkbox" 
                                id={npc.id} 
                                name={`npcIDs`}
                                value={npc.id} 
                                defaultChecked
                                />
                            <label htmlFor={npc.id}>{npc.name}</label>
                        </div>
                    )
                } else {
                    return(
                        <div key={npc.id}>
                            <input 
                                type="checkbox" 
                                id={npc.id} 
                                name={`npcIDs`}
                                value={npc.id}
                                />
                            <label htmlFor={npc.id}>{npc.name}</label>
                        </div>
                    )
                }
            })}
        </div>
        </>
    )
}