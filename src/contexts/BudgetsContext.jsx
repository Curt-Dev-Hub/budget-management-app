import React, { useContext, useState, useEffect } from "react"
import { v4 as uuidV4} from 'uuid'
import axios from "axios"
import { useLoginStatus } from "./LoginContext"

const BudgetsContext = React.createContext()

export const UNCATEGORISED_BUDGET_ID = "Uncategorised"

export function useBudgets() { 
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([])  // DONE: Now receiving budgets - Requires further testing
    const [expenses, setExpenses] = useState([]) //! THESE WILL NEED TO BE INITIALLY UPDATED BY A NETWORK REQUEST -- THEN POSSIBLY CAN BE 

    const { loginStatus } = useLoginStatus()

    //TODO: An API call will need to be setup here to query any previous budget info and update state
    const checkBudgets = async () => {
        try {
            const response = await axios.get('/budget-api/check_budgets.php', {
                withCredentials: true
            });
            if(response.data.message === "Budgets Found") {
                setBudgets(response.data.data)
            } 
            
            // setBudgets()
            
        } catch(error) {
            console.error('There was an error receiving budgets: ', error)
            // } finally {
            //     setIsLoading(false);
            // }
        }
    }
    useEffect(() => {
        if(loginStatus) {
            checkBudgets();
            console.log("checkBudgets ran")
        }
    }, [loginStatus]) 


    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId) // to specify which individual budget to target 
    }

    function addExpense(description, amount, budgetId) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), budgetId,  amount, description }]
        })
    }
        //TODO: Below addBudget can possibly become a centralised API call
    function addBudget(name, max) {
        setBudgets(prevBudgets => {
            // check name to avoid duplication - do not add budget if duplicated
            if(prevBudgets.find(budget => budget.name === name )) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }
    //TODO: this will need to be modified going forward as deleted budgets will be sent to uncategorised budgets 
    function deleteBudget({ id }) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id) // returning an array without any elements whose ID matches the one passed in
        })
    }
    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id) // returning an array without any elements whose ID matches the one passed in
        })
    }

    //** */ the below passed down data will be required in child elements
    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>{ children }</BudgetsContext.Provider>
}
