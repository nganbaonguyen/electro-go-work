import React from 'react';
import ErrorBoundary from '../shared/components/ErrorBoundary';
import MiniNavigator from './navigation/MiniNavigator';

/** Component gốc của mini app Chấm công: bọc ErrorBoundary rồi vào điều hướng nội bộ. */
export default function WorkApp() {
  return (
    <ErrorBoundary>
      <MiniNavigator />
    </ErrorBoundary>
  );
}
