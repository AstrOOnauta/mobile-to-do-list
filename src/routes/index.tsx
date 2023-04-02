import React, {useContext} from 'react';
import {Box} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppRoutes} from './app.routes';
import {AuthRoutes} from './auth.routes';
import AuthContext from 'src/shared/contexts/AuthContext';

export function Routes() {
  const {user} = useContext(AuthContext);

  const insets = useSafeAreaInsets();

  return (
    <Box
      flex={1}
      pt={insets.top}
      pr={insets.right}
      pb={insets.bottom}
      pl={insets.left}>
      <NavigationContainer>
        {user?.uid ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
