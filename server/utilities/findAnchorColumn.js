export default function findAnchorColumn(table){
    if (table === "cities"){
        return 'city_id'
    }
    if (table ==="factions" ){
        return 'faction_id'
    }
    if (table === "npcs"){
        return 'npc_id'
    }
}