import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readCard, updateCard } from "../utils/api/index";
import CardForm from "../Components/CardForm";

function EditCard({ deck, fetchDeck }) {
    const { cardId } = useParams();
    const navigate = useNavigate();
    
    
    const [card, setCard] = useState();
  
    const fetchCard = () => {
        readCard(cardId).then(data => setCard(data));
    };

    useEffect(fetchCard, [cardId]);


    const onSubmit = (editedCard) => {
        updateCard(editedCard)
            .then(fetchDeck)
            .then(() => navigate(`/decks/${deck.id}`));
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit card {cardId}</li>
                </ol>
            </nav>
            {card?.id && (
                <CardForm
                    deck={deck}
                    onSubmit={onSubmit}
                    submitButtonText="Submit"
                    cancelButtonText="Cancel"
                    formData={card}
                    setFormData={setCard}
                />
            )}
        </div>
    );
}

export default EditCard;
