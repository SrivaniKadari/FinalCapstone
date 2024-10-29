import React from 'react';
import { useNavigate} from 'react-router-dom';

function CardForm({ formData, setFormData, onSubmit, submitButtonText, cancelButtonText, deck }) {
    const navigate = useNavigate();

    function handleInput(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(formData);
    }

      return (
        <div className="w-100">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleInput}
                        value={formData.front || ''}
                        placeholder="Front side of card"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleInput}
                        value={formData.back || ''}
                        placeholder="Back side of card"
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-secondary mr-3"
                    onClick={() => navigate(`/decks/${deck.id}`)}
                >
                    {cancelButtonText}
                </button>
                <button type="submit" className="btn btn-primary">
                    {submitButtonText}
                </button>
            </form>
        </div>
    );
};

export default CardForm;
