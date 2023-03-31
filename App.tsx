import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Routes} from 'src/routes';

import 'react-native-gesture-handler';

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
