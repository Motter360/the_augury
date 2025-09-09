export default function createNewRecord(tableName, data){
    console.log(tableName, data)

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${tableName}`, {
        method: "POST",
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
