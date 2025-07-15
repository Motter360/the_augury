import { db } from '../db.js';

export default async function queryJoinTable(joinTable, alterColumn, anchorColumn, newRelationIDs, oldRelationIDs, anchorID){
        console.log("New Relation IDs: " + newRelationIDs, "Old Relation IDs: " + oldRelationIDs, "Anchor IDs: " + anchorID)

        if(newRelationIDs.length === 0 && oldRelationIDs.length === 0){
            console.log("Nope, Poke!")
            return
        }

        if(newRelationIDs === oldRelationIDs){
            console.log("No change, Poke!")
            return
        }
        
        if(newRelationIDs.length === 0){
            console.log("Deleting " + oldRelationIDs.join(", "))
            for (const alterID of oldRelationIDs){
                await db.raw(`DELETE FROM ${joinTable} where ${alterColumn} = ? and ${anchorColumn} =?`,[alterID, anchorID])
            }
            return
        }

        for(const alterID of newRelationIDs){
            if(!oldRelationIDs.includes(alterID)){
                console.log("Adding " + alterID)
                await db.raw(`INSERT INTO ${joinTable} (${alterColumn}, ${anchorColumn}) VALUES (?,?)`, [alterID, anchorID])
            }
        }

        for(const alterID of oldRelationIDs){
            if(!newRelationIDs.includes(alterID)){
                console.log("Removing " + alterID)
                await db.raw(`DELETE FROM ${joinTable} WHERE ${alterColumn} = ? and ${anchorColumn} = ?`, [alterID, anchorID])
            }
        }

        return
    }