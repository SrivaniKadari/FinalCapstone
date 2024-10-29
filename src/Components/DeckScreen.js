import React, { useState, useEffect } from "react";
import { deleteDeck, readDeck } from "../utils/api";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import CardDisplay from "../Components/CardDisplay";
import AddCard from "../Components/AddCard";
import EditCard from "../Components/EditCard";

function DeckScreen() {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({ cards: [] });

    // Fetch deck data
    const fetchDeck = () => {
        readDeck(deckId).then(data => setDeck(data));
    };

    useEffect(fetchDeck, [deckId]);
    
    const cardList = deck.id && deck.cards;

    // Delete deck handler
    const deckDeleteHandler = () => {
        if (window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
            deleteDeck(deck.id).then(() => navigate("/"));
        }
    };

    if (deck.id) {
        return (
            <div>
                <Routes>
                    <Route path="/" element={
                        <>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                                </ol>
                            </nav>
                            <div className="mb-4">
                                <h3>{deck.name}</h3>
                                <p>{deck.description}</p>
                                <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mx-2">Edit</Link>
                                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mx-2">Add Cards</Link>
                                <button className="btn btn-danger mr-4 float-right" onClick={deckDeleteHandler}>Delete</button>
                            </div>
                            {/* Render cards */}
                            {cardList.length > 0 ? (
                                cardList.map(card => (
                                    <CardDisplay key={card.id} card={card} deck={deck} fetchDeck={fetchDeck} />
                                ))
                            ) : null}
                        </>
                    } />
                    <Route path="cards/new" element={<AddCard deck={deck} fetchDeck={fetchDeck} />} />
                    <Route path="cards/:cardId/edit" element={<EditCard deck={deck} fetchDeck={fetchDeck} />} />
                </Routes>
            </div>
        );
    }
    return "Loading...";
}

export default DeckScreen;
