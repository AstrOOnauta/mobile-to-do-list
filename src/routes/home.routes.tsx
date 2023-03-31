import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Tasks from 'src/pages/Tasks';
import Graphics from 'src/pages/Graphics';
import {HomeRoutesParamsList} from 'src/shared/interfaces/routes';

const Tab = createMaterialTopTabNavigator<HomeRoutesParamsList>();

export default function HomeRoutes() {
  return (
    <Tab.Navigator>
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
