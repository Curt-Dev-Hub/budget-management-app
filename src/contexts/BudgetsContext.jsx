import React, { useContext, useState, useEffect, useRef, useMemo } from "react"
import axios from "axios"
import { useLoginStatus } from "./LoginContext"
import { isEqual } from "lodash"


const BudgetsContext = React.createContext()

export const UNCATEGORISED_BUDGET_ID = "Uncategorised"

export function useBudgets() { 
    return useContext(BudgetsContext)
}

// eslint-disable-next-line react/prop-types
export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]) 
    const [expenses, setExpenses] = useState([]) 
    const { loginStatus, setIsLoading } = useLoginStatus()
    const initialLoadComplete = useRef(false)
    // console.log("BudgetsProvider mounted");


    // Initial data fetch test
    useEffect(() => {
        if(loginStatus && !initialLoadComplete.current) {
            const fetchInitialData = async () => {
                try {
                    setIsLoading(true)
                    await checkBudgets(budgets)
                    await checkExpenses()
                    initialLoadComplete.current = true
                } catch(error) {
                    console.error('Initial data fetch error:', error);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchInitialData();
        }
    }, [loginStatus])


    const checkBudgets = async (currentBudgets = []) => {
        // console.log('Checking budgets')
        try {
            const response = await axios.get('/check_budgets.php', {
                withCredentials: true
            });
            if (!isEqual(currentBudgets, response.data.data)) {
                setBudgets(response.data.data)
            }
        } catch(error) {
            console.error('There was an error checking budgets: ', error)
        } 
    }
    

    const checkExpenses = async () => {
        // console.log('Checking expenses');
        try {
            const response = await axios.get('/check_expenses.php', {
                withCredentials: true
            });
            if(response.data.message === "Expenses Found") {
                setExpenses(response.data.data);
            } 
            
        } catch(error) {
            console.error('There was an error receiving expenses: ', error)
        } 
    }
    
    
    const deleteBudget = async ({ id }) => {
        try {
            const response = await axios.delete('/update_budget.php', {
                data: { id }, 
                withCredentials: true
            });
    
            if (response.data.message === "Budget successfully deleted.") {
                setBudgets(prevBudgets => {
                    return prevBudgets.filter(budget => budget.id !== id)
                });

                await checkBudgets(budgets);
                await checkExpenses();

                return { success: true, message: "Budget successfully deleted" };
            } else {
                throw new Error(response.data.message || "Failed to delete budget");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message 
                || error.message 
                || "There was an error deleting the budget";
            console.error('Delete budget error:', errorMessage);
            throw new Error(errorMessage);
        }
    } 
    
    const addExpense = async (description, amount, budget_id) => {
        try {
            const response = await axios.post(
                "/update_expenses.php",
                { description, amount, budget_id },
                { withCredentials: true }
            );
            if (response.data.status === "success") {
                await checkExpenses(); 
                return response.data.status;
            } else {
                throw new Error(response.data.message || "Expense not added 😑");
            }
        } catch (error) {
            console.error("Expense not added due to: ", error);
            throw new Error(error.response?.data?.message || "An error occurred");
        } 
    };
    
    const addBudget = async ({ name, max }) => {
        try {
            const response = await axios.post(
                '/update_budget.php',
                { name, max },
                { withCredentials: true }
            );
            if (response.data.status === 'success') {
                await checkBudgets(); // Fetch the latest data from the server
                return { success: true, message: "Budget has been added successfully" };
            } else {
                throw new Error(response.data.message || 'Budget not added 😑');
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to add budget');
        }
    };

    const  deleteExpense = async (id, budgetId) => {
        try {
            const response = await axios.delete('/update_expenses.php', {
                data: { id, budgetId },
                withCredentials: true
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.data.status === "success") {
                setExpenses(prevExpenses => {
                    return prevExpenses.filter(expense => expense.id !== id) 
                })
                await checkExpenses();
                return response.data.status
            } else {
                throw new Error(response.data.message || "Failed to delete expense")
            }  
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "There was an error deleting the expense"
            console.error('Delete expense error:', errorMessage)
            throw new Error(errorMessage)
        }
    }

    const value = useMemo(() => ({
        budgets,
        expenses,
        getBudgetExpenses: (budgetId) => expenses.filter((expense) => expense.budget_id === budgetId),
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        }), [budgets, expenses]);

      return <BudgetsContext.Provider value={value}>{children}</BudgetsContext.Provider>;
}
