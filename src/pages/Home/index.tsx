import React from 'react';
import {Box, Text, VStack} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';

import HomeRoutes from 'src/routes/home.routes';
import {AppRoutesParamsList} from 'src/shared/interfaces/routes';

export default function Home({
  route,
  navigation,
}: StackScreenProps<AppRoutesParamsList, 'home'>) {
  return (
    <VStack flex={1}>
      <Box backgroundColor="white" alignItems="center" justifyContent="center">
        <Text>Home</Text>
      </Box>
      <HomeRoutes />
    </VStack>
  );
}
