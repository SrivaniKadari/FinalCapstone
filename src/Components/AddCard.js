import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCard } from "../utils/api/index";
import CardForm from "../Components/CardForm";

function AddCard({deck, fetchDeck}){
    const [formData, setFormData]=useState({
        front: '',
        back: '',
        })

    const onSubmit=(newCard)=>{
       // console.log(newCard);
        createCard(deck.id, newCard)
        .then((result)=>setFormData({
            front: '',
            back: '',
            }))
        .then(fetchDeck)}
    

    return(
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav> 
        <CardForm 
            deck={deck}
            onSubmit={onSubmit}
            submitButtonText="Save"
            cancelButtonText="Done"
            formData={formData}
            setFormData={setFormData}/>
    </div>
    )}

export default AddCard;
