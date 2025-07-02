import React from "react";

export default function CitiesComponent(props){
    const {relatedIDs, citiesData} = props
    return(
        <>
        <label>Related Cities</label>
        <div className="checkboxFeild">
            {citiesData.map((city) => {
                if(relatedIDs.includes(city.id)){
                    return(
                        <div key={city.id}>
                            <input 
                                type="checkbox" 
                                id={city.id} 
                                name={city.id} 
                                value={city.id} 
                                defaultChecked
                                />
                            <label htmlFor={city.id}>{city.name}</label>
                        </div>
                    )
                } else {
                    return(
                        <div key={city.id}>
                            <input 
                                type="checkbox" 
                                id={city.id} 
                                name={city.id} 
                                value={city.id}
                                />
                            <label htmlFor={city.id}>{city.name}</label>
                        </div>
                    )
                }
            })}
        </div>
        </>
    )
}
