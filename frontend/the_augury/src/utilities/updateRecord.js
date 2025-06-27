export default function updateRecord(path, data){

    const newCity = {
        name: "Brok",
        region_id: 3,
        description: "Lok",
        npc_ids: [8,9,3]
    }

    fetch("http://localhost:4000/cities/7", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
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