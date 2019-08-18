import React, { Component } from 'react';

class ErrorBoundary extends Component{
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    console.log(this.state.hasError)
    console.log(this.props.children)
    if (this.state.hasError) {      
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }
    return this.props.children;
  }  
}

export default ErrorBoundary;