import knex from "knex";
import findAlterColumn from "./findAlterColumn.js"
import findAnchorColumn from './findAnchorColumn.js';
import findJoinTable from './findJoinTable.js';
import queryJoinTable from './queryJoinTable.js'

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: '../database/Pathfinders_DND_Campaign_Lore.db'
  },
  useNullAsDefault: true
});

export default  async function updateJoinTable(table, id, relatedData){
    // Given the table, record id, and relatedData obj, start identifying the relevant information
    const alterColumn = findAlterColumn(table, relatedData.alter)
    const joinTable = findJoinTable(table, relatedData.alter)
    const anchorColumn = findAnchorColumn(table)

    // Now that we have identified the relevant information, start quering the dataBase
    const rawData = await db.raw(`SELECT ${alterColumn} FROM ${joinTable} WHERE ${anchorColumn} = ?`,[id])
    const existingRelations = rawData.map(obj => obj[`${alterColumn}`])

    // We now have the exsiting relationships, time to update them
    const targetData = relatedData[0]

    await queryJoinTable(joinTable, alterColumn, anchorColumn, targetData.id, existingRelations, id)
}