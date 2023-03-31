import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from 'src/pages/Home';
import NewTask from 'src/pages/NewTask';
import {AppRoutesParamsList} from 'src/shared/interfaces/routes';

export function AppRoutes() {
  const navigation = createStackNavigator<AppRoutesParamsList>();

  return (
    <navigation.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <navigation.Screen name="home" component={Home} />
      <navigation.Screen name="new-task" component={NewTask} />
    </navigation.Navigator>
  );
}
