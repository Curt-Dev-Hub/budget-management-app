import React from "react";
import { Button, Container, Row } from "react-bootstrap";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props); // without this being called this.props would be undefined in the constructor
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  // static method to catch errors during rendering
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  //lifecycle method to catch errors and log them, possibly eventually to an error reporting service
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error);
    console.error("Error info:", errorInfo);
  
    // Update state with detailed error information
    this.setState({ 
        error: error,
        errorInfo: errorInfo 
    });
    }

    // Render method to show fallback UI when an error occurs
    render() {
        if (this.state.hasError) {
        return (
            <div style={{ 
                padding: '20px', 
                backgroundColor: '#f8d7da', 
                color: '#721c24',
                border: '1px solid #f5c6cb',
                borderRadius: '5px'
              }}>
                <h1 style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "1rem"
                }}>Something went wrong.
                </h1>
                {this.state.error && (
                    <details style={{ 
                        whiteSpace: 'pre-wrap',
                        backgroundColor: "#282c34",
                        color: "#fff",
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        fontFamily: "monospace",
                        marginTop: "1.5rem" 
                    }}>
                    {this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                    </details>
                )}
                <Container>
                    <Row  className="justify-content-center pt-4">
                        <Button style={{width: "30%"}} size="sm" variant="primary" href="/">Return to Home</Button>
                    </Row>
                </Container>
            </div>
        );
        }
        // If no error, render children normally
        return this.props.children;
    }
}   

export default ErrorBoundary
