import { Button, Card, Row } from "react-bootstrap";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
  
    return (
      <div id="error-page" style={{textAlign: "center"}}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{ error.statusText || error.message }</i><br/>
          <i>{error.data}</i>
        </p>
        <Card body>
          <Row><h3>Please try to return to the homepage using the below buttons</h3></Row>
          <Button variant="dark" href="/">Return To Home</Button>
        </Card>
      </div>
    );
  }