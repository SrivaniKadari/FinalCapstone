import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";

function EditDeck(){
    const { deckId } = useParams();
    const [deck, setDeck] = useState({cards:[]})
    
    function fetchDeck() {
        readDeck(deckId).then(data => setDeck(data));
      }
      useEffect(fetchDeck, [deckId]);

    return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        {deck.id &&
        <DeckForm 
            onSubmit={updateDeck}
            submitButtonText="Save"
            initialFormData={deck}/>
        }
    </div>
    )
}

export default EditDeck;
