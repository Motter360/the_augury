import { db } from "../db.js"

export default async function cleanNPC_Cities(){
    const table = await db.raw(`SELECT * FROM npc_cities`)
    const rawNpcIDs = await db.raw(`SELECT id FROM npcs`)
    const npcIDs = rawNpcIDs.map(obj => obj.id)
    console.log(npcIDs)
    const rawCityIDs = await db.raw(`SELECT id FROM cities`)
    const cityIDs = rawCityIDs.map(obj => obj.id)
    console.log(cityIDs)

    let removals = 0 

    for (const record of table){
        if(!npcIDs.includes(record.npc_id) || !cityIDs.includes(record.city_id)){
            removals++
            await db.raw(`DELETE FROM npc_cities where npc_id = ? and city_id = ?`,[record.npc_id, record.city_id])
        }
    }

    console.log("Table length: " + table.length, "Removing " + removals + " records")
}