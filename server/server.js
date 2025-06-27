import express from 'express';
import knex from 'knex';
import cors from 'cors'

/* 
Lets get some use cases on what data I want people to be able to querry from the website.

Get player available table table from localhost:4000/{table}
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

Steps to Query info from join tables:
    1. Know which join table you need (npc_factions or npc_cities)
    2. Know what half of the info you have, and which half you need. (npc vs faction, npc vs city)
    3. Query the approprate table for all records with the matching half, returning the result as an array. I.e.:
        a. I want to know all the npcs this particular faction is associated with. table = npc_factions
        b. I have the faction ID, I need the npc id. `SELECT npc_id FROM npc_factions WHERE faction_id = 3`
    4. Query the other table for all records with the matching ids. 
        a. const result = array.map(id => db.raw(`SELECT * FROM npcs WHERE id = ${id}`))
    5. Return the result
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

async function renameColumn(table, oldName, newName){
    await db.raw(`ALTER TABLE ${table} RENAME COLUMN ${oldName} TO ${newName}`)
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

function findMatchingTable(feildYouWant){

        if(feildYouWant === "npc_id"){
            return "npcs"
        }

        if(feildYouWant === "city_id"){
            return "cities"
        }

        if(feildYouWant === "faction_id"){
            return "factions"
        }

    }

server.use(cors())

server.get('/', async (req, res) => {
    const allowedTables = ["realms","cities","legends","locations","factions","npcs","events","regions"];
    const tables = await db.raw(`SELECT name FROM sqlite_master WHERE type = 'table'`);
    const filteredData = filterData(tables, allowedTables);
    const alphabetizedData = filteredData.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
            });

    if (req.url === '/'){
            res.json(alphabetizedData);
        }
})

server.get('/:table', async (req, res) => {
    const { table } = req.params;
    const data = await db.raw(`SELECT * FROM ${table}`);
    const result = data.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
            });
    try {
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

server.get('/:table/:id', async (req, res) => {
    const { table, id } = req.params;
    const result = await db.raw(`SELECT * FROM ${table} WHERE id = ${id}`);
    try {
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

server.get('/queryJoinTable/:table/:feildYouHave/:feildYouWant/:id', async (req, res) => {
    const {table, feildYouHave, feildYouWant, id} = req.params;
    const desiredFeild = await db.raw(`SELECT ${feildYouWant} FROM ${table} WHERE ${feildYouHave} = ${id}`) 
    const matchingIDs = desiredFeild.map( obj => obj[feildYouWant])
    const desiredTable = findMatchingTable(feildYouWant)
    const data = await db.raw(`SELECT * FROM ${desiredTable} WHERE id IN (${matchingIDs.join(',')})`)
    const results = data.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
            });

    try {
        res.json(results)
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

server.put('/:table/:id', async (req, res) => {
    const { table, id } = req.params;
    //const {name, region_id, description} = req.body;
    console.log(req.body)
})

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})