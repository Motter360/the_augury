import React from "react";

export default function RealmsComponent(props){
    const {record, realmsData} = props
    return(
        <>
            <label htmlFor="realms">Realms</label>
            <select name="realm" id="realms" required>
                {realmsData.map((realm) => {
                    if(realm.id === record.realms_id){
                        return(<option 
                                    key={realm.id} 
                                    selected
                                >{realm.name}</option>)
                    } else {
                        return(<option 
                                key={realm.id} 
                                >{realm.name}</option>)
                    }})}
            </select>
        </>
    )
}