import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Routes} from 'src/routes';
import {AuthContextProvider} from 'src/shared/contexts/AuthContext';

import 'react-native-gesture-handler';

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
