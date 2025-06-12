import express from 'express';
import knex from 'knex';
import cors from 'cors'

/* 
Lets get some use cases on what data I want people to be able to querry from the website.

Get player available table table from localhost:3000/{table}
Get any specific record from localhost:3000/{table}/{id}

When records are displayed, also display all items they are related to.
I need to make a lot of join tables

Handle these kinds of requests:
    Get - Retrieve information
    Post - Create new information
    Put - Update exsisting information
    Delete - Remove information (or mark it as deleted)

Table specific desires:
    Players
    reamls
        be able to display all regions by realm
    cities
        be able to display npcs and eventually locations by city
    locations
        Empty, for now
    factions
        Display list of factions and associated NPCs
    npcs
        List classes, and allow filtering by them
    regions
        be able to display all cities by region
*/



const PORT = 4000;
const server = express();

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: '../database/Pathfinders_DND_Campaign_Lore.db'
  },
  useNullAsDefault: true
});

async function renameTable(oldName, newName){
    await db.raw(`ALTER TABLE ${oldName} RENAME TO ${newName};`)
}

function filterData(dbArr, filterArr){
    const filteredData = []
    for(let i = 0; i < filterArr.length; i++){
        dbArr.map((item) =>{
            if(item.name === filterArr[i]){
                filteredData.push(item)
            }
        })
    }
    return filteredData;
}

server.use(cors())

server.get('/', async (req, res) => {
    const allowedTables = ["players","realms","cities","legends","locations","factions","npcs","events","regions"];
    const tables = await db.raw(`SELECT name FROM sqlite_master WHERE type = 'table'`);
    const filteredData = filterData(tables, allowedTables);

    if (req.url === '/'){
            res.json(filteredData);
        }
})

server.get('/:table', async (req, res) => {
    const { table } = req.params;
    const result = await db.raw(`SELECT * FROM ${table}`);
    try {
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

server.get('/:table/:id', async (req, res) => {
    const { table, id } = req.params;
    const result = await db.raw(`SELECT * FROM ${table} WHERE id = ${id}`);
    try {
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})