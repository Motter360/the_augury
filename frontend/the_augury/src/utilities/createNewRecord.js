export default async function createNewRecord(tableName, record){
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${tableName}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
    });

    if (!res.ok) {
        throw new Error('createNewRecord failed');
    }
    
    const data = await res.json()

    return data;
}
