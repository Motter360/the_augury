import React from "react";


/* 
    Okay, this form should be dynamically rendered for each different record it can create.
    users should "Add New Record", and it should take them to the create page ready for that data type.
    Pass the data object in through props, then dynamically render inputs based off of exsiting qualities.

*/




export default function CreateNewRecord(){
    
    return(
        <>
        <h1>Create New Records Dude!</h1>

        <form>

            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Name"></input>

            <label htmlFor="class">Name</label>
            <input type="text" id="class" placeholder="Name"></input>

        </form>
        </>
    )
}