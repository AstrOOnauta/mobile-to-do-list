import React from 'react';
import {theme} from 'native-base';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Tasks from 'src/pages/Tasks';
import Graphics from 'src/pages/Graphics';
import {HomeRoutesParamsList} from 'src/shared/interfaces/routes';

const Tab = createMaterialTopTabNavigator<HomeRoutesParamsList>();

export default function HomeRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.violet[600],
        tabBarInactiveTintColor: theme.colors.gray[400],
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        },
        tabBarStyle: {elevation: 20},
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.violet[600],
        },
        tabBarPressColor: theme.colors.violet[200],
      }}>
      <Tab.Screen
        name="tasks"
        component={Tasks}
        options={{tabBarLabel: 'Tarefas'}}
      />
      <Tab.Screen
        name="graphics"
        component={Graphics}
        options={{tabBarLabel: 'Gráficos'}}
      />
    </Tab.Navigator>
  );
}
