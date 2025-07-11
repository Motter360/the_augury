import knex from "knex"

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: '../database/Pathfinders_DND_Campaign_Lore.db'
  },
  useNullAsDefault: true
});

export default async function SQLiteUpdateQueries(table, dataObj, id){

    if(table === "cities"){
        const {name, regions_id, description} = dataObj
        console.log(name, regions_id, description, id)
        await db.raw('UPDATE cities SET name = ?, regions_id = ?, description = ? WHERE id = ?', 
        [name, regions_id, description, id])
        
    }    

    if(table === "factions"){
        const {name, description} = dataObj
        await db.raw('UPDATE factions SET name = ?, description = ? WHERE id = ?', 
        [name, description, id])
    }

    if(table === "npcs"){
        const {name, DndClass, description} = dataObj
        await db.raw('UPDATE npcs SET name = ?, class = ?, description = ? WHERE id = ?', 
        [name, DndClass, description, id])
    }

    if(table === "realms"){
        const {name, description} = dataObj
        await db.raw('UPDATE realms SET name = ?, description = ? WHERE id = ?', 
        [name, description, id])
    }

    if(table === "regions"){
        const {name, realms_id, description} = dataObj
        await db.raw('UPDATE regions SET name = ?, realms_id = ?, description = ? WHERE id = ?', 
        [name, realms_id, description, id])
    }
}