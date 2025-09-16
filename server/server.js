import 'dotenv/config';
import express, { response } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import findMatchingTable from './utilities/findMatchingTable.js';
import filterData from './utilities/filterData.js'
import updateJoinTable from './utilities/updateJoinTable.js';
import SQLiteUpdateQueries from './utilities/SQLiteUpdateQueries.js';
import SQLiteInsertQueries from './utilities/SQLiteInsertQueries.js';
import { db } from './db.js';

const PORT = 4000;
const server = express();

server.use(bodyParser.urlencoded())
server.use(bodyParser.json())
server.use(cors())

server.get('/', async (req, res) => {
    const allowedTables = ["realms","cities","factions","npcs","regions"];
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

server.post('/:table', async (req, res) => {
    try { 
        const { table } = req.params;
        const { feildData, relatedData } = req.body;
        const allowedTables = ["realms","cities","factions","npcs","regions"]

        if (!allowedTables.includes(table)){
            res.status(404).json({error: "Table not found."});
        }
        console.log("Creating new record", table, feildData, relatedData);

        const id = await SQLiteInsertQueries(table, feildData);

        for(const relation of relatedData) {
            await updateJoinTable(table, id, relation)
        }

        res.status(201).json({
            id,
            ...feildData,
            relatedData,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

server.put('/:table/:id', async (req, res) => {
    try {    
        const { table, id } = req.params;
        const {feildData, relatedData} = req.body; 

        const existing = await db.raw(`SELECT * FROM ${table} WHERE id = ${id}`);
        if (existing.length === 0) {
        return res.status(404).json({ error: 'Record not found' });
        } 

        for(const relation of relatedData) {
            await updateJoinTable(table, id, relation)
        }

        await SQLiteUpdateQueries(table, feildData, id);
        res.json("Update Successful!")
    } catch (error){
        console.log(error);
        res.status(500).json({error: "oopise"})
    }
})

server.delete('/:table/:id', async (req, res) =>{
    const { table, id } = req.params
    const { relatedData } = req.body; 
    console.log(table, id, relatedData)

    const allowedTables = ["realms","cities","factions","npcs","regions"]

    if (!allowedTables.includes(table)){
        console.log("Table not found")
        return res.status(404).json({error: "Table not found."})
    }

    const existing = await db.raw(`SELECT * FROM ${table} WHERE id = ?`, [id]);
    if (existing.length === 0) {
        console.log("Record not found")
        return res.status(404).json({ error: 'Record not found' });
    }

    await db.raw(`DELETE FROM ${table} WHERE id = ?`, [id]);

    for(const relation of relatedData) {
            await updateJoinTable(table, id, relation)
            console.log(table, id, relation)
    }
})

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})