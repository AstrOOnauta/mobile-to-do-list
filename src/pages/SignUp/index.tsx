import React from 'react';
import {Box, Text} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';

import {AuthRoutesParamsList} from 'src/shared/interfaces/routes';

export default function SignUp({
  route,
  navigation,
}: StackScreenProps<AuthRoutesParamsList, 'sign-up'>) {
  return (
    <Box
      flex={1}
      backgroundColor="gray.50"
      alignItems="center"
      justifyContent="center">
      <Text>Sign Up</Text>
    </Box>
  );
}
