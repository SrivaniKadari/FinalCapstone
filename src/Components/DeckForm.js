import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeckForm({ initialFormData, onSubmit, submitButtonText }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);

    function handleInput(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(formData)
            .then(data => {
                navigate(`/decks/${data.id}`);
            });
    }

    return (
        <div className="w-100">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        onChange={handleInput}
                        value={formData.name || ''}
                        placeholder="Deck Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        name="description"
                        onChange={handleInput}
                        value={formData.description || ''}
                        placeholder="Description of the deck"
                    />
                </div>
                <button type="submit" className="btn btn-primary">{submitButtonText}</button>
            </form>
        </div>
    );
}

export default DeckForm;
