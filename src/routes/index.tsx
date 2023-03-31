import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppRoutes} from './app.routes';
import {AuthRoutes} from './auth.routes';
import {Box} from 'native-base';

export function Routes() {
  const [hasUser] = useState<boolean>(false);

  const insets = useSafeAreaInsets();

  return (
    <Box
      flex={1}
      pt={insets.top}
      pr={insets.right}
      pb={insets.bottom}
      pl={insets.left}>
      <NavigationContainer>
        {hasUser ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
