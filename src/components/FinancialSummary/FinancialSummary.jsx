import { useContext } from 'react';
import ExpenseContext from '../../context/ExpenseContext';
import './FinancialSummary.css';

const FinancialSummary = () => {
    const { totalIncome, totalExpenses, balance, clearAllData } = useContext(ExpenseContext);

    // Validation and formatting functions
    const formatCurrency = (amount) => {
        if (isNaN(amount) || amount === null || amount === undefined) {
            return '$0.00';
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getBalanceClass = () => {
        if (balance > 0) return 'balance-positive';
        if (balance < 0) return 'balance-negative';
        return 'balance-zero';
    };

    return (
        <div className="financial-summary">
            <h2>Financial Summary</h2>

            <div className="summary-item income-summary">
                <h3>Total Income</h3>
                <p className="amount income-amount">{formatCurrency(totalIncome)}</p>
            </div>

            <div className="summary-item expense-summary">
                <h3>Total Expenses</h3>
                <p className="amount expense-amount">{formatCurrency(totalExpenses)}</p>
            </div>

            <div className={`summary-item balance-summary ${getBalanceClass()}`}>
                <h3>Current Balance</h3>
                <p className="amount balance-amount">{formatCurrency(balance)}</p>
                {balance < 0 && (
                    <p className="balance-warning">Warning: You're spending more than you earn!</p>
                )}
            </div>

            {/* ✅ Clear All Data Button */}
            <button
                className="clear-btn"
                onClick={clearAllData}
            >
                Clear All Data
            </button>
        </div>
    );
};

export default FinancialSummary;
