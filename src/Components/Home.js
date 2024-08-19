import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await listDecks(abortController.signal);
                setDecks(deckResponse);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    async function handleDelete(deck) {
        if (
            window.confirm(
                `Delete this deck? You will not be able to recover it`
            )
        ) {
            var res = await deleteDeck(deck.id);
            // Create a function that filters the deck with the deck id from the current decks state
            setDecks(decks.filter((deckParam) => deckParam.id != deck.id));
            navigate("/");
            return res;
        }
    }

    return (
        <div className="container">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                </ol>
            <Link className="btn btn-secondary mb-2" to="/decks/new">
                Create Deck
            </Link>
            <div className="card-deck">
                {decks.map((deck) => {
                    return (
                        <div
                            className="card"
                            style={{ width: "30rem" }}
                            key={deck.id}
                        >
                            <div className="card-body">
                                <div className="card-title">
                                    {`${deck.name}`}
                                </div>
                                <div className="card-subtitle mb-2 text-muted">
                                    {`${deck.cards.length} cards`}
                                </div>
                                <div className="card-text">
                                    {`${deck.description}`}
                                </div>
                                <Link
                                    className="btn btn-secondary mx-1"
                                    to={`/decks/${deck.id}`}
                                >
                                    View
                                </Link>
                                <Link
                                    className="btn btn-primary mx-1"
                                    to={`/decks/${deck.id}/study`}
                                >
                                    Study
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger mx-1"
                                    onClick={() => handleDelete(deck)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
