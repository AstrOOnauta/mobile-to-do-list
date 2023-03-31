import React from 'react';
import {Box, Text} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';

import {AuthRoutesParamsList} from 'src/shared/interfaces/routes';

export default function RecoveryPassword({
  route,
  navigation,
}: StackScreenProps<AuthRoutesParamsList, 'recovery-password'>) {
  return (
    <Box
      flex={1}
      backgroundColor="gray.50"
      alignItems="center"
      justifyContent="center">
      <Text>RecoveryPassword</Text>
    </Box>
  );
}
