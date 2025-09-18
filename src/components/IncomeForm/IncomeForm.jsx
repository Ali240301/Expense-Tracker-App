import React, { useContext, useState } from 'react';
import ExpenseContext from '../../context/ExpenseContext';
import './IncomeForm.css'; // Import the CSS file

const IncomeForm = () => {
    const [inputAmount, setInputAmount] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { addIncome } = useContext(ExpenseContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors

        // Validation 1: Check for empty fields
        if (!inputDescription.trim() || !inputAmount.trim()) {
            setErrorMessage('Please provide both a description and an amount.');
            return;
        }

        const amountValue = parseFloat(inputAmount);

        // Validation 2: Check if it's a valid number and positive
        if (isNaN(amountValue)) {
            setErrorMessage('Please enter a valid number for the amount.');
            return;
        }
        if (amountValue <= 0) {
            setErrorMessage('Please enter an amount greater than zero.');
            return;
        }

        // Validation 3: Check for a reasonable maximum value
        if (amountValue > 1000000) {
            setErrorMessage('Amount entered is too large. Please check the value.');
            return;
        }

        // If all validations pass, call the function from context
        addIncome(amountValue, inputDescription.trim());

        // Reset the form fields
        setInputAmount('');
        setInputDescription('');
    };

    return (
        <div className="income-form">
            <h3>Add New Income</h3>
            <form onSubmit={handleSubmit} className="form-group">
                <input
                    value={inputDescription}
                    onChange={(e) => setInputDescription(e.target.value)}
                    type="text"
                    placeholder="What was this income for?"
                />
                <input
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    type="number"
                    placeholder="Amount"
                />
                <button type="submit">Add Income</button>
            </form>
            {/* Display error message if it exists */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default IncomeForm;