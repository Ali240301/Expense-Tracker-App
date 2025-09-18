import { createContext, useState, useEffect } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    // ✅ Initialize incomes from localStorage (lazy initialization with fallback [])
    const [incomes, setIncomes] = useState(() => {
        const storedIncomes = localStorage.getItem("incomes");
        return storedIncomes ? JSON.parse(storedIncomes) : [];
    });

    // ✅ Initialize expenses from localStorage
    const [expenses, setExpenses] = useState(() => {
        const storedExpenses = localStorage.getItem("expenses");
        return storedExpenses ? JSON.parse(storedExpenses) : [];
    });

    // ✅ Persist incomes whenever they change
    useEffect(() => {
        localStorage.setItem("incomes", JSON.stringify(incomes));
    }, [incomes]);

    // ✅ Persist expenses whenever they change
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    // ---------------- Income methods ----------------
    const addIncome = (amount, description) => {
        if (!description || !amount || isNaN(amount) || amount <= 0) {
            console.error("Invalid data provided to addIncome:", { description, amount });
            return;
        }

        const newIncome = {
            id: Date.now(),
            amount: Number(amount),
            description: description.trim(),
            date: new Date().toISOString(),
        };

        setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    };

    const deleteIncome = (id) => {
        setIncomes((prevIncomes) => prevIncomes.filter((income) => income.id !== id));
    };

    // ---------------- Expense methods ----------------
    const addExpense = (expenseTitle, expenseAmount) => {
        if (!expenseTitle || !expenseAmount || isNaN(expenseAmount) || expenseAmount <= 0) {
            console.error("Invalid data provided to addExpense:", { expenseTitle, expenseAmount });
            return;
        }

        const newExpense = {
            id: Date.now(),
            title: expenseTitle.trim(),
            amount: Number(expenseAmount),
            date: new Date().toISOString(),
        };

        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    };

    const deleteExpense = (id) => {
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    };

    // ---------------- Clear all data ----------------
    const clearAllData = () => {
        if (window.confirm("Are you sure you want to clear all income and expense data?")) {
            setIncomes([]);
            setExpenses([]);
            localStorage.removeItem("incomes");
            localStorage.removeItem("expenses");
        }
    };

    // ---------------- Derived values ----------------
    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const balance = totalIncome - totalExpenses;

    // ---------------- Context value ----------------
    const value = {
        incomes,
        expenses,
        totalIncome,
        totalExpenses,
        balance,
        addIncome,
        addExpense,
        deleteIncome,
        deleteExpense,
        clearAllData, 
    };

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

export default ExpenseContext;
