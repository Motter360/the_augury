import { db } from "../db.js"

export default async function cleanNPC_Factions(){
    const table = await db.raw(`SELECT * FROM npc_factions`)
    const rawNpcIDs = await db.raw(`SELECT id FROM npcs`)
    const npcIDs = rawNpcIDs.map(obj => obj.id)
    console.log(npcIDs)
    const rawFactionIDs = await db.raw(`SELECT id FROM factions`)
    const factionIDs = rawFactionIDs.map(obj => obj.id)
    console.log(factionIDs)

    let removals = 0 

    for (const record of table){
        if(!npcIDs.includes(record.npc_id) || !factionIDs.includes(record.faction_id)){
            removals++
            await db.raw(`DELETE FROM npc_factions where npc_id = ? and faction_id = ?`,[record.npc_id, record.faction_id])
        }
    }

    console.log("Table length: " + table.length, "Removing " + removals + " records")
}