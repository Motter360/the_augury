export default async function renameTable(oldName, newName){
    await db.raw(`ALTER TABLE ${oldName} RENAME TO ${newName};`)
}