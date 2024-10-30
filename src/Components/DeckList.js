import React from "react";
import DeckCard from "./DeckCard";

function DeckList({decks, fetchData}){
    
    return (
        <div>
           {decks.map(deck=>
           <DeckCard key={deck.id} deck={deck} fetchData={fetchData} />)} 
        </div>
    )
}

export default DeckList;