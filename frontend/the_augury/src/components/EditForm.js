import React from "react";
import updateRecord from "@/utilities/updateRecord";


export default function EditRecord(props){
    const {data, regionsData, relatedData, npcsData} = props

    if(data && regionsData && relatedData && npcsData){
        const record = data[0]
        const relatedIDs = relatedData.map((data) => data.id)

        function handleSubmit(e){
            e.preventDefault()
            updateRecord("sum yew arr el")
        }

        return(
            <>
                <h1>Edit Records Dude!</h1>
                <form onSubmit={() =>{return false}}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Name" defaultValue={record.name} required/>

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

                    <label htmlFor="description">Discription</label>
                    <textarea 
                        className="descriptionInput"
                        id="description" 
                        placeholder="Descprition" 
                        defaultValue={record.description}/>

                    <label>Related Npcs</label>
                    <div className="checkboxFeild">
                        {npcsData.map((npc) => {
                            if(relatedIDs.includes(npc.id)){
                                return(
                                    <div key={npc.id}>
                                        <input 
                                            type="checkbox" 
                                            id={npc.id} 
                                            name={npc.id} 
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
                                            name={npc.id} 
                                            value={npc.id}
                                            />
                                        <label htmlFor={npc.id}>{npc.name}</label>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <button className="formSubmit" onClick={(e) => handleSubmit(e)}>Update Record</button>
                </form>
            </>
        )
    }
}