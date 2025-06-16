import React from "react";
import styles from "../app/page.module.css";
import useFetchData from "../utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Table from "@/components/Table";

export default function LandingPage(){
        const { data, loading, error } = useFetchData("");

        return (
            <div className={styles.page}>
                <Loading loading = {loading} />
                <Error error = {error} />
                <Table data = {data} />
            </div>
        );
}