import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "../Components/CardForm";

function AddCard() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const initialState = {
        front: "",
        back: "",
    };

    const [newCard, setNewCard] = useState(initialState);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);

    function handleChange({ target }) {
        setNewCard({
            ...newCard,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
       /*  if(!newCard.front && !newCard.back){
            window.confirm('Enter Front and Back Of Card');
            return;
        } */
        const abortController = new AbortController();
        const response = await createCard(
            deckId,
            { ...newCard },
            abortController.signal
        );
       // navigate('/decks/${deckId}');
        setNewCard(initialState);
        return response;
    }

    async function handleDone() {
        navigate(`/decks/${deckId}`);
    }

    return (
        <div>
        <CardForm
            mode="create"
            deckName={deck.name}
            card={newCard}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleDone}
        />
 </div>
    );
}

export default AddCard;
