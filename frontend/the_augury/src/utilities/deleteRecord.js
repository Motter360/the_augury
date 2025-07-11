export default function deleteRecord(path, data){

    fetch(`http://localhost:4000/${path}`, {
        method: "DELETE",
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