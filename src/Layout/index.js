import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route } from 'react-router-dom';
import Home from "../Components/Home";
import CreateDeck from "../Components/CreateDeck";
import Deck from "../Components/Deck";
import EditDeck from "../Components/EditDeck";
import EditCard from "../Components/EditCard";
import StudyDeck from '../Components/Study';
import AddCard from '../Components/AddCard';

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />}/>
          <Route path="/decks/:deckId/*" element={<DeckRoutes />} />
        <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </>
  );
}

function DeckRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Deck />} />
      <Route path="study" element={<StudyDeck />} />
      <Route path="edit" element={<EditDeck />} />
      <Route path="cards/new" element={<AddCard />} />
      <Route path="cards/:cardId/edit" element={<EditCard />} />
    </Routes>
  );
}
export default Layout;
