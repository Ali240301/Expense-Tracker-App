import './App.css';
import IncomeForm from './components/IncomeForm/IncomeForm';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseList from './components/ExpenseList/ExpenseList';
import FinancialSummary from './components/FinancialSummary/FinancialSummary';
import IncomeList from './components/IncomeList/IncomeList';

function App() {
  return (
    <ExpenseProvider>
      <div className="app-container">
        {/* App Header */}
        <header className="app-header">
          <h1>💰 Expense Tracker</h1>
          <p className="tagline">Track your income, expenses, and balance in one place</p>
        </header>

        {/* Financial Overview */}
        <section className="summary-section">
          <FinancialSummary />
        </section>

        {/* Input Forms */}
        <section className="forms-section">
          <h2>Add Transactions</h2>
          <div className="forms-wrapper">
            <IncomeForm />
            <ExpenseForm />
          </div>
        </section>

        {/* Transaction Lists */}
        <section className="lists-section">
          <h2>Transaction History</h2>
          <div className="lists-wrapper">
            <IncomeList />
            <ExpenseList />
          </div>
        </section>
      </div>
    </ExpenseProvider>
  );
}

export default App;
