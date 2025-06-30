import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export const usePermissionOnAppReturn = (): string => {
  const [appState, setAppState] = useState<string>('active');
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [appState]);
  return appState;
};
