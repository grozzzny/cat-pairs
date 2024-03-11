import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorProviderProps {
  children: ReactNode;
  errorPage: React.ComponentType<{ error?: string }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorProviderState {
  hasError: boolean;
  error?: string;
}

export class ErrorProvider extends React.Component<
  ErrorProviderProps,
  ErrorProviderState
> {
  constructor(props: ErrorProviderProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error: error.message });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      // eslint-disable-next-line no-console
      console.error(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      const ErrorPageComponent = this.props.errorPage;
      return <ErrorPageComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}
