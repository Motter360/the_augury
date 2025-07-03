export default function compareList(partialList, fullList){
    const matches = []
    for(let i = 0; i < partialList.length; i++){
        fullList.map((item) =>{
            if(item.id === filterArr[i].id){
                matches.push(item)
            }
        })
    }
    return matches;
}