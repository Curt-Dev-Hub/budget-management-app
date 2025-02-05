import { useBudgets } from '../contexts/BudgetsContext'
import Budget from './Budget';


export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets()
    const amount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0)
    const max = budgets.reduce((total, budget) => total + parseFloat(budget.max), 0)
    if(max === 0) return null
    return <Budget amount={amount} name="Total Budget" max={max} hideButtons={true} />;
}
