import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index";
import { Link } from "react-router-dom";
import DeckList from "../Components/DeckList";

function Home() {
    const [decks, setDecks] = useState([]);
    
    function fetchData() {
      listDecks().then(data => setDecks(data));
    }
    useEffect(fetchData, []);
    
   
     return (
     <div>
          <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
          <DeckList decks={decks} fetchData={fetchData}/>
      </div>
  )}
  
  export default Home;
