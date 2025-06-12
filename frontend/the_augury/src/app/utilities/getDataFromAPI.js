import React from 'react'

export default async function getDataFromAPI(path){

    /* 
        okay, here's the issue: This code is returning 'data' as a promise. Since I am storing the data in
        state, it will rerender ad infinium if I don't use use effect. But I can't figure out how to make
        useEffect wait until data can be set to the information from the API. Async await can't make useEffect
        wait in the way I want it to, or if it can, I don't know how. 
    */


    const [data, setData] = React.useState(null);


    React.useEffect(()=>{

        function getData(){
            try{
                return(fetch("http://localhost:4000/" + path).then(res => res.json()));
            } catch (error){
                console.log(error)
            }
        }

        async function handleData(){
            const response = await getData()
            setData(response)
        }

        handleData();
    },[])

    return data
}