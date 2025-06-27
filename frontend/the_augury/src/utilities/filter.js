export default function filter(id, arr){
    let res = ""
    arr.map((item) =>{ if(item.id === id){res = item.name}})
    return(res)
}