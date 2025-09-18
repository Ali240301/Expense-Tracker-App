import { useContext } from 'react';
import ExpenseContext from '../../context/ExpenseContext';
import './IncomeList.css';

const IncomeList = () => {
    const { incomes, deleteIncome } = useContext(ExpenseContext);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this income entry?')) {
            deleteIncome(id);
        }
    };

    return (
        <div className="income-list">
            <h3>Your Income History</h3>
            
            {incomes.length === 0 ? (
                <p className="no-income">No income entries yet. Add your first income above!</p>
            ) : (
                <ul className="income-ul">
                    {incomes.map((income) => (
                        <li key={income.id} className="income-item">
                            <div className="income-content">
                                <div className="income-details">
                                    <span className="income-description">{income.description}</span>
                                    <span className="income-amount">+${income.amount.toFixed(2)}</span>
                                </div>
                                <div className="income-meta">
                                    <small className="income-date">
                                        {new Date(income.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </small>
                                    <small className="income-time">
                                        {new Date(income.date).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </small>
                                </div>
                            </div>
                            <button 
                                className="delete-btn"
                                onClick={() => handleDelete(income.id)}
                                aria-label="Delete income entry"
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {incomes.length > 0 && (
                <div className="income-total">
                    <strong>Total Entries: {incomes.length}</strong>
                </div>
            )}
        </div>
    );
};

export default IncomeList;