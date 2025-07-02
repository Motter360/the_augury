export default function findMatchingTable(feildYouWant){
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