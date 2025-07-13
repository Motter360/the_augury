import { db } from '../db.js';

export default async function SQLiteInsertQueries(table, dataObj){

    console.log(table, dataObj)

    if(table === "cities"){
        const {name, regions_id, description} = dataObj
        console.log(name, regions_id, description)
        await db.raw('INSERT INTO cities (regions_id, name, description) VALUES (?, ?, ?)', 
        [regions_id, name, description])
        
    }    

    if(table === "factions"){
        const {name, description} = dataObj
        await db.raw('INSERT INTO factions (name, description) VALUES (?,?)', 
        [name, description])
    }

    if(table === "npcs"){
        const {name, DndClass, description} = dataObj
        await db.raw('INSERT INTO npcs (name, class, description) VALUES (?,?,?)', 
        [name, DndClass, description])
    }

    if(table === "realms"){
        const {name, description} = dataObj
        await db.raw('INSERT INTO realms (name, description) VALUES (?,?)', 
        [name, description])
    }

    if(table === "regions"){
        const {name, realms_id, description} = dataObj
        await db.raw('INSERT INTO regions (name, realms_id, description) VALUES(?,?,?)', 
        [name, realms_id, description])
    }
}