export default function findJoinTable(table, alter){
    if(table === "cities"){
        return "npc_cities"
    }

    if(table === "factions"){
        return "npc_factions"
    }

    if(table === "npcs"){
        if(alter === "factions"){
            return "npc_factions"
        } else if (alter === "cities"){
            return "npc_cities"
        }
    }
}