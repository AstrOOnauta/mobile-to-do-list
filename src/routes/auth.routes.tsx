import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from 'src/pages/Login';
import SignUp from 'src/pages/SignUp';
import RecoveryPassword from 'src/pages/RecoveryPassword';
import {AuthRoutesParamsList} from 'src/shared/interfaces/routes';

export function AuthRoutes() {
  const navigation = createStackNavigator<AuthRoutesParamsList>();

  return (
    <navigation.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <navigation.Screen name="login" component={Login} />
      <navigation.Screen name="sign-up" component={SignUp} />
      <navigation.Screen
        name="recovery-password"
        component={RecoveryPassword}
      />
    </navigation.Navigator>
  );
}
