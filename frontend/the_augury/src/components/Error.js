import React from "react";

export default function Error(props){
    if (props.error) {
        return (
            <div>Error: {error.message}</div>
        );
    }
}