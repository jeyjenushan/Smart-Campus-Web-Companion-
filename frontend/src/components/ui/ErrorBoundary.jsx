import { Component } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-danger" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink">Something went wrong</h2>
            <p className="text-sm text-ink-muted mt-1 max-w-xs">
              {this.state.error?.message ?? 'An unexpected error occurred'}
            </p>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="btn btn-primary"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
