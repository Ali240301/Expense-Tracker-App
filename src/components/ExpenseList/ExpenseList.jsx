import { useContext } from 'react'
import ExpenseContext from '../../context/ExpenseContext'
import './ExpenseList.css';

const ExpenseList = () => {
    const { expenses, deleteExpense } = useContext(ExpenseContext);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            deleteExpense(id);
        }
    };

    return (
        <div className="expense-list">
            <h3>Your Expenses</h3>

            {expenses.length === 0 ? (
                <p className="no-expenses">No expenses added yet.</p>
            ) : (
                <ul className="expense-ul">
                    {expenses.map((expense) => (
                        <li key={expense.id} className="expense-item">
                            <div className="expense-content">
                                <div className="expense-details">
                                    <span className="expense-title">{expense.title}</span>
                                    <span className="expense-amount">-${expense.amount.toFixed(2)}</span>
                                </div>
                                <div className="expense-meta">
                                    <small className="expense-date">
                                        {new Date(expense.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </small>
                                    <small className="expense-time">
                                        {new Date(expense.date).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </small>
                                </div>
                            </div>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(expense.id)}
                                aria-label="Delete expense entry"
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {expenses.length > 0 && (
                <div className="expense-total">
                    <strong>Total Entries: {expenses.length}</strong>
                </div>
            )}
        </div>
    )
}

export default ExpenseList;
