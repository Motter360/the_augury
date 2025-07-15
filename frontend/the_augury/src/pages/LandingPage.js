import React from "react";
import styles from "../app/page.module.css";
import useFetchData from "../utilities/useFetchData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import IndexTable from "@/components/IndexTable";

export default function LandingPage(){
        const { data, loading, error } = useFetchData("");
        return (
            <div className="centered">
                <Loading loading = {loading} />
                <Error error = {error} />
                <IndexTable  data = {data} />
            </div>
        );
}