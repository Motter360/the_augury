import React, { useState } from "react";
import RegionsComponent from "./formComponents/RegionsComponent.js";
import NameComponent from "./formComponents/NameComponent.js";
import DescriptionComponent from "./formComponents/DescriptionComponent.js";
import NpcsComponent from "./formComponents/NpcsComponent.js";
import RealmsComponent from "./formComponents/RealmsComponent.js";
import FactionsComponent from "./formComponents/FactionsComponents.js";
import CitiesComponent from "./formComponents/CitiesComponent.js";
import DndClassComponent from "./formComponents/DndClassComponent.js";
import createNewRecord from "@/utilities/createNewRecord.js";
import { useRouter } from "next/navigation.js";

export default function CreateForm(props){

    const {
            data, 
            regionsData, 
            npcsData, 
            realmsData, 
            factionsData, 
            citiesData, 
            dndClass,
            tableName
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const record = {}
  
    return(
        <>
            <h1>Create New Entries Dude!</h1>
            <form onSubmit={(e) =>{
                            e.preventDefault();

                            if(isLoading){
                                return;
                            }

                            setIsLoading(true);

                            const formData = new FormData(e.currentTarget)
                            const name = formData.get('name')
                            const DndClass = dndClass ? formData.get('DndClass') : null
                            const realm = realmsData ? formData.get('realm') : null
                            const region = regionsData ? formData.get('region') : null
                            const description = formData.get("description") 
        
                            const NPC_IDs = npcsData ?  {
                                alter: "npcs",
                                id: formData.getAll('npcIDs').map(item => parseInt(item)) 
                            } : null
        
                            const factionIDs = factionsData ? {
                                alter: "factions",
                                id: formData.getAll('factionIDs').map(item => parseInt(item)) 
                                } : null
        
                            const cityIDs = citiesData ? {
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
        
                            const newRecord = {
                                feildData: {
                                    name: name,
                                    DndClass: DndClass,
                                    realms_id: realm,
                                    regions_id: region,
                                    description: description,
                                },
                                relatedData: relatedData,
                            }
                            
                            createNewRecord(tableName, newRecord)
                                .then(data => {
                                    console.log(data)
                                    router.push(`/tables/${tableName}/${data.id}`);
                                })
                                .catch(error => console.error(error))
                                .finally(() => {
                                    setIsLoading(false);
                                });
                        }
                    }>
                <NameComponent record={record}/>
                {dndClass ? <DndClassComponent record={record} /> : null}
                {realmsData ? <RealmsComponent record={record} realmsData={realmsData} /> : null}
                {regionsData ? <RegionsComponent record={record} regionsData={regionsData} /> : null}
                <DescriptionComponent  record={record} />
                {npcsData ? <NpcsComponent npcsData={npcsData} 
                            relatedIDs={[]} /> : null}
                {factionsData ? <FactionsComponent factionsData={factionsData} 
                            relatedIDs={[]} />: null}
                {citiesData ? <CitiesComponent citiesData={citiesData}
                            relatedIDs={[]} />: null}
                <button className="formSubmit" >Submit Creation</button>
            </form>
        </>
    )
}
