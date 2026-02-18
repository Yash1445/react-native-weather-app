import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './navigation';
import { store } from './store';

export const AppRoot = () => {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <RootNavigator />
    </Provider>
  );
};
