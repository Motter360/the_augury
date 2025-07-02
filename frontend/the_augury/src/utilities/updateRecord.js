export default function updateRecord(path, data){

    /*
        problems I have to solve to get this working:
        
        1. how do I pull the information out of the form 
        and pass it into the function? 

        2. What information does the API need to effectively make changes?
            a. All record information.
            b. What related information it will be querying. 
    
    */

    const newCity = {
        feildData: {
            name: "Andlemar",
            region_id: 7,
            description: "Drow Lineage.",
            },
        relatedData: [{alter: "npcs", id: []}]
    }

    fetch("http://localhost:4000/cities/21", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCity)
    }).then(res =>{
        if(!res.ok){
            console.log("Problem, Captain!")
            return
        }
        return res.json()
    })
    .then(data => {
        console.log("success");
    })
    .catch(error => {
        console.log(error)
    })
}