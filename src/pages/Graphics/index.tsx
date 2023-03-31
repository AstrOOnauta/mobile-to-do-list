import React from 'react';
import {Box, Text} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';

import {HomeRoutesParamsList} from 'src/shared/interfaces/routes';

export default function Graphics({
  route,
  navigation,
}: StackScreenProps<HomeRoutesParamsList, 'graphics'>) {
  return (
    <Box
      flex={1}
      backgroundColor="gray.50"
      alignItems="center"
      justifyContent="center">
      <Text>Graphics</Text>
    </Box>
  );
}
