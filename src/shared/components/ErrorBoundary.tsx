import React from 'react';
import StateView from './StateView';

type Props = {children: React.ReactNode};
type State = {hasError: boolean};

/** Chặn lỗi render trong mini app để không làm sập cả super app. */
export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {hasError: false};

  static getDerivedStateFromError(): State {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <StateView
          status="error"
          message="Mini app gặp lỗi"
          onRetry={() => this.setState({hasError: false})}
        />
      );
    }
    return this.props.children;
  }
}
