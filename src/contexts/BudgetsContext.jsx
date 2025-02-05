import React, { useContext, useState, useEffect, useRef } from "react"
import { v4 as uuidV4 } from 'uuid'
import axios from "axios"
import { useLoginStatus } from "./LoginContext"


const BudgetsContext = React.createContext()

export const UNCATEGORISED_BUDGET_ID = "Uncategorised"

export function useBudgets() { 
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]) 
    const [expenses, setExpenses] = useState([]) 
    const { loginStatus, setIsLoading } = useLoginStatus()
    const initialLoadComplete = useRef(false)

    // Initial data fetch test
    useEffect(() => {
        if(loginStatus && !initialLoadComplete.current) {
            const fetchInitialData = async () => {
                try {
                    setIsLoading(true)
                    await checkBudgets()
                    await checkExpenses()
                    initialLoadComplete.current = true
                } catch(error) {
                    console.error('Initial data fetch error:', error)
                } finally {
                    setIsLoading(false)
                }
            }
            fetchInitialData()
        }
    }, [loginStatus])


    const checkBudgets = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/budget-api/check_budgets.php', {
                withCredentials: true
            });
            
            if(response.data.message === "Budgets Found") {
                setBudgets(response.data.data)
            } 
        } catch(error) {
            console.error('There was an error checking budgets: ', error)
            } finally {
                setIsLoading(false);
            }
    }
    

    const checkExpenses = async () => {
        try {
            setIsLoading(true); 
            const response = await axios.get('/budget-api/check_expenses.php', {
                withCredentials: true
            });
            if(response.data.message === "Expenses Found") {
                setExpenses(response.data.data)
            } 
            
        } catch(error) {
            console.error('There was an error receiving expenses: ', error)
            } finally {
                setIsLoading(false);
            }
        }
    
    
    const deleteBudget = async ({ id }) => {
        try {
            const response = await axios.delete('/budget-api/update_budget.php', {
                data: { id }, 
                withCredentials: true
            });
    
            if (response.data.message === "Budget successfully deleted.") {
                setBudgets(prevBudgets => {
                    return prevBudgets.filter(budget => budget.id !== id)
                });

                await checkBudgets();
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


    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budget_id === budgetId)
    }


    const addExpense = async (description, amount, budget_id) => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "/budget-api/update_expenses.php",
          { description, amount, budget_id },
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        if (response.data.status === "success") {
            setExpenses((prevExpenses) => {
                return [
                  ...prevExpenses,
                  { id: uuidV4(), budget_id, amount, description },
                ]
            })
           await checkExpenses() 
          return response.data.status;
            
        } else {
            throw new Error(response.data.message || "Expense not added 😑");
        }
      } catch (error) {
        console.error("Expense not added due to: ", error);
        if (error.response) {
            throw new Error(error.response.data.message || "An error occurred")
        } else if (error.request) {
            throw new Error("No response received from the server")
        } else {
            throw new Error("Error setting up the request")
        }
      } finally {
        setIsLoading(false);
      }
    }
    


    const addBudget = async ({name, max}) => {
        try {
            setIsLoading(true)
            const response = await axios.post('/budget-api/update_budget.php', 
                { name, max }, 
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }     
            );
            
            if(response.data.status === 'success') {
                setBudgets((prevBudgets) => {
                  const existingBudget = prevBudgets.find((budget) => budget.name === name);
                  if(existingBudget) {
                    throw new Error(response.data.message || 'Budget not added 😑')
                  } else {
                    return [...prevBudgets, { id: uuidV4(), name, max }];
                  }
                });

            await checkBudgets();
            return { success: true, message: "Budget has been added successfully"}
            } 
            else { 
                throw new Error(response.data.message || 'Budget not added 😑')
            }
        } catch(error) {
                throw new Error(error.response?.data?.message || error.message || 'Failed to add budget')
            }
            finally {
                setIsLoading(false)
            }
    }
    
    const  deleteExpense = async (id, budgetId) => {
        try {
            setIsLoading(true)
            const response = await axios.delete('/budget-api/update_expenses.php', {
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
        finally {
            setIsLoading(false)
        }
    }

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
