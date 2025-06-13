import React from "react";
import styles from "../page.module.css";
import useFetchData from "../utilities/useFetchData";
import FetchButton from "../components/fetchButton";

export default function LandingPage(){
        const { data, loading, error } = useFetchData("");

        function Loading(){
            if (loading) {
            return (
                <div className={styles.page}>
                    <main className={styles.main}>
                        <div>Loading data...</div>
                    </main>
                </div>
            );
        }
        }
        
        function Error(){
            if (error) {
                return (
                    <div className={styles.page}>
                        <main className={styles.main}>
                            <div>Error: {error.message}</div>
                        </main>
                    </div>
                );
        }
        }

        function Data({data}){
            if(data){
                return(
                    <>
                        {data && Array.isArray(data) && (
                            <div>
                                {data.map((table, index) => (
                                    <FetchButton key={table.name}>{table.name}</FetchButton>
                                ))}
                            </div>
                            )}
                                {data && !Array.isArray(data) && (
                                <p>Data is an object: {JSON.stringify(data)}</p>
                            )}
                    </>     
                    )
                }
            }

        return (
            <div className={styles.page}>
                <main className={styles.main}>
                    <Loading />
                    <Error />
                    <Data 
                        data={data}
                    />
                </main>
                <footer>
                </footer>
            </div>
        );
}