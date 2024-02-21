import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = {hasError: false}

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.props.setHasError(true)
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      if (!this.props.hasError) {
        this.setState({hasError: false})
      }
      return "There has been an error."
    }
    return this.props.children
  }
}
