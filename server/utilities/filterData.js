export default function filterData(dbArr, filterArr){
    const filteredData = []
    for(const item of dbArr){
        if (filterArr.includes(item.name)){
            filteredData.push(item)
        }
    }
    return filteredData;
}