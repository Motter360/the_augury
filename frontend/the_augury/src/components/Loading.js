import React from "react";

export default function Loading(props){
        if (props.loading) {
            return (
                <div>Loading data...</div>
            );
        }
    }