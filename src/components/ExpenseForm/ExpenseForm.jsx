import { useContext, useState } from 'react'
import ExpenseContext from "../../context/ExpenseContext";
import './ExpenseForm.css';

const ExpenseForm = () => {
    const [expenseTitle, setExpenseTitle] = useState("")
    const [expenseAmount, setExpenseAmount] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { addExpense } = useContext(ExpenseContext)

    const addExpenseHandler = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors

        // Validation 1: Check for empty fields
        if (!expenseTitle.trim() || !expenseAmount.trim()) {
            setErrorMessage('Please provide both a title and an amount for your expense.');
            return;
        }

        const amountValue = parseFloat(expenseAmount);

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
        if (amountValue > 100000) {
            setErrorMessage('Expense amount seems too high. Please verify.');
            return;
        }

        // If all validations pass, call the function from context
        addExpense(expenseTitle.trim(), amountValue);

        // Reset the form fields
        setExpenseTitle("");
        setExpenseAmount("");
    }

    return (
        <div className="expense-form">
            <h3>Add New Expense</h3>
            <form onSubmit={addExpenseHandler} className="form-group">
                <input
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                    type="text"
                    placeholder="What did you spend on?"
                />
                <input
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    type="number"
                    step="0.01"
                    placeholder="Amount Spent"
                />
                <button type="submit">Add Expense</button>
            </form>
            {/* Display error message if it exists */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    )
}

export default ExpenseForm