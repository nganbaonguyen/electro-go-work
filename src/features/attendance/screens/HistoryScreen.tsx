import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import StateView from '../../../shared/components/StateView';
import {spacing} from '../../../shared/theme';
import HistoryList from '../components/HistoryList';
import {useHistory} from '../hooks/useHistory';

export default function HistoryScreen() {
  const history = useHistory();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {history.status === 'ready' && history.data ? (
        <HistoryList records={history.data} />
      ) : (
        <StateView
          status={history.status === 'error' ? 'error' : 'loading'}
          message={history.error}
          onRetry={history.reload}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({content: {padding: spacing.xl}});
