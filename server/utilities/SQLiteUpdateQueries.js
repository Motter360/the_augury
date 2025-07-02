import knex from "knex"

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: '../database/Pathfinders_DND_Campaign_Lore.db'
  },
  useNullAsDefault: true
});

export default async function SQLiteUpdateQueries(table, dataObj){

    if(table === "cities"){
        const {name, regions_id, description, id} = dataObj
        db.raw('UPDATE cities SET name = ? SET regions_id = ? SET description = ? WHERE id = ?', 
        [name, regions_id, description, id])
    }    

    if(table === "factions"){
        const {name, description, id} = dataObj
        db.raw('UPDATE factions SET name = ? SET description = ? WHERE id = ?', 
        [name, description, id])
    }

    if(table === "npcs"){
        const {name, dndClass, description, id} = dataObj
        db.raw('UPDATE npcs SET name = ? SET class = ? SET description = ? WHERE id = ?', 
        [name, dndClass, description, id])
    }

    if(table === "realms"){
        const {name, description, id} = dataObj
        db.raw('UPDATE realms SET name = ? SET description = ? WHERE id = ?', 
        [name, description, id])
    }

    if(table === "regions"){
        const {name, realms_id, description, id} = dataObj
        db.raw('UPDATE cities SET name = ? SET realms_id = ? SET description = ? WHERE id = ?', 
        [name, realms_id, description, id])
    }
}