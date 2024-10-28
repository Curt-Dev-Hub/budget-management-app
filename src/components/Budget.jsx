import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "./utils";


export default function Budget({ name, amount, max}) {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between-align-items-baseline
                fw-normal mb-3">
                    <div className="me-4">{name}</div>
                    <div></div>
                    <div className="d-flex align-items-baseline ">
                        {currencyFormatter.format(amount)}
                        <span className="text-muted fs-6 ms-1"> 
                            / {currencyFormatter.format(max)}
                        </span>
                    </div>
                </Card.Title>
                <ProgressBar 
                    animated 
                    className="rounded-pill" 
                    variant={getProgressBarVariant(amount, max)} /* change bar color dependant on budget values */
                    min={0}
                    max={max}
                    now={amount}
                /> 
                <Stack direction="horizontal" gap="2" className="mt-4">
                    <Button variant="outline-primary" className="ms-auto">Add Expense</Button>
                    <Button variant="outline-secondary">View Expenses</Button>
                </Stack>
            </Card.Body>
        </Card>
    )
}

const getProgressBarVariant = (amountNum, maxAmount) => {
    const ratio = amountNum / maxAmount
    if (ratio < 0.5) return "primary"
    if (ratio < 0.7) return "warning"
    return "danger"
}