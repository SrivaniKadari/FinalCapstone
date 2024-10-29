import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import CardForm from "../Components/CardForm";

function EditCard() {
    const { cardId } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState({ front: "", back: "" });
    const [deck, setDeck] = useState({ name: "" });
   
useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then((card) => {
        setCard(card);
        return readDeck(card.deckId, abortController.signal); // Fetch the deck only after card is fetched
      })
      .then(setDeck)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error("Error reading card or deck:", error);
        }
      });

    return () => abortController.abort();
  }, [cardId]);

    function handleChange({ target }) {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateCard({ ...card }, abortController.signal);
        navigate(`/decks/${card.deckId}`);
        return response;
    }

    async function handleCancel() {
        navigate(`/decks/${card.deckId}`);
    }

    return (
        <div>
                   <CardForm
            mode="edit"
            deckName={deck.name}
            card={card}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
        />
   </div>
    );
}

export default EditCard;
