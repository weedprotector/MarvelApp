import { Component } from "react/cjs/react.production.min";
import ErrorMessege from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }
    
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessege/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;