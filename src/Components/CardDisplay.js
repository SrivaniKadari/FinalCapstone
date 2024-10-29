import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api/index";

function CardDisplay({card, deck, fetchDeck}){
    const cardDeleteHandler = ()=>{if(window.confirm("Delete this card?\n You will not be able to recover it")){
        deleteCard(card.id)
        .then(fetchDeck)
    }}
  
    return(
    <div className="card">
        <div className="card-body d-flex">
            <div className="col">
                <p className="card-text">
                {card.front}
                </p>
            </div>
            <div className="col">
                <p className="card-text">{card.back}</p>
                <button type="button" className="btn btn-danger float-right ml-2" onClick={cardDeleteHandler}>Delete</button>
                <Link 
                to={`/decks/${deck.id}/cards/${card.id}/edit`} 
                className= "btn btn-secondary float-right">
                    Edit
                    </Link>
            </div>
        </div>
    </div>
)}

export default CardDisplay;