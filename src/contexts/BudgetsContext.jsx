//! HERE WE WILL WANT TO INTEGRATE DATA INTO BACK END
//! COULD ALSO CONSIDER LOCALSTORAGE IN INITIAL STAGES
import React, { useContext, useState } from "react"
import { v4 as uuidV4} from 'uuid'

const BudgetsContext = React.createContext()

// allow for use of context accross application
export function useBudgets() { 
    return useContext(BudgetsContext)
}

//* budget data layout for reference when creating context functions below

// {
//     id: 
//     name:
//     max:
// }

// expense data

// {
//     id:
//     budgetId:
//     amount:
//     description:
// }

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([])  //* functions below can be based of on the state here
    const [expenses, setExpenses] = useState([])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId) // to specify which individual budget to target 
    }

    function addExpense(description, amount, budgetId) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), budgetId,  amount, description }]
        })
    }

    function addBudget(name, max) {
        setBudgets(prevBudgets => {
            // check name to avoid duplication - do not add budget if duplicated
            if(prevBudgets.find(budget => budget.name === name )) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }
    //TODO: this will need to be modified going forward as deleted budgets will be sent uncategorised budgets 
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