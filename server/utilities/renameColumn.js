import { db } from '../db.js';

export default async function renameColumn(table, oldName, newName){
    await db.raw(`ALTER TABLE ${table} RENAME COLUMN ${oldName} TO ${newName}`)
}