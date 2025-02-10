// import "./Budget_Edit.css";
// import { memo, useCallback, useEffect, useMemo, useState } from "react";
// import { Button, Container, Stack } from "react-bootstrap";
// import Budget from "./Budget";
// import AddBudgetModal from "./AddBudgetModal";
// import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
// import ViewExpensesModal from "./ViewExpensesModal";
// import AddExpenseModal from "./AddExpenseModal";
// import UncategorisedBudgetCard from "./UncategorisedBudgetCard";
// import TotalBudgetCard from "./TotalBudgetCard";

// const Budget_Edit = () => {
//     const { budgets, getBudgetExpenses } = useBudgets();
//     const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
//     const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
//     const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);
//     const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
//     const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

//     useEffect(() => {
//         console.log("Budget_Edit mounted");
//     }, [])

//     const openAddExpenseModal = useCallback((budgetId) => {
//         setShowAddExpenseModal(true);
//         setAddExpenseModalBudgetId(budgetId);
//     }, []);

//     const openViewExpensesModal = useCallback((budgetId) => {
//         setShowViewExpensesModal(true);
//         setViewExpensesModalBudgetId(budgetId);
//     }, []);

//     const handleCloseAddBudgetModal = useCallback(() => {
//         console.log("Add budget modal closed");
//         setShowAddBudgetModal(false);
//     }, []);

//     const handleCloseAddExpenseModal = useCallback(() => {
//         setShowAddExpenseModal(false);
//     }, []);

//     const handleCloseViewExpensesModal = useCallback(() => {
//         setViewExpensesModalBudgetId();
//         setShowViewExpensesModal(false);
//     }, []);

//     const budgetsList = useMemo(() => {
//         return budgets.map((budget) => {
//             const amount = getBudgetExpenses(budget.id).reduce(
//                 (total, expense) => total + parseFloat(expense.amount),
//                 0
//             );
//             return (
//                 <Budget
//                     key={budget.id}
//                     name={budget.name}
//                     amount={amount}
//                     max={budget.max}
//                     onAddExpenseClick={() => openAddExpenseModal(budget.id)}
//                     onViewExpensesClick={() => openViewExpensesModal(budget.id)}
//                 />
//             );
//         });
//     }, [budgets, getBudgetExpenses, openAddExpenseModal, openViewExpensesModal]);

//     return (
//         <Container className="my-4">
//             <AddBudgetModal show={showAddBudgetModal} handleClose={handleCloseAddBudgetModal} />
//             <AddExpenseModal
//                 show={showAddExpenseModal}
//                 defaultBudgetId={addExpenseModalBudgetId}
//                 handleClose={handleCloseAddExpenseModal}
//             />
//             <ViewExpensesModal
//                 show={showViewExpensesModal}
//                 budgetId={viewExpensesModalBudgetId}
//                 handleClose={handleCloseViewExpensesModal}
//             />
//             <Stack id="edit-budget-container" direction="horizontal" gap={2} className="mb-4">
//                 <h2 className="me-auto">Edit your Budgets and Expenses</h2>
//                 <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
//                     Add A Budget
//                 </Button>
//                 <Button variant="dark" onClick={openAddExpenseModal}>
//                     Add Expense
//                 </Button>
//                 <div 
//                     style={{
//                         // display: "grid",
//                         // gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//                         // gap: "1rem",
//                         // alignItems: "flex-start",
//                         display: "flex",
//                         flexWrap: "wrap",
//                         justifyContent: "center",
//                     }}
//                 >
//                     {budgets.length === 0 && (
//                         <p className="mt-4">You currently have no budgets. Add some budgets to get started.</p>
//                     )}
//                     {budgetsList}
//                     <UncategorisedBudgetCard
//                         onAddExpenseClick={openAddExpenseModal}
//                         onViewExpensesClick={() => openAddExpenseModal(UNCATEGORISED_BUDGET_ID)}
//                     />
//                     <TotalBudgetCard  />
//                 </div>
//             </Stack>
//         </Container>
//     );
// };

// export default memo(Budget_Edit);


import "./Budget_Edit.css";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import Budget from "./Budget";
import AddBudgetModal from "./AddBudgetModal";
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import ViewExpensesModal from "./ViewExpensesModal";
import AddExpenseModal from "./AddExpenseModal";
import UncategorisedBudgetCard from "./UncategorisedBudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";

const Budget_Edit = () => {
    const { budgets, getBudgetExpenses } = useBudgets();
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

    useEffect (() => {
        console.log("Budget_Edit mounted");
    }, [])

    const openAddExpenseModal = useCallback((budgetId) => {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    }, []);

    const openViewExpensesModal = useCallback((budgetId) => {
        setShowViewExpensesModal(true);
        setViewExpensesModalBudgetId(budgetId);
    }, []);

    const handleCloseAddBudgetModal = useCallback(() => {
        setShowAddBudgetModal(false);
    }, []);

    const handleCloseAddExpenseModal = useCallback(() => {
        setShowAddExpenseModal(false);
    }, []);

    const handleCloseViewExpensesModal = useCallback(() => {
        setViewExpensesModalBudgetId();
        setShowViewExpensesModal(false);
    }, []);

    const budgetsList = useMemo(() => {
        return budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + parseFloat(expense.amount),
                0
            );
            return (
                <Budget
                    key={budget.id}
                    name={budget.name}
                    amount={amount}
                    max={budget.max}
                    onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                    onViewExpensesClick={() => openViewExpensesModal(budget.id)}
                />
            );
        });
    }, [budgets, getBudgetExpenses, openAddExpenseModal, openViewExpensesModal]);

    return (
        <Container className="my-4">
            <AddBudgetModal show={showAddBudgetModal} handleClose={handleCloseAddBudgetModal} />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={handleCloseAddExpenseModal}
            />
            <ViewExpensesModal
                show={showViewExpensesModal}
                budgetId={viewExpensesModalBudgetId}
                handleClose={handleCloseViewExpensesModal}
            />
            <Stack id="edit-budget-container" direction="horizontal" gap={2} className="mb-4">
                <h2 className="me-auto">Edit your Budgets and Expenses</h2>
                <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
                    Add A Budget
                </Button>
                <Button variant="dark" onClick={openAddExpenseModal}>
                    Add Expense
                </Button>
                <div 
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {budgets.length === 0 && (
                        <p className="mt-4">You currently have no budgets. Add some budgets to get started.</p>
                    )}
                    {budgetsList}
                    <UncategorisedBudgetCard
                        onAddExpenseClick={openAddExpenseModal}
                        onViewExpensesClick={() => openAddExpenseModal(UNCATEGORISED_BUDGET_ID)}
                    />
                    <TotalBudgetCard  />
                </div>
            </Stack>
        </Container>
    );
};

export default memo(Budget_Edit);