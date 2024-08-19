import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

function Deck() {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await readDeck(
                    deckId,
                    abortController.signal
                );
                setDeck(deckResponse);
                setCards(deckResponse.cards || []);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);

    async function handleDeleteDeck(deck) {
        if (
            window.confirm(
                `Delete this deck? You will not be able to recover it`
            )
        ) {
            const abortController = new AbortController();
            try {
              
                var response = await deleteDeck(deck.id, abortController.signal);
                navigate("/");
                return response;
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    async function handleDeleteCard(card) {
        if (
            window.confirm(
                `Delete this card? You will not be able to recover it`
            )
        ) {
            const abortController = new AbortController();
            try {
                
                var response = await deleteCard(card.id, abortController.signal);
                navigate("/");
                return response;

            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    async function handleEditDeck() {
        navigate(`/decks/${deckId}/edit`);
    }

    async function handleStudy() {
        navigate(`/decks/${deckId}/study`);
    }

    async function handleAddCard() {
        navigate(`/decks/${deckId}/cards/new`);
    }

    async function handleEditCard(card) {
        navigate(`/decks/${deckId}/cards/${card.id}/edit`);
    }

        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">{deck.name}</li>
                </ol>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{deck.name}</h2>
                        <p>{deck.description}</p>
                        <button
                            onClick={() => handleEditDeck()}
                            className="btn btn-secondary mx-1"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleStudy()}
                            className="btn btn-primary mx-1"
                        >
                            Study
                        </button>
                        <button
                            onClick={() => handleAddCard()}
                            className="btn btn-primary mx-1"
                        >
                            Add Cards
                        </button>
                        <button
                            onClick={() => handleDeleteDeck(deck)}
                            className="btn btn-danger mx-1"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                {cards.length > 0 ? (
                <>
                <h1>Cards</h1>
                {cards.map((card) => {
                    return (
                        <div className="card-deck" key={card.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">{card.front}</div>
                                        <div className="col">{card.back}</div>
                                    </div>
                                    <div className="container row">
                                        <button
                                            onClick={() => handleEditCard(card)}
                                            className="btn btn-secondary mx-1"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteCard(card)
                                            }
                                            className="btn btn-danger mx-1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
              )}
                </>
            ) : (
                <p>No cards available for this deck.</p>
            )}
        </div>
    );
}

export default Deck;
