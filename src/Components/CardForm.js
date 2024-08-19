import React from 'react';
import { Link } from 'react-router-dom';

const CardForm = ({ mode, deckName, card, handleChange, handleSubmit, handleCancel }) => {
    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${card.deckId}`}>{deckName || 'Deck'}</Link>
                </li>
                <li className="breadcrumb-item active">
                    {mode === 'edit' ? `Edit Card ${card.id}` : 'Add Card'}
                </li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h2>{mode === 'edit' ? 'Edit Card' : 'Add Card'}</h2>
                <div className="form-group">
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange}
                        value={card.front|| ''}
                    />
                </div>
                <div className="form-group">
                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleChange}
                        value={card.back|| ''}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-secondary mx-1"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button className="btn btn-primary mx-1" type="submit">
                    {mode === 'edit' ? 'Save' : 'Create'}
                </button>
            </form>
        </div>
    );
};

export default CardForm;
