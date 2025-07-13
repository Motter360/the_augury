import {useState, useEffect} from 'react'

export default function UseFetchData(path){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState (null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`)

                if (!response.ok){
                    throw new Error(`HTTP Error! Status:${response.status}`)
                }
                const result = await response.json()
                setData(result)

            } catch(err){
                setError(err)
                console.error(`Failed to fetch data, my leige:`, err)
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    },[path])

    return {data, loading, error}
}