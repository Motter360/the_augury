export default function findAlterColumn(anchorTable, alterTable){
    if(anchorTable === "cities"){
        return "npc_id"
    }

    if(anchorTable === "factions"){
        return "npc_id"
    }

    if(anchorTable === "npcs"){
        if(alterTable ==="cities"){
            return "city_id"
        } else if (alterTable === "factions"){
            return "faction_id"
        }
    }
}