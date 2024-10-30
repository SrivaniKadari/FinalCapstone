import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route } from 'react-router-dom';
import Home from "../Components/Home";
import CreateDeck from "../Components/CreateDeck";
import EditDeck from "../Components/EditDeck";
import Study from '../Components/Study';
import DeckScreen from "../Components/DeckScreen";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/:deckId/*" element={<DeckScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
