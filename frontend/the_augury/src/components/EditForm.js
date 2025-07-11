import React from "react";
import updateRecord from "@/utilities/updateRecord";
import deleteRecord from "@/utilities/deleteRecord.js";
import RegionsComponent from "./formComponents/RegionsComponent.js";
import NameComponent from "./formComponents/NameComponent.js";
import DescriptionComponent from "./formComponents/DescriptionComponent.js";
import NpcsComponent from "./formComponents/NpcsComponent.js";
import RealmsComponent from "./formComponents/RealmsComponent.js";
import FactionsComponent from "./formComponents/FactionsComponents.js";
import CitiesComponent from "./formComponents/CitiesComponent.js";
import DndClassComponent from "./formComponents/DndClassComponent.js";

export default function EditRecord(props){
    const {
            data, 
            regionsData, 
            npcsData, 
            realmsData, 
            factionsData, 
            citiesData, 
            relatedNPCs, 
            relatedFactions, 
            relatedCities,
            path
        } = props

    if(data){ 
        const record = data[0]

        //function handleDelete(path, ){}

        return(
            <>
                <form onSubmit={(e) =>{
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const name = formData.get('name')
                    const DndClass = record.class ? formData.get('DndClass') : null
                    const realm = realmsData ? formData.get('realm') : null
                    const region = regionsData ? formData.get('region') : null
                    const description = formData.get("description") 

                    const NPC_IDs = relatedNPCs ?  {
                        alter: "npcs",
                        id: formData.getAll('npcIDs').map(item => parseInt(item)) 
                    } : null

                    const factionIDs = relatedFactions ? {
                        alter: "factions",
                        id: formData.getAll('factionIDs').map(item => parseInt(item)) 
                        } : null

                    const cityIDs = relatedCities ? {
                        alter: "cities",
                        id: formData.getAll('cityIDs').map(item => parseInt(item)) 
                        } : null
                    
                    const relations =[NPC_IDs, factionIDs, cityIDs]
                    const relatedData = []

                    for (const relation of relations){
                        if (relation){
                            relatedData.push(relation)
                        }
                    }

                    const updatedRecord = {
                        feildData: {
                            name: name,
                            DndClass: DndClass,
                            realms_id: realm,
                            regions_id: region,
                            description: description,
                        },
                        relatedData: relatedData,
                    }

                    updateRecord(path, updatedRecord)
                }}
                >
                    <NameComponent record={record}/>
                    {record.class ? <DndClassComponent record={record} /> : null}
                    {realmsData ? <RealmsComponent record={record} realmsData={realmsData} /> : null}
                    {regionsData ? <RegionsComponent record={record} regionsData={regionsData} /> : null}
                    <DescriptionComponent  record={record} />
                    {relatedNPCs ? <NpcsComponent npcsData={npcsData} 
                                relatedIDs={relatedNPCs.map((data) => data.id)} /> : null}
                    {relatedFactions ? <FactionsComponent factionsData={factionsData} 
                                relatedIDs={relatedFactions.map((data) => data.id)} />: null}
                    {relatedCities ? <CitiesComponent citiesData={citiesData}
                                relatedIDs={relatedCities.map((data) => data.id)} />: null}
                    <button className="formSubmit">Update Record</button>
                    <button className="delete">DELETE</button>
                </form>
            </>
        )
    }
}