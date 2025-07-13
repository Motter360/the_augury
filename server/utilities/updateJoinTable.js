import { db } from '../db.js';
import findAlterColumn from "./findAlterColumn.js"
import findAnchorColumn from './findAnchorColumn.js';
import findJoinTable from './findJoinTable.js';
import queryJoinTable from './queryJoinTable.js'

export default  async function updateJoinTable(table, id, relatedData){
    // Given the table, record id, and relatedData obj, start identifying the relevant information
    const alterColumn = findAlterColumn(table, relatedData.alter)
    const joinTable = findJoinTable(table, relatedData.alter)
    const anchorColumn = findAnchorColumn(table)

    // Now that we have identified the relevant information, start quering the dataBase
    const rawData = await db.raw(`SELECT ${alterColumn} FROM ${joinTable} WHERE ${anchorColumn} = ?`,[id])
    const existingRelations = rawData.map(obj => obj[`${alterColumn}`])

    // We now have the exsiting relationships, time to update them
    const targetData = relatedData.id
    await queryJoinTable(joinTable, alterColumn, anchorColumn, targetData, existingRelations, id)
}
