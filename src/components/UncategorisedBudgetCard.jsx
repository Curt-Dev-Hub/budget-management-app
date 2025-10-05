import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import Budget from "./Budget";



export default function UncategorisedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORISED_BUDGET_ID).reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );

  // do not show card if amount is null
  if (amount === 0) return null;
  return <Budget amount={amount} name="Uncategorised" {...props} />;
}
