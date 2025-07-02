import React from "react";
import updateRecord from "@/utilities/updateRecord";
import RegionsComponent from "./formComponents/regionsComponent.js";
import NameComponent from "./formComponents/NameComponent.js";
import DescriptionComponent from "./formComponents/DescriptionComponent.js";
import NpcsComponent from "./formComponents/NpcsComponent.js";
import RealmsComponent from "./formComponents/RealmsComponent.js";
import FactionsComponent from "./formComponents/FactionsComponents.js";
import CitiesComponent from "./formComponents/CitiesComponent.js";

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
            relatedCities
        } = props

    if(data){
        const record = data[0]

        function handleSubmit(e){
            e.preventDefault()
            updateRecord()
        }

        return(
            <>
                <form onSubmit={() =>{return false}}>
                    <NameComponent record={record}/>
                    {realmsData ? <RealmsComponent record={record} realmsData={realmsData} /> : null}
                    {regionsData ? <RegionsComponent record={record} regionsData={regionsData} /> : null}
                    <DescriptionComponent record={record} />
                    {relatedNPCs ? <NpcsComponent npcsData={npcsData} 
                                relatedIDs={relatedNPCs.map((data) => data.id)} /> : null}
                    {relatedFactions ? <FactionsComponent factionsData={factionsData} 
                                relatedIDs={relatedFactions.map((data) => data.id)} />: null}
                    {relatedCities ? <CitiesComponent citiesData={citiesData}
                                relatedIDs={relatedCities.map((data) => data.id)} />: null}
                    <button className="formSubmit" onClick={(e) => handleSubmit(e)}>Update Record</button>
                </form>
            </>
        )
    }
}