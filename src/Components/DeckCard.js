import React from "react";
import {Link} from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckCard({deck, fetchData}){
    const deckDeleteHandler = ()=>{if(window.confirm("Delete this deck?\n You will not be able to recover it")){
        deleteDeck(deck.id)
        .then(fetchData)
    }}

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="d-inline-block card-title">{deck.name}</h4>
                <h6 className="d-inline-block card-subtitle float-right text-muted">{deck.cards.length} cards</h6>                             
                <p className="card-text">
                {deck.description}
                </p>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">View</Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
            <button 
            className="btn btn-danger mr-4 float-right" 
            onClick={deckDeleteHandler}>
                Delete
            </button>
        </div>
        </div>
    )
}

export default DeckCard;