export default function updateRecord(path, data){

    /*
        problems I have to solve to get this working:
        
        1. how do I pull the information out of the form 
        and pass it into the function? 

        2. What information does the API need to effectively make changes?
            a. All record information.
            b. What related information it will be querying. 
    
    */
    console.log(path)
    console.log(data)

    fetch(`http://localhost:4000/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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